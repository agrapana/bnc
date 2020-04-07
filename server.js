const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const passport = require('passport');
const session = require('express-session');
// const server = require('http').createServer(app);

// import express, { static } from 'express'; // use babel next
// import { json, urlencoded } from 'body-parser';
// import cookieParser from 'cookie-parser';
// import { connect } from 'mongoose';
const SteamStrategy = require('passport-steam').Strategy;
require('dotenv').config();
///////////////////////////////////////////////////////////////////////////////
///////////////    USING PASSPORT  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'https://bnc.web.id/api/steam/return',
    realm: 'https://bnc.web.id/api/steam/auth',
    apiKey: process.env.STEAMAPIKEY,
    stateless: true
},
    function (identifier, profile, done) {
        // console.log(identifier, "<<<<<<<<<<<identifier")
        // console.log(profile, "<<<<<<<<<<<profile")
        // console.log(done, "<<<<<<<<<<<done")
        process.nextTick(function () {

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));
///////////////////////////////////////////////////////////////////////////////


const mongoose = require('mongoose');


///////////////////////////////////////////////////////////////////////////////
///////////////    USING MONGODB ATLAS ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
mongoose.connect(process.env.MONGODB_ATLAS, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connecting successfull')
})
///////////////////////////////////////////////////////////////////////////////

// mongoose.connect(process.env.MONGODB_URI, {
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'rocky',
    name: 'lumisoft_session',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000
}));
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use(express.static('client/build'))
global.__basedir = __dirname;

//==================================================================
//                              ROUTER
//==================================================================
const usersRouter = require('./client/src/server/api/users');
const clientsRouter = require('./client/src/server/api/clients');
const applicationsRouter = require('./client/src/server/api/applications');
//==================================================================
//                              API
//==================================================================
app.use('/api/users', usersRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/applications', applicationsRouter);


//==================================================================
//                         TEMPLATE ROUTER
//==================================================================
const portfolioRouter = require('./client/src/server/templateapi/portfolio/portfolio');
const categoryRouter = require('./client/src/server/templateapi/category/category');
const galleryRouter = require('./client/src/server/templateapi/gallery/gallery');
const sliderRouter = require('./client/src/server/templateapi/slider/slider');
const productRouter = require('./client/src/server/templateapi/product/product');
const productcolorRouter = require('./client/src/server/templateapi/product/productcolor');
const productcatRouter = require('./client/src/server/templateapi/product/productcat');
const productbrandRouter = require('./client/src/server/templateapi/product/productbrand');
const productsizeRouter = require('./client/src/server/templateapi/product/productsize');
const serversRouter = require('./client/src/server/templateapi/servers/servers');

//==================================================================
//                      CUSTOM TEMPLATE ROUTER
//==================================================================
const steamRouter = require('./client/src/server/templateapi/steam');

//==================================================================
//                              API
//==================================================================
app.use('/api/portfolio', portfolioRouter);
app.use('/api/category', categoryRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/slider', sliderRouter);
app.use('/api/product', productRouter);
app.use('/api/productcolor', productcolorRouter);
app.use('/api/productcat', productcatRouter);
app.use('/api/productbrand', productbrandRouter);
app.use('/api/productsize', productsizeRouter);
app.use('/api/servers', serversRouter);
//==================================================================
//                          CUSTOM API
//==================================================================
app.use('/api/steam', steamRouter);


// DEFAULT
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 3018;
app.listen(port, () => {
    console.log(`Lumisoft Server Running at port: ${port}`)
});