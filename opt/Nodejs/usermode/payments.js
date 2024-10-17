const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bycrypto = require('bcrypt')
const jwt = require('jsonwebtoken');
const schema = new mongoose.Schema({

    productname:{
        type:String,
        require:true
    },
  
    email:{
        type:String,
        require:true,
        lowercase:true,
  
    },
    amount:{
        type:Number,
        require:true,
      
    },
    reference:{
        type:String
    }
  
})

const mschema = mongoose.model('payment',schema)

module.exports = mschema