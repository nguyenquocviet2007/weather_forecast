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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const subscription_model_1 = __importDefault(require("../models/subscription.model"));
const weather_service_1 = require("./weather.service");
dotenv_1.default.config();
class EmailService {
    static sendConfirmationEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmationLink = `${process.env.BASE_URL}/api/subscription/confirm-subscription?email=${email}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Confirmation your subscription to daily weather information',
                text: `Please confirm your subscription by clicking on the following link: ${confirmationLink}`
            };
            return this.transporter.sendMail(mailOptions);
        });
    }
    static sendWeatherEmail(email, weather) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Daily Weather Information',
                text: `Today's weather: ${weather}`
            };
            return this.transporter.sendMail(mailOptions);
        });
    }
    static sendUnsubscribeConfirmation(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Unsubscribe Confirmation',
                text: 'You unsubscibed successfully!'
            };
            return this.transporter.sendMail(mailOptions);
        });
    }
    static scheduleSendingWeatherData() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundSubscription = yield subscription_model_1.default.find({ subscriptionStatus: true });
            foundSubscription.forEach(subscriber => {
                node_cron_1.default.schedule('0 7 * * *', () => __awaiter(this, void 0, void 0, function* () {
                    const weather = yield weather_service_1.WeatherService.getCurrentWeather(subscriber.city);
                    yield this.sendWeatherEmail(subscriber.email, weather);
                }));
            }, {
                timezone: 'Asia/Singapore'
            });
        });
    }
}
exports.EmailService = EmailService;
EmailService.transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
