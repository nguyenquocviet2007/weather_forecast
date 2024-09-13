import dotenv from "dotenv";
dotenv.config();

interface AppConfig {
    port: number | string;
}

interface DbConfig {
    host: string | undefined;
    port: string | undefined;
    name: string | undefined;
}

interface Config {
    app: AppConfig;
    db: DbConfig;
}

const dev: Config = {
    app: {
        port: process.env.PORT_DEV || 8080
    },
    db: {
        host: process.env.DB_HOST_DEV || 'localhost',
        port: process.env.DB_PORT_DEV || '27017',
        name: process.env.DEB_NAME_DEV || 'problem5'
    }
}

// for production option in the future
// const production: Config = {
//     app: {
//         port: process.env.PORT_PRODUCTION || 3000
//     },
//     db: {
//         host: process.env.DB_HOST_DEV || 'localhost',
//         port: process.env.DB_PORT_DEV || '27017',
//         name: process.env.DEB_NAME_DEV || 'production'
//     }
// };

const config: { [key: string]: Config } = {dev}
const env: string = process.env.NODE_ENV || 'dev'

export default config[env]
