const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
});

const users = require('./routes/users');
const doctorInfoRouter = require('./routes/doctorInfo');
const pharmasistInfoRouter = require('./routes/pharmasistInfo');
const prescriptionRouter = require('./routes/prescription');

app.use('/users', users);
app.use('/doctorInfo', doctorInfoRouter);
app.use('/pharmasistInfo', pharmasistInfoRouter);
app.use('/prescription', prescriptionRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});