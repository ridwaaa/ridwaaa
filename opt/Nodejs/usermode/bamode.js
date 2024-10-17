const mongoose = require('mongoose')


const bgschema = new mongoose.Schema({

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
    
    
},
{
   // timestamps:true
    timestamp: { type: Date, default: Date.now },
  }
)

const mybgschema = mongoose.model('bgcategory',bgschema)

module.exports = mybgschema
