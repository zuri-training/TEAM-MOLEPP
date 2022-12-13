const express = require('express');
const { json } = require("express");
const connect = require('./config/database');
const userRouter = require('./router/userRouter');
const cors = require("cors");

connect ()

const app = express();
app.use(json());


app.use(cors())

// app.use("/", router);
app.use("/api/v1/users", userRouter);


app.get('/', (req,res) => {
    res.send('MongoDB Task')
});


app.listen(3000, () => console.log(`Server Running at Port 3000`));



