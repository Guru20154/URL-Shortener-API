import { Router } from "express";
import { redirect, shorten, stats } from "../controllers/url.controller.js";
import rateLimit from "express-rate-limit";

const router = Router();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later.",
});
router.use(limiter);

router.route('/').get((req, res) => {
    res.send('URL shortener!')
});

router.route('/shorten').post(shorten);

router.route('/:shortId').get( redirect);

router.route('/stats/:shortId').get(stats);

export default router;
