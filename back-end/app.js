// Import Express, Bcrypt(for password hashing), Cors(for cross-origin requests), Body Parser(for parsing JSON data)
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const profanity = require('@2toad/profanity');

// Intialize the app
const { DAL } = require('./DAL/mongo-dal')
const app = express();

// Middleware
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(express.json());


// Add app.get functions below
app.get('/', (req, res) => {
    res.send('MOVIE REVIEWS RAAAH');
});
// Add app.port functions below
//reviews and ratings
app.post('/rarCreate', (req, res) => {
    movieId = req.body.movieId;
    userId = req.body.userId;
    rating = req.body.rating;
    review = profanity.censor(req.body.review);
    const data = {
        movieId: movieId,
        userId: userId,
        rating: rating,
        review: review
    }
    DAL.createRAR(data);
    res.json({message: "Review and rating added successfully", rating: rating, review: review});
});

app.get('/rar/:id', (req, res) => {
    id = req.params.id;
    ratingAndReviews = DAL.getRAR(id);
    res.json({ratingAndReviews: ratingAndReviews});
});

app.delete('/rarDelete/:id', (req, res) => {
    id = req.params.id;
    DAL.deleteRAR(id);
    res.json({message: "Review and rating deleted successfully"});
});

app.put('/rarUpdate/:id', (req, res) => {
    id = req.params.id;
    movieId = req.body.movieId;
    userId = req.body.userId;
    rating = req.body.rating;
    review = profanity.censor(req.body.review);
    const data = {
        movieId: movieId,
        userId: userId,
        rating: rating,
        review: review
    }
    DAL.updateRAR(data, id);
    res.json({message: "Review and rating updated successfully", rating: rating, review: review});
});

// Sets local host to port 9000
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});