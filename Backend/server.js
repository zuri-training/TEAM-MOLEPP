const express = require('express');
const { json } = require("express");
const connect = require('./config/database');
const taskRoute = require('./router/userRouter');

connect ()

const app = express();
app.use(json());


const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('MongoDB Task')
});

app.listen(PORT, () => console.log(`serving at port ${PORT}`));