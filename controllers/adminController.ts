import { Request, Response } from 'express';
import { GroceryStore } from '../groceryStore';
import { GroceryItem, OrderItem } from '../interfaces';
import { check, validationResult } from 'express-validator';
const groceryStore = new GroceryStore();

const validateAddGroceryItem = [
	check('name').notEmpty().withMessage('Name is required'),
	check('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	check('inventory').notEmpty().withMessage('Inventory is required').isInt({ gt: 0 }).withMessage('Inventory must be a positive integer'),
];

// Route to add new grocery items
export const createGroceryItem = (req: Request, res: Response) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const newItem: GroceryItem = req.body;
	groceryStore.addGroceryItem(newItem);
	res.status(201).send('Grocery item added successfully');
};

// Route to view existing grocery items
export const fetchGroceryItems =  (req: Request, res: Response) => {
	const items = groceryStore.viewGroceryItems();
	res.status(200).json(items);
};

// Route to remove grocery items
export const deleteGroceryItem = (req: Request, res: Response) => {
	const itemId = req.params.id;
	groceryStore.removeGroceryItem(itemId);
	res.status(200).send('Grocery item removed successfully');
};

// Route to update details of existing grocery items
export const updateGroceryItem = (req: Request, res: Response) => {
	const itemId = req.params.id;
	const updatedItem: Partial<GroceryItem> = req.body;
	groceryStore.updateGroceryItem(itemId, updatedItem);
	res.status(200).send('Grocery item updated successfully');
};

// Route to manage inventory levels of grocery items
export const updateInventory = (req: Request, res: Response) => {
	const itemId = req.params.id;
	const { quantity } = req.body;
	groceryStore.manageInventory(itemId, quantity);
	res.status(200).send('Inventory managed successfully');
};

export {validateAddGroceryItem}