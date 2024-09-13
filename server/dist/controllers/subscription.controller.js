"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const subscription_service_1 = require("../services/subscription.service");
const success_response_1 = require("../core/success.response");
class SubscriptionController {
    constructor() {
        this.subscribe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const city = req.body.city;
            const email = req.body.email;
            new success_response_1.SuccessResponse({
                message: 'A Confirmation email has been send to email',
                metadata: yield subscription_service_1.SubscriptionService.registerSubscriber(email, city)
            }).send(res);
        });
        this.confirmSubscription = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            new success_response_1.SuccessResponse({
                message: 'Your subscription has been confirmed! You will receive daily weather information 7a.m',
                metadata: yield subscription_service_1.SubscriptionService.confirmSubscription(email)
            }).send(res.redirect('http://localhost:5173/'));
        });
        this.unsubscribe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: 'You have been unsubscribed from daily weather information',
                metadata: yield subscription_service_1.SubscriptionService.cancelSubscriber(req.body)
            }).send(res);
        });
        this.sendDailyWeather = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_response_1.SuccessResponse({
                message: 'Weather forecast sent to all subscribers',
                metadata: yield subscription_service_1.SubscriptionService.sendDailyWeatherToSubscriber()
            }).send(res);
        });
    }
}
exports.SubscriptionController = SubscriptionController;
