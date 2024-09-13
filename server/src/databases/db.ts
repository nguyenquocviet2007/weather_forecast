'use strict'
import mongoose, {ConnectOptions} from "mongoose";
import dotenv from "dotenv"
import config from "../configs/config.mongodb"
const {host, port, name} = config.db


dotenv.config()
const uri = `mongodb+srv://nqviet:8rhZ057YVvUVgxls@cluster0.ycstm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
class Database {
    static instance: Database;
    constructor() {
        this.connect();
    }

    connect(type = "mongodb") {
        mongoose.connect(uri)
            .then( _ => {
                console.log("Connect MongoDB Successfully!");
            })
            .catch(error => console.log(error));
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;