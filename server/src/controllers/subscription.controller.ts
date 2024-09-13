import { SubscriptionService } from "../services/subscription.service";
import { SuccessResponse } from "../core/success.response";
import { Request, Response, NextFunction } from "express";


export class SubscriptionController {
    subscribe = async (req: Request, res: Response, next: NextFunction) => {
        const city = req.body.city
        const email = req.body.email
        new SuccessResponse({
            message: 'A Confirmation email has been send to email',
            metadata: await SubscriptionService.registerSubscriber(email, city)
        }).send(res)
    }

    confirmSubscription = async (req: Request, res: Response, next: NextFunction) => {
        const email = req.query.email as string
        new SuccessResponse({
            message: 'Your subscription has been confirmed! You will receive daily weather information 7a.m',
            metadata: await SubscriptionService.confirmSubscription(email)
        }).send(res)
    }

    unsubscribe = async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'You have been unsubscribed from daily weather information',
            metadata: await SubscriptionService.cancelSubscriber(req.body)
        }).send(res)
    }

    sendDailyWeather = async(req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Weather forecast sent to all subscribers',
            metadata: await SubscriptionService.sendDailyWeatherToSubscriber()
        }).send(res)
    }
}