const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    id:{
        type:String
    },
    name:{
        type:String
    },
    filepath:{
        type:String,
       
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        
    },
    bought:{
     type:Number
    },
    sold:{
        type:Number
    },
    date:{
        type:Date,
        default: Date.now
    },
},
{
   // timestamps:true
   timestamps:true
  })

 const SoldSchema = mongoose.model('saylespost',schema)

 module.exports = SoldSchema