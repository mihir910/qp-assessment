export interface GroceryItem {
	id: string;
	name: string;
	price: number;
	inventory: number;
}

export interface OrderItem {
	itemId: string;
	quantity: number;
}
