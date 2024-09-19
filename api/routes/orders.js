import { Router } from 'express'
import OrdersController from '../controllers/ordersController';
const router = Router();

router.post('/createOrder', OrdersController.createOrder);
router.post('/create/:orderId/services', OrdersController.createOrderServices)
router.get('/getOrders', OrdersController.getOrders)
router.put('/updateOrderStatus/:orderId', OrdersController.updateOrderStatus)
export default router;
