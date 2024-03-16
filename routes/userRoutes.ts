import express from 'express';
import { viewGroceryItemsForUser, placeOrder } from '../controllers/userController';

const router = express.Router();

// Route to add new grocery items
router.get('/grocery', viewGroceryItemsForUser);

// Route to view existing grocery items
router.post('/place_order', placeOrder)

export default router;
