import express from 'express';
import { createGroceryItem, fetchGroceryItems, updateGroceryItem, updateInventory, deleteGroceryItem } from '../controllers/adminController';
import { validateAddGroceryItem } from '../controllers/adminController';

const router = express.Router();

// Route to add new grocery items
router.post('/grocery', validateAddGroceryItem, createGroceryItem)

// Route to view existing grocery items
router.get('/grocery', fetchGroceryItems)

// Route to remove grocery items
router.delete('/grocery/:id', deleteGroceryItem)

// Route to update details of existing grocery items
router.put('/grocery/:id', updateGroceryItem)

// Route to manage inventory levels of grocery items
router.patch('/grocery/:id/inventory', updateInventory)

export default router;
