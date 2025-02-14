require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const security = require('./middleware/security');
const PORT = process.env.PORT;

app.use(cors());
app.use(security);

app.get('/', (req, res) => res.status(200).send("Hello, World!"));

app.all('*', (req, res) => res.status(404).send("Route not found.\nCheck the path!"));

app.listen(PORT, () => console.log(`Server is running on porn ${PORT}`));