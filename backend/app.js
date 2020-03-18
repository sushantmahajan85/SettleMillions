const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connection successful!!!');
    });




app.use(cookieParser());
// app.use((req, res, next) => {
//     console.log(req.cookies);
//     next();
// });
app.use('/api/v1/users', userRouter);
app.use('/', viewRouter);


app.listen(4000, () => {
    console.log('Listening');
});

