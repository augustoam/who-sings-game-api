import { container, ProvideAsSingleton } from "../IocProvider";
import { LoggerFactory } from "./LoggerFactory";
import { join, resolve } from "path";
import { CONFIG } from "./Configuration";
import * as fs from "fs";
import * as Mongoose from "mongoose";
import { retry } from '../../utils/Retry';

@ProvideAsSingleton(MongoDB)
export class MongoDB {

    private logger: Logger;
    public instance: Mongoose.Mongoose;

    readonly repoFolder: string = resolve(__dirname, "../../models/mongo");

    constructor() {
        this.instance = Mongoose;
        this.logger = LoggerFactory.getLogger("MongoDB");
    }

    public async init(): Promise<void> {

        this.logger.info('[BOOTING] MongoDB initializing...');

        if (this.isConnected()) {
            this.logger.info('[BOOTING] Data models already initialized');
            return;
        }

        this.instance.plugin(this.errorHandlerPlugin.bind(this));

        this.instance.set('debug', CONFIG.mongo.debug);

        this.instance.connection.on('error', (error: any) =>
            this.logger.error('MongoDB database connection has not been opened. Error: ' + error)
        );

        this.instance.connection.once('open', () =>
            this.logger.info('[BOOTING] MongoDB database connection has been opened')
        );

        this.instance.connection.on('connected', () =>
            this.logger.debug('[BOOTING] MongoDB database connection established')
        );

        this.instance.connection.on('disconnected', () =>
            this.logger.error('MongoDB database connection closed')
        );

        await this.tryConnect();
    }

    private errorHandlerPlugin(schema: any, options: any): void {
        let ec = this.getError.bind(this);
        schema.post('save', ec);
        schema.post('update', ec);
        schema.post('findOneAndUpdate', ec);
        schema.post('insertMany', ec);
        schema.post('validate', ec);
    }

    private getError(error: any, doc: any, next: any) {
        let message: string, newError: Error;
        if (error.name === 'MongoError') {
            switch (error.code) {
                case 1:
                    message = 'mongo-internal-error';
                    break;
                case 6:
                case 7:
                    message = 'mongo-host-not-reachable';
                    break;
                case 18:
                    message = 'mongo-authentication-failed';
                    break;
                case 89:
                    message = 'mongo-timeout';
                    break;
                case 11000:
                    message = 'mongo-duplicate-key-error';
                    break;
                case 14031:
                    message = 'mongo-out-of-disk-space';
                    break;
                case 16389:
                    message = 'mongo-max-document-size-reached';
                    break;
                default:
                    return next(error);
            }
            newError = new Error(message);
            newError.stack = `${message}\n${error.stack}`;
            next(newError);
        } else if (error.name == 'ValidationError') {
            newError = new Error('mongo-validation-error');

            // extend mongoose stack trace with a list of validation errors
            message = "Validation Errors:";
            if (error.hasOwnProperty('errors')) {
                Object.keys(error.errors).forEach(key => {
                    message += `\nProperty ${key}: error: ${error.errors[key]}`;
                });
            }

            newError.stack = `${error.stack}\n${message}`;
            next(newError);
        } else {
            next(error);
        }
    }

    private tryConnect() {
        const promiseWrapper = () => new Promise<void>((resolve, reject) => {
            const options: Mongoose.ConnectOptions = {
                wtimeoutMS: 5000,
                autoIndex: true,
                dbName: CONFIG.mongo.database,
                user: CONFIG.mongo.user,
                pass: CONFIG.mongo.password
                //poolSize: 10, // Maintain up to 10 socket connections
                //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                //family: 4 // Use IPv4, skip trying IPv6
                //loggerLevel: "debug"
            };
            this.instance.connect(CONFIG.mongo.address, options,
                (error) => {
                    if (error || !this.isConnected()) {
                        this.logger.error('[BOOTING] Error while connecting to MongoDB database', error);
                        reject(error);
                        return;
                    }

                    this.logger.info(`[BOOTING] Connected to ${CONFIG.mongo.address}`);
                    let files = fs.readdirSync(this.repoFolder);
                    if (!files.length) {
                        this.logger.warn("Mongoose schema undefined");
                        resolve();
                        return;
                    }

                    files
                        .filter(file => /\.(.js)$/gi.test(file))
                        .forEach(file => {
                            let prototypeName = file.replace('.js', '');
                            this.logger.debug(`[BOOTING] Initialize repository model ${prototypeName}`);
                            container.get(require(join(this.repoFolder, file))[prototypeName]);
                        });

                    this.logger.info('[BOOTING] Data models initialization has been completed');
                    resolve();
                }
            );
        });
        return retry(promiseWrapper, CONFIG.mongo.maxConnectionAttempt, CONFIG.mongo.connectionRetryTimeout);
    }

    private isConnected() {
        return this.instance.connection ? this.instance.connection.readyState === 1 : false;
    }
}
