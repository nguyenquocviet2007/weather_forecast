import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import cron from 'node-cron'
import SubscriptionModel from '../models/subscription.model'
import { WeatherService } from './weather.service'
dotenv.config()

export class EmailService {
    static transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    static async sendConfirmationEmail(email: string) {
        const confirmationLink = `${process.env.BASE_URL}/api/subscription/confirm-subscription?email=${email}`

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Confirmation your subscription to daily weather information',
            text: `Please confirm your subscription by clicking on the following link: ${confirmationLink}`
        }
        
        return this.transporter.sendMail(mailOptions)
    }

    static async sendWeatherEmail(email: string, weather: any) {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Daily Weather Information',
            text: `Today's weather: ${weather}`
        }

        return this.transporter.sendMail(mailOptions)
    }

    static async sendUnsubscribeConfirmation(email: string) {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Unsubscribe Confirmation',
            text: 'You unsubscibed successfully!'
        }

        return this.transporter.sendMail(mailOptions)
    }

    static async scheduleSendingWeatherData() {
        const foundSubscription = await SubscriptionModel.find({subscriptionStatus: true})
        foundSubscription.forEach(subscriber => {
            cron.schedule('0 7 * * *', async () => {
                const weather = await WeatherService.getCurrentWeather(subscriber.city)
                await this.sendWeatherEmail(subscriber.email, weather)
            })
        },{
            timezone: 'Asia/Singapore'
        })
    }
}