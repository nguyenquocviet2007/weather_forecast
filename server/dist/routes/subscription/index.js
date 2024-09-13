"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../../helper/asyncHandler"));
const subscription_controller_1 = require("../../controllers/subscription.controller");
const router = (0, express_1.Router)();
const subscriptionController = new subscription_controller_1.SubscriptionController();
router.post('/subscribe', (0, asyncHandler_1.default)(subscriptionController.subscribe));
router.get('/confirm-subscription', (0, asyncHandler_1.default)(subscriptionController.confirmSubscription));
router.post('/unsubscribe', (0, asyncHandler_1.default)(subscriptionController.unsubscribe));
router.get('/send-daily-weather', (0, asyncHandler_1.default)(subscriptionController.sendDailyWeather));
exports.default = router;
