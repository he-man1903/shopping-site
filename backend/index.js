const express=require("express");
const cors = require('cors');
const bodyParser = require('body-parser')
const app=express();

const jwt=require('jsonwebtoken')
require('dotenv').config()

var jsonParser = bodyParser.json()
var mongoose=require('mongoose')
var admin=require('./routes/admin');

const { modelName } = require("./models/user");
var db=mongoose.connect('mongodb://localhost:27017/shopping_site', {useNewUrlParser: true, useUnifiedTopology: true });

var urlencodedParser = bodyParser.urlencoded({ extended: true})
app.use(bodyParser.json({type:''}))
app.use(cors());

app.use(admin)
app.use('/public',express.static("./public"));


module.exports=app;