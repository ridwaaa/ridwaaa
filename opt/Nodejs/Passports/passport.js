const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../usermode/usermode')

passport.use('local',new localStrategy({
    usernameField :"email",
    passwordField: "password"
}, function(email,password,done){
   User.findOne({email:email})
   .then(user=>{
       if(!user){
        return done(null,false,{message:"incorrect user"})
       }
       if (!user.isValid(password)){return done(null,false,{message:"incorrect password"}) }
       else {return done(null,user)}
   }).catch(err=>{
    if(err){return done(err)}
   })
    /*
    ,(err,user)=>{
       if(err){return done(err)}
      if(!user){return done(null,false,{message:"incorrect user"})}
      if (!user.isValid(password)){return done(null,false,{message:"incorrect password"}) }
       else {return done(null,user)}
   })
  */
}))
passport.serializeUser(function(user,done){
         done(null,user._id)
})
passport.deserializeUser(function(userId,done){
User.findById(userId)
.then(user=>{
    done(null,user)
}).catch(err=>{
    done(err)
})
})