// Import Express, Bcrypt(for password hashing), Cors(for cross-origin requests), Body Parser(for parsing JSON data)
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

// Intialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const { DAL } = require('./DAL/mongo-dal')
// Add app.get functions below

// Add app.port functions below


// Sets local host to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:{PORT}`);
});