/**
 * Dotenv is a zero-dependency module that loads environment variables
 * from a .env file into process.env
 */
import * as dotenv from "dotenv";
import { IConfigFile } from "../../types";

dotenv.config();
const { env } = process;

export const CONFIG: IConfigFile = {
    logging: {
        level: env.LOG_LEVEL as string,
        logsFolder: env.LOG_PATH as string,
        useFileAppender: false,
        prefix: "Service",
        fileName: "who-sings-musixmatch-logs.log",
        maxFiles: 5,
        maxSize: 10485760
    },
    nodeEnv: env.NODE_ENV || "development",
    port: env.HTTP_PORT || "3000",
    cors: {
        whitelist: (env.CORS_WHITELIST as string).split(',') || '*',
        methods: [
            'GET',
            'PUT',
            'POST',
            'DELETE',
            'PATCH',
            'OPTIONS'
        ],
        credentials: true,
        exposedHeaders: [
            "Content-Disposition"
        ]
    },
    mongo: {
        debug: false,
        address: env.MONGODB_ADDRESS as string,
        database: env.MONGODB_DATABASE as string,
        user: env.NOSQL_USER as string,
        password: env.NOSQL_PASSWORD as string,
        maxConnectionAttempt: 10,
        connectionRetryTimeout: 5000
    },
    redis: {
        keyPrefix: "who-sings-musixmatch:cache",
        host: env.REDIS_ADDRESS as string,
        port: parseInt(env.REDIS_PORT) as number,
        password: env.REDIS_PASSWORD as string,
    },
    musixmatch: {
        address: env.MUSIXMATCH_ADDRESS as string,
        apiKey: env.MUSIXMATCH_API_KEY as string
    }
};
