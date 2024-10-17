const mongoose = require('mongoose')


const bgschema = new mongoose.Schema({

 amount:{
          type:String,
         
      },
     status:{
        type:String,
       
    },
      
},
{
   // timestamps:true
    timestamp: { type: Date, default: Date.now },
  }
)

const charge = mongoose.model('charge',bgschema)

module.exports = charge