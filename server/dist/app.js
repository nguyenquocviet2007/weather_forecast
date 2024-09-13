"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT_DEV || 3000;
//Middleware for JSON parsing
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Database
require("./databases/db");
const email_service_1 = require("./services/email.service");
//Route
app.use('', routes_1.default);
// app.use('/api', sampleRoute);
// app.use('/api/users', require("./routes/users"));
//Schedule sending daily weather at 7AM every day
email_service_1.EmailService.scheduleSendingWeatherData();
app.get("/", (req, res) => {
    res.send("Hello, Express");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
