const express = require('express')
const app = express()
const cors = require('cors');
const { connect } = require('mongoose');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors());
app.use(express.json())

//connecting mongodb
const uri = process.env.Atlas_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    // useCreateIndex:true,
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection successful..')
})

// const goalRouter = require('./routes/goal-users')
const userRouter = require('./routes/users');
const { urlencoded } = require('express');
// app.use('/goal',goalRouter);
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})