const jwt = require('jsonwebtoken')
const { identity, isFunction } = require('underscore')
const chModel = require('../usermodel/chargeSchema')


module.exports.virifyJwtToken = (req,res,next)=>{
    var token

    if('authorization' in req.headers)
       token = req.headers.authorization.split(' ')[1]
    
 if(!token) {
     return res.stastus(301).send({auth:false, message:"no token is found"})
 }else{
     jwt.verify(token,"" + process.env.SECRET,
     
     (err,decoded)=>{
         if(err){
            return res.status(302).send({auth:false, message:"token authentication faild"})
        }else{
            req._id = decoded._id
            req.email = decoded.email
           // const chmodel = new chModel()
          //  chModel.findOne(decoded.email,(err,user)=>{
          //      if(!err){
            //        console.log(user)
            //        return res.status(401).json({user})
            //    }else{
             //       return res.status(400).json(err)
              //  }
           // })
        }

     })
     next()
 }




}