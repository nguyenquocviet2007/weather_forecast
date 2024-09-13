"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const webSocketService_1 = require("./services/webSocketService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT_DEV || 3000;
//Middleware for JSON parsing
app.use(express_1.default.json());
//Database
require("./databases/db");
//Route
(0, index_1.default)(app);
// app.use('/api', sampleRoute);
// app.use('/api/users', require("./routes/users"));
app.get("/", (req, res) => {
    res.send("Hello, Express");
});
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
(0, webSocketService_1.setupWebSocket)(server);
