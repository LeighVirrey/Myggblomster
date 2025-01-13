// Import Express, Bcrypt(for password hashing), Cors(for cross-origin requests), Body Parser(for parsing JSON data)
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const profanity = require('@2toad/profanity');

// Intialize the app
const app = express();

// Middleware
app.use(cors(origin = '*'));
app.use(bodyParser.json());
app.use(express.json());

// Add app.get functions below

app.post('/', (req, res) => {
    res.send('Welcome to the Movie API');
});




//reviews and ratings
app.post('reviews-and-rating', (req, res) => {
    movieID = req.body.movieID;
    rating = req.body.rating;
    review = profanity.censor(req.body.review);

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
    review = profanity.censor(req.body.review);
    //DAL function to update review and rating
    res.json({message: "Review and rating updated successfully", rating: rating, review: review});
});

// Sets local host to port 3000
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});