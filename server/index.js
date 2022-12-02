require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const tasksRoutes = require('./routes/tasksRoutes');


const PORT = process.env.PORT || 5010;

const app = express();

app.use(cors());
app.use(express.json());


//Connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true , useUnifiedTopology: true })
    .then((result) => {
        console.log(`Connected to Database`);
        console.log(`Listening on port ${PORT}`);
        app.listen(PORT)
    })
    .catch(err => {
        console.log(err)
    });

app.use('/api/user', userRoutes);
app.use('/api/task', tasksRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ done: "Hello"})
})