import express from "express";
import authMiddleware from './../middleware/auth.js';
import { binancePayment, stripePayment, samsungPayment } from "../controllers/paymentController.js";

// Corrected the router name to be consistent
const paymentRouter = express.Router();

// Use the correct route and method
paymentRouter.post("/add", stripePayment);
paymentRouter.post("/binance", binancePayment);
paymentRouter.post("/samsung", samsungPayment);

export default paymentRouter;
