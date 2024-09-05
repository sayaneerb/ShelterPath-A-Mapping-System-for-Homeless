const mongoose = require('mongoose');
const connectDB = require('../database/conn');

var schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
      email:{
          type: String,
          required: true  
      },
      status: String,
      ngoName : {
          type: String
      },
      details:{
          type:String
      },
      phone:{
          type: Number
      },
      lng:{
          type:Number
      },
      lat:{
          type:Number
      }

})
    const Userdb= mongoose.model('Userdb',schema);
       module.exports=Userdb;