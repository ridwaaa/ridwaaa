const mongoose = require('mongoose')


const MAschema = new mongoose.Schema({

      filepath:{
          type:String,
         
      },
      
      date:{
          type:Date,
         
      }
})

const myMAschema = mongoose.model('mAcategory',MAschema)

module.exports = myMAschema