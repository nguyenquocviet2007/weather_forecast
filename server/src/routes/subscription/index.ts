import { Router } from 'express';
import asyncHandler from '../../helper/asyncHandler';
import { SubscriptionController } from '../../controllers/subscription.controller';

const router = Router();
const subscriptionController = new SubscriptionController();


router.post('/subscribe', asyncHandler(subscriptionController.subscribe))
router.get('/confirm-subscription', asyncHandler(subscriptionController.confirmSubscription))
router.post('/unsubscribe', asyncHandler(subscriptionController.unsubscribe))
router.get('/send-daily-weather', asyncHandler(subscriptionController.sendDailyWeather))

export default router;