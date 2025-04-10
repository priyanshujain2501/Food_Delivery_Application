import {Router} from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/order.controller.js'

const orderRouter = Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);


export default orderRouter;