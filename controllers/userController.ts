import express, { Request, Response } from 'express';
import { GroceryStore } from '../groceryStore';
import { GroceryItem, OrderItem } from '../interfaces';

const router = express.Router();
const groceryStore = new GroceryStore();

// Route to view available grocery items
export const viewGroceryItemsForUser = (req: Request, res: Response) => {
	const items = groceryStore.viewGroceryItems();
	res.status(200).json(items);
};

// Route to place an order
export const placeOrder = async (req: Request, res: Response) => {
	const orderItems: OrderItem[] = req.body;
	if (await groceryStore.processOrder(orderItems)) {
		res.status(200).send('Order placed successfully');
	} else {
		res.status(400).send('Failed to place order. Insufficient inventory or item not found.');
	}
};

export default router;
