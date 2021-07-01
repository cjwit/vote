// environment variables
// require NODE_ENV, DBURL, and PORT
// DBURL and PORT are in .env in development
NODE_ENV = process.env.NODE_ENV || 'development'
if (process.env.NODE_ENV !== 'production') {
    console.log('NODE_ENV:', NODE_ENV)
    console.log('Loading environment variables from .env\n')
    require('dotenv').config();
}

// app requirements and config
var express = require('express');
var path = require('path');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { cursorTo } = require('readline');

var app = express();

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../app/dist')));

// controllers
// Polls FIXME: needs change from mongoose to mongodb
var pollController = require('./database/pollController');
app.use('/api/polls', pollController);
var userController = require('./database/userController');
const { MongoClient } = require('mongodb');
app.use('/api/user', userController);

// passport config FIXME
// var User = require('./data/user.js');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport requests FIXME
// app.post('/api/register', function(req, res) {
//     console.log('register called', req.body);
//     User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
//         if (err) {
//             res.json({ message: 'error' });
//         } else {
//             res.json({ message: 'user created' });
//         }
//     });
// });

// app.get('/api/auth', function(req, res) {
//     console.log('checking login status')
//     if (req.user) {
//         console.log('  -- user:', req.user.username, '\n');
//         res.json(req.user.username);
//     }
//     else {
//         console.log('  -- not logged in\n');
//         res.send(false);
//     }
// })

// incorrect login results in 401 error, needs to be caught somewhere
// app.post('/api/auth/login',
//     passport.authenticate('local'),
//     function(req, res) {
//         console.log('login called');
//         console.log('  -- user from authenticate:', req.user.username, '\n');
//         var result = {
//             username: req.user.username
//         }
//         res.json(result);
//     });

// app.get('/api/auth/logout', function(req, res) {
//     console.log('logged out\n');
//     req.logout();
//     res.send(false);
// });

// app.get('/ping', function(req, res) {
//     res.status(200).send('pong!');
// })

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// connect to database
async function connectDb() {
    const uri = process.env.DBURL;
    const client = new MongoClient(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    
    await client.connect()
        .then(connectedClient => {
            const db = connectedClient.db('vote');
            const polls = db.collection('polls');

            // save using app.locals for use in requests elsewhere
            app.locals.polls = polls;
        })    
}
connectDb()

// listen
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Listening on port', port, '...');
});
