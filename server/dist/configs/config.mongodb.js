"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dev = {
    app: {
        port: process.env.PORT_DEV || 8080
    },
    db: {
        host: process.env.DB_HOST_DEV || 'localhost',
        port: process.env.DB_PORT_DEV || '27017',
        name: process.env.DEB_NAME_DEV || 'problem5'
    }
};
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
const config = { dev };
const env = process.env.NODE_ENV || 'dev';
exports.default = config[env];
