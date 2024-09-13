'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_mongodb_1 = __importDefault(require("../configs/config.mongodb"));
const { host, port, name } = config_mongodb_1.default.db;
dotenv_1.default.config();
const uri = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor() {
        this.connect();
    }
    connect(type = "mongodb") {
        mongoose_1.default.connect(uri)
            .then(_ => {
            console.log("Connect MongoDB Successfully!");
        })
            .catch(error => console.log(error));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
