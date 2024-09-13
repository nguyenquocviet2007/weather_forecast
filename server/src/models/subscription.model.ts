import {model, Schema} from 'mongoose'

const DOCUMENT_NAME = "Subscription"
const COLLECTION_NAME = "Subscriptions"

const subscriptionSchema = new Schema({
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
})

export default model(DOCUMENT_NAME, subscriptionSchema)