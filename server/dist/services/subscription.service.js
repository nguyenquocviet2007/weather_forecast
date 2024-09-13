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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const error_response_1 = require("../core/error.response");
const subscription_model_1 = __importDefault(require("../models/subscription.model"));
const email_service_1 = require("./email.service");
const weather_service_1 = require("./weather.service");
class SubscriptionService {
    static registerSubscriber(email, city) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new error_response_1.NotFoundError('Not Found Email');
            }
            const foundSubscriber = yield subscription_model_1.default.findOne({ email });
            if (foundSubscriber) {
                throw new error_response_1.BadRequestRequestError('Email already registered');
            }
            const newSubscriber = new subscription_model_1.default({ email, city });
            yield newSubscriber.save();
            return email_service_1.EmailService.sendConfirmationEmail(email);
        });
    }
    static confirmSubscription(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new error_response_1.NotFoundError('Not Found Email');
            }
            const foundSubscriber = yield subscription_model_1.default.findOne({ email });
            if (!foundSubscriber) {
                throw new error_response_1.BadRequestRequestError('Subscriber not found!');
            }
            foundSubscriber.subscriptionStatus = true;
            yield foundSubscriber.save();
            return foundSubscriber;
        });
    }
    static cancelSubscriber(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundSubscriber = yield subscription_model_1.default.findOne({ email });
            if (!foundSubscriber) {
                throw new error_response_1.BadRequestRequestError('Subscriber have not subscribed');
            }
            return email_service_1.EmailService.sendUnsubscribeConfirmation(email);
        });
    }
    static sendDailyWeatherToSubscriber() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundConfirmedSubscriber = yield subscription_model_1.default.find({ subscriptionStatus: true });
            foundConfirmedSubscriber.forEach((subscriber) => __awaiter(this, void 0, void 0, function* () {
                const weather = yield weather_service_1.WeatherService.getCurrentWeather(subscriber.city);
                yield email_service_1.EmailService.sendWeatherEmail(subscriber.email, JSON.stringify(weather));
            }));
            return { result: `${foundConfirmedSubscriber.length} emails sent` };
        });
    }
}
exports.SubscriptionService = SubscriptionService;
