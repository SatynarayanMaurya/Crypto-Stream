import express from "express"
import { fetchPrices } from "../controllers/fetchPrices.controller.js";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createAlert, getUserAlerts, updateAlertActiveState, updateAlertTriggered } from "../controllers/alert.controller.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)


router.get("/get-crypto-prices",fetchPrices)

router.post("/create-alert",authMiddleware,createAlert)
router.get("/get-user-alerts",authMiddleware,getUserAlerts)

router.put("/update-active-state/:alertId",authMiddleware,updateAlertActiveState)
router.put("/update-triggered-state/:alertId",authMiddleware,updateAlertTriggered)
router.post("/send-email",authMiddleware,sendEmail)
export default router