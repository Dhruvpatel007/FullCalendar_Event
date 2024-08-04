const express = require('express');
const dotenv = require('dotenv');
const cors = require ('cors')
const mongoose = require ("mongoose");
const bodyParser = require('body-parser');
// const  connectDB = require ('./config/db');
const createEvent = require ('./EventController/eventController')


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// const conn = connectDB();
const dbURI = process.env.MONGO_URL
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

const port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    console.log("api is runnung!!!")
})

app.use(createEvent)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(port, ()=>{
    console.log(`application running on ${port}`)
})




