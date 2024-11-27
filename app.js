const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const productRoutes = require('./routes/product');
const path = require('path');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const numeral = require('numeral');
require('./config/passport');  // Passport configuration should be required here

dotenv.config();  // Load environment variables from .env file
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded bodies
app.use(express.json());  // To parse JSON bodies

// Set up Handlebars view engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    helpers: {
        format_number(value) {
            return numeral(value).format('0,0') + 'd';  // Format number with commas and suffix 'd'
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  // Use path.join for cross-platform compatibility

// Static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));
// Use cookie-parser middleware
app.use(cookieParser());
// Session setup (Express session with flash messages)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',  // Use environment variable for session secret
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: process.env.NODE_ENV === 'production' }  // Secure cookie only in production (HTTPS)
    cookie: { secure: false } // Đặt thành true nếu sử dụng HTTPS
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Define routes
app.use('/product', productRoutes);
app.get('/', (req, res) => {
    res.render('home', { layout: false });
});
app.use('/api', authRoutes);
app.use('/admin',adminRoutes)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
