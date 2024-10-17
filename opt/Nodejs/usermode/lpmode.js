const mongoose = require('mongoose')


const lpschema = new mongoose.Schema({

      filepath:{
          type:String,
         
      },
      Bfilepath:{
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
      subtitle:{
        type:String,
        require:true
      },
      description1:{
        type:String,
        require:true
    },
    subtitle2:{
      type:String,
      require:true
    },
    description2:{
      type:String,
      require:true
  },
  subtitle3:{
    type:String,
    require:true
  },
  description3:{
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

const mylpschema = mongoose.model('lpcategory',lpschema)

module.exports = mylpschema
