import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { request } from 'http';
import { register } from './interfaces/register.interface';
import mongoose, { ConnectOptions } from 'mongoose';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const VERSION: string = "/api/v1";
const BASE_URL: string = "auth";
app.use(express.json());
app.use(express.urlencoded());


mongoose.connect('mongodb://localhost:27017/crypto-market', {
    
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions, () => {
    console.log('Connected to database');
})

const credentialSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})


try{
    mongoose.model("credentails", credentialSchema,"credentials").create({
        email: "email@example.com",
        username: "klaus139",
        password: "nickolo1232"
    })
} catch(error) {
    console.log(error);
}



app.get('/', (req: Request, res: Response) => {
    res.send('Express is your friend + TypeScript Server');
});

app.post(`${VERSION}/${BASE_URL}/register`, (req: Request, res: Response) => {
    let data:register = req.body;
    console.log(data);
    res.status(201).json({
        message: "User registered successfully",
    
    })
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});




