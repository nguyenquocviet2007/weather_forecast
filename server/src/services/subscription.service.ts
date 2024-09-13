import { BadRequestRequestError, NotFoundError } from '../core/error.response'
import SubscriptionModel from '../models/subscription.model'
import { EmailService } from './email.service'
import { WeatherService } from './weather.service'

export class SubscriptionService {
    static async registerSubscriber(email: string, city: string) {
        if (!email) {
            throw new NotFoundError('Not Found Email')
        }

        const foundSubscriber = await SubscriptionModel.findOne({email})

        if(foundSubscriber) {
            throw new BadRequestRequestError('Email already registered')
        }

        const newSubscriber = new SubscriptionModel({email,city});
        await newSubscriber.save()

        return EmailService.sendConfirmationEmail(email)
    }

    static async confirmSubscription(email: string) {

        if (!email) {
            throw new NotFoundError('Not Found Email')
        } 

        const foundSubscriber = await SubscriptionModel.findOne({email})
        
        if(!foundSubscriber) {
            throw new BadRequestRequestError('Subscriber not found!')
        }

        foundSubscriber.subscriptionStatus = true;
        await foundSubscriber.save()

        return foundSubscriber
    }

    static async cancelSubscriber(email: string) {
        const foundSubscriber = await SubscriptionModel.findOne({email})

        if(!foundSubscriber) {
            throw new BadRequestRequestError('Subscriber have not subscribed')
        }

        return EmailService.sendUnsubscribeConfirmation(email)
    }

    static async sendDailyWeatherToSubscriber() {
        const foundConfirmedSubscriber = await SubscriptionModel.find({subscriptionStatus: true})

        foundConfirmedSubscriber.forEach(async (subscriber) => {
            const weather = await WeatherService.getCurrentWeather(subscriber.city)
            await EmailService.sendWeatherEmail(subscriber.email, JSON.stringify(weather))
        })
        
        return { result: `${foundConfirmedSubscriber.length} emails sent` };
    }
}