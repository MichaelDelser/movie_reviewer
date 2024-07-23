const express = require('express');
const connectDB = require('./config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const moviesRoutes = require('./routes/media');
const mediaRoutes = require('./routes/media')
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');
const reportsRoutes = require('./routes/reports');
const watchlistsRoutes = require('./routes/watchlists');
const favouritesRoutes = require('./routes/favourites');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

// MongoDB connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/movies', moviesRoutes);
app.use('/media', mediaRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', usersRoutes);
app.use('/reports', reportsRoutes);
app.use('/watchlist', watchlistsRoutes);
app.use('/favourites', favouritesRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
