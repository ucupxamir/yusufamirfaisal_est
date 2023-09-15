import express from "express";
import cors from 'cors'
import { errorMiddleware } from "../middleware/error-middleware.js";
import { router } from "../route/api.js";

export const web = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'DELETE']
}

web.use(cors(corsOptions));
web.use(express.json());
web.use(router);

web.use(errorMiddleware);