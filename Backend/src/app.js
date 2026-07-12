const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const reportRouter = require('./routes/interview.route');
const cors = require('cors')

const app = express();

app.disable('etag');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173',
             "https://genai-project-beryl.vercel.app"
    ],
    credentials: true,
    methods:['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is healthy'
    });
});

app.use('/api/auth', authRouter);
app.use('/api/interview', reportRouter);


module.exports = app;
