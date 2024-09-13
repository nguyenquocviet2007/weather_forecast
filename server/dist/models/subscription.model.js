"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = "Subscription";
const COLLECTION_NAME = "Subscriptions";
const subscriptionSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    subscriptionStatus: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, subscriptionSchema);
