const mongoose = require('mongoose')


const mbschema = new mongoose.Schema({

      filepath:{
          type:String,
         
      },
      title:{
          type:String,
          require:true
      },
      description:{
          type:String,
          require:true
      },
      price:{
          type:Number,
          require:true
      },
      quantity:{
          type:Number,
          require:true
      }
})

const mymbschema = mongoose.model('mbcategory',mbschema)

module.exports = mymbschema