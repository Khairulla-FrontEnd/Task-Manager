require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const security = require('./middleware/security');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const tasks = require('./routes/tasks');
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(security);
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/tasks', tasks);


app.all('*', (req, res) => res.status(404).send("Route not found.\nCheck the path!"));

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on porn ${PORT}`));
});