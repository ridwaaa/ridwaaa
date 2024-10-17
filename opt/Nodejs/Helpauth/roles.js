const User = require('../usermode/usermode')
const bycrypto = require('bcrypt')

module.exports.authRole = (req,res,next)=>{
    User.findOne({role:"admin"})
    .then(admin=>{
        if(admin){
            return "this admin is exist already"
        }
              bycrypto.genSalt(10,(err,salt)=>{
                  password="admin123"
                  bycrypto.hash(password,salt,(err,hash)=>{
                      User.create({
                          firstname:"admin",
                          lastname:"myadmin",
                          email:"admin@gmail.com",
                          password:hash,
                          role:"admin"

                      })
                  })
              })
        
    }).catch(err=>{
        return err
    })
}
