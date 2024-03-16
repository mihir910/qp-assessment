import mongoose, { Document, Schema } from 'mongoose';

import { GroceryItem, OrderItem } from './interfaces'
// Define interface for GroceryItem document in MongoDB
interface GroceryItemDocument extends Document {
	name: string;
	price: number;
	inventory: number;
}

// Define Mongoose schema for GroceryItem
const groceryItemSchema = new Schema<GroceryItemDocument>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	inventory: { type: Number, required: true },
});

// Define Mongoose model for GroceryItem
const GroceryItemModel = mongoose.model<GroceryItemDocument>('GroceryItem', groceryItemSchema);

export class GroceryStore {
	// Method to add new grocery items
	async addGroceryItem (item: GroceryItem): Promise<void> {
		const newItem = new GroceryItemModel(item);
		await newItem.save();
	}

	// Method to view existing grocery items
	async viewGroceryItems (): Promise<GroceryItem[]> {
		const items = await GroceryItemModel.find().lean();
		return items.map(item => ({
			id: item._id,
			name: item.name,
			price: item.price,
			inventory: item.inventory
		}));
	}

	// Method to remove grocery items
	async removeGroceryItem (itemId: string): Promise<void> {
		await GroceryItemModel.findByIdAndDelete(itemId);
	}

	// Method to update details of existing grocery items
	async updateGroceryItem (itemId: string, updatedItem: Partial<GroceryItem>): Promise<void> {
		await GroceryItemModel.findByIdAndUpdate(itemId, updatedItem);
	}

	// Method to manage inventory levels of grocery items
	async manageInventory (itemId: string, quantity: number): Promise<void> {
		await GroceryItemModel.findByIdAndUpdate(itemId, { $inc: { inventory: quantity } });
	}

	// Method to process user's order
	async processOrder (orderItems: OrderItem[]): Promise<boolean> {
		for (const orderItem of orderItems) {
			const item = await GroceryItemModel.findById(orderItem.itemId);
			if (!item || item.inventory < orderItem.quantity) {
				return false; // Item not found or insufficient inventory
			}
		}
		// Reduce inventory and process order
		for (const orderItem of orderItems) {
			await GroceryItemModel.findByIdAndUpdate(orderItem.itemId, {
				$inc: { inventory: -orderItem.quantity }
			});
		}
		return true; // Order processed successfully
	}
}
