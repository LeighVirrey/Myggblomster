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

// Add app.get functions below






//reviews and ratings
app.post('reviews-and-rating', (req, res) => {
    rating = req.body.rating;
    review = req.body.review;
    //DAL function to add review and rating
    res.json({message: "Review and rating added successfully", rating: rating, review: review});
});

app.get('reviews-and-rating/:id', (req, res) => {
    id = req.params.id;
    //DAL function to get review and rating
    ratingAndReviews = [];
    res.json({ratingAndReviews: ratingAndReviews});
});

app.delete('reviews-and-rating/:id', (req, res) => {
    id = req.params.id;
    //DAL function to delete review and rating
    res.json({message: "Review and rating deleted successfully"});
});

app.put('reviews-and-rating/:id', (req, res) => {
    id = req.params.id;
    rating = req.body.rating;
    review = req.body.review;
    //DAL function to update review and rating
    res.json({message: "Review and rating updated successfully", rating: rating, review: review});
});

// Sets local host to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:{PORT}`);
});