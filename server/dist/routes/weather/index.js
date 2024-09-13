"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../../helper/asyncHandler"));
const weather_controller_1 = require("../../controllers/weather.controller");
const router = (0, express_1.Router)();
const weatherController = new weather_controller_1.WeatherController();
router.get('/current', (0, asyncHandler_1.default)(weatherController.getCurrentWeather));
router.get('/forecast', (0, asyncHandler_1.default)(weatherController.getForeCastWeather));
exports.default = router;
