import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import routes from './routes'

dotenv.config();

const app = express();
const port = process.env.PORT_DEV || 3000;

//Middleware for JSON parsing
app.use(express.json());
app.use(cors())


//Database
import "./databases/db"
import { EmailService } from "./services/email.service";
//Route
app.use('', routes)
// app.use('/api', sampleRoute);
// app.use('/api/users', require("./routes/users"));

//Schedule sending daily weather at 7AM every day
EmailService.scheduleSendingWeatherData()

app.get("/", (req, res) => {
    res.send("Hello, Express");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

