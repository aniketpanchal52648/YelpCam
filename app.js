if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
console.log(process.env.cloud_name);
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const joi = require('joi');
const { campgroundSchema, reviewSchema } = require('./schema');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const yelpcamp = require('./models/campground');
const reviewS = require('./models/review');
const { campgroundroute } = require('./routes/campground.js')
const { reviewroute } = require('./routes/review');
const { userRoute } = require('./routes/user');
const { loginRoute } = require('./routes/login')
const flash = require('connect-flash');
const passport = require('passport');
const localPassport = require('passport-local');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const user = require('./models/user');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const sessionConfig = {
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(methodOverride('_method'));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error')
    next();
})
main().then(() => {
    console.log('connected');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/campground', campgroundroute)
app.use('/campground/:id/review', reviewroute)
app.use('/', userRoute);
app.use('/', loginRoute);



app.get('/fake', async (req, res) => {
    const newuser = new user({ email: 'aniketpanchal530@gmail.com', username: "aniket52648" });
    const nuser = await user.register(newuser, "aniket52648");
    res.send(nuser);
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 400));
    // res.send('404')

})
app.use((err, req, res, next) => {
    const { message = 'something went wrong', statusCode = 500 } = err;
    res.status(statusCode).render('error', { err });
    // res.send('dhadha')
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
})