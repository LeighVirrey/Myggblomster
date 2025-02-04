const express = require('express');
const app = express();
const { DAL } = require('./mssqlDal');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.json());


app.get('/', async (req, res) => {
    res.send('TESTING');
});

app.get('/users', async (req, res) => {
    let users = await DAL.getAllUsers();
    res.json({users: users});
});

app.post('/register', async (req, res) => {
        email = req.body.email;
        password = req.body.password;
        isAdmin = req.body.isAdmin;
        let registerData = {
            email: email,
            password: password,
            isAdmin: isAdmin
        }
        let user = await DAL.createUser(registerData)
        res.json({message: "User added successfully", user: registerData});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});