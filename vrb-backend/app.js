const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Swagger dependencies
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
     .then(() => console.log("MongoDB connected"))
     .catch((err) => console.log(err));

// Swagger options
const swaggerOptions = {
     definition: {
          openapi: '3.0.0',
          info: {
               title: 'MERN CRUD API',
               version: '1.0.0',
               description: 'A simple Express CRUD API with MongoDB for user and role management',
          },
          servers: [
               {
                    url: 'http://localhost:5000/api',  // Your API base URL
               },
          ],
     },
     apis: ['./routes/*.js', './controllers/*.js'],  // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');  // Import auth routes

// API routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);  // Use auth routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
