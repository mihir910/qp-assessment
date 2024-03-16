import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from '../routes/adminRoutes';
import userRoutes from '../routes/userRoutes';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/grocery_store')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
app.use(express.json());

// Mount admin routes
app.use('/admin', adminRoutes);

// Mount user routes
app.use('/user', userRoutes);

// Set up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
