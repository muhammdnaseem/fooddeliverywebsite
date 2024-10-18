import express from "express";
import { stripePayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/add", stripePayment); // Stripe payment route


export default paymentRouter;
