// Import Express, Bcrypt(for password hashing), Cors(for cross-origin requests), Body Parser(for parsing JSON data)
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const {profanity, CensorType} = require('@2toad/profanity');

// Intialize the app
// const { DAL } = require('./DAL/mongo-dal') old DAL
const { DAL } = require('./DAL/mssqlDal')
const app = express();

// Middleware
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('MOVIE REVIEWS RAAAH');
});

app.get('/users', async (req, res) => {
    let users = await DAL.getUsers();
    res.json({users: users});
});

app.get('/user/:id', async (req, res) => {
    id = req.params.id; 
    let user = await DAL.getUserByUserId(id);
    res.json({user: user});
});

app.post('/register', async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    isAdmin = req.body.isAdmin;
    let registerData = {
        email: email,
        password: await bcrypt.hash(password, 10),
        isAdmin: isAdmin
    }
    let user = DAL.createUser(registerData)
    res.json({message: "User added successfully", user: registerData});
});
 

app.post('/login', (req, res) => {
    email = req.body.email;
    password = req.body.password;
    DAL.getUserByEmail(email).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.json({message: "Login successful", user: user, success: true});
                } else {
                    res.json({message: "Login failed", success: false});
                }
            });
        } else {
            res.json({message: "Login failed"});
        }
    });

});

app.delete('/delete/:id', (req, res) => {
    id = req.params.id;
    DAL.deleteUser(id);
    res.json({message: "User deleted successfully"});
});

//reviews and ratings
app.post('/rarCreate', (req, res) => {
    movieId = req.body.movieId;
    userId = req.body.userId;
    rating = req.body.rating;
    review = profanity.censor(req.body.review);
    const data = {
        movieId: movieId,
        userId: userId,
        starRating: rating,
        movieReview: review
    }
    DAL.createRAR(data);
    res.json({message: "Review and rating added successfully", rating: rating, review: review});
});

app.get('/rarId/:id', async (req, res) => {
    id = req.params.id;
    ratingAndReviews = await DAL.getRAR(id);
    res.json({ratingAndReviews: ratingAndReviews});
});


app.get('/rarMovie/:id', async (req, res) => {
    id = req.params.id;
    ratingAndReviews = await DAL.getMovieByMovieId(id);
    res.json({ratingAndReviews: ratingAndReviews});
});

app.get('/rarUser/:id', async (req, res) => {
    id = req.params.id;
    ratingAndReviews = await DAL.getReviewsByUserId(id);
    res.json({ratingAndReviews: ratingAndReviews});
});

app.delete('/rarDelete/:id', (req, res) => {
    id = req.params.id;
    DAL.deleteRAR(id);
    res.json({message: "Review and rating deleted successfully"});
});

app.put('/rarUpdate/:id', async (req, res) => {
    id = req.params.id;
    movieId = req.body.movieId;
    userId = req.body.userId;
    rating = req.body.rating;
    review = profanity.censor(req.body.review);
    const data = {
        movieId: movieId,
        userId: userId,
        starRating: rating,
        movieReview: review
    }
    DAL.updateRAR(data, id);
    res.json({message: "Review and rating updated successfully", rating: rating, review: review});
});

// Sets local host to port 9000
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});