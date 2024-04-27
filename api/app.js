import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './router/user.router.js';
const app=express();


//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use("/user",userRouter);

app.listen(3001);
console.log("http://localhost:3001");