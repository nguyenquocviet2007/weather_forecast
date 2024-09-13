import express from 'express';
import weatherRoutes from './weather';
import subscriptionRoutes from './subscription' 

const router = express.Router();

router.use('/api/weather', weatherRoutes);
router.use('/api/subscription', subscriptionRoutes);

export default router;
