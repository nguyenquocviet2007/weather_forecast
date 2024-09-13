"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weather_1 = __importDefault(require("./weather"));
const subscription_1 = __importDefault(require("./subscription"));
const router = express_1.default.Router();
router.use('/api/weather', weather_1.default);
router.use('/api/subscription', subscription_1.default);
exports.default = router;
