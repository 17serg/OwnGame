const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const corsConfig = require('./configs/cors.config');
const tokensRouter = require('./routers/tokensRouter');
const gamesRouter = require('./routers/gamesRouter');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use('/api/auth/', authRouter);
app.use('/api/tokens/', tokensRouter);

app.use('/api/game/', gamesRouter);


module.exports = app;
