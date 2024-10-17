const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bycrypto = require('bcrypt')
const jwt = require('jsonwebtoken');
const schema = new mongoose.Schema({

    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:5
    },
    role:{
        type:String,
        enum:{
            values:['regular','admin','subadmin']
        },
        default:'regular'
    }
})

schema.methods.isValid = function(hashpassword){
return bycrypto.compareSync(hashpassword,this.password)
}

schema.methods.generateJWT = function(){
return jwt.sign({_id:this._id,email:this.email,role:this.role},
   "" + process.env.SECRET,
   {
        
    expiresIn:1300819380
   }
    )
    
}

schema.path('email').validate(val=>{
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 return emailRegex.test(val)
},'Invalid email')

schema.plugin(uniqueValidator,(err,req,res,next)=>{
    if(err.code === 11000){
        res.status(210).json({message:"this email is doublicated sorry!"})
    }else{
        next(err)
    }
})

const myschema = mongoose.model('user',schema)

module.exports = myschema