require('dotenv').config();
const API_KEY = process.env.API_KEY;

const security = (req, res, next) => req.headers.api_key !== API_KEY ? res.status(403).send("No or not correct API key") : next();

module.exports = security;