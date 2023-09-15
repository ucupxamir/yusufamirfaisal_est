import express from "express";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {router} from "../route/api.js";

export const web = express();
web.use(express.json());
web.use(router);

web.use(errorMiddleware);