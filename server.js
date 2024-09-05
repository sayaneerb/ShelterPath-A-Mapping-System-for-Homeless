const express = require ("express");
const app = express();
const connectDB = require("../MainFolder/server/database/conn");

// requiring dotenv
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const path = require("path");
//using dotenv
  // giving absolute path to the env
  dotenv.config({path:'config.env'});
const PORT= process.env.PORT || 8000;

  connectDB();

app.use(bodyParser.urlencoded({
    extended:true}));
// app.use(bodyParser.json());
  

app.set("view engine", 'ejs');
app.use('/css',express.static(path.resolve(__dirname, "assets/css")));
app.use('/img',express.static(path.resolve(__dirname, "assets/img")));
app.use('/js',express.static(path.resolve(__dirname, "assets/js")));



app.use('/',require('./server/routs/routing'));

app.listen(PORT, ()=>{
      console.log(`listening at port number ${PORT}`)
})