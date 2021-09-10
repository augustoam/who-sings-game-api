import {Inject, Provide} from "../../context/IocProvider";
import {BootPhase} from "../BootPhase";
import {Application} from "../../context/Application";
import {LoggerFactory} from "../../context/components/LoggerFactory";
import {MongoDB} from "../../context/components/MongoDB";

@Provide(MongoDBPhase)
export class MongoDBPhase extends BootPhase{

    protected logger: Logger = LoggerFactory.getLogger("MongoDBPhase");

    constructor(@Inject(MongoDB) private mongoDB: MongoDB) {
        super();
    }

    public async execute(app: Application): Promise<void> {
        this.logger.info('[BOOTING] Initializing MongoDB database...');

        await this.mongoDB.init();

        this.logger.info('[BOOTING] MongoDB Database initialized!');
    }

}