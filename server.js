const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'Webdev50',
    database : 'thefaces'
    }
});

// db.select('*').from('users').then(data => {    <= postgres testing
//     console.log(data);
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.json('success'); })
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(5000, () => {
console.log('app is running on port 5000');
});





/*
/endpoint --> METHOD == desired result 

/res test connection to localhost:5000
/signin --> POST = success or fail
/register --> POST = return new user object
/profile/:userId --> GET = user
/image --> PUT = update user score and rank

*/

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
//  });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });