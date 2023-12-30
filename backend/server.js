/**
 * //* - POST /api/users - Register a user
 * //* - POST /api/users/auth - Autheticate a user and get token
 * //* - POST /api/users/logout - Logout user and clear cookie
 * //* - GET /api/users/profile - Get user profile
 * //* - PUT /api/users/profile - Update profile
 */

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRoute from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 500;

connectDB();

const app = express();

//* Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoute);

if (process.env.NODE_ENV === 'production') {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, 'frontend/dist')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
	);
} else {
	app.get('/', (req, res) => res.send('Server is ready'));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server start at ${port}`);
});
