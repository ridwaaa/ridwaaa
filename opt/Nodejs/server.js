const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const { authRole  }  = require('./Helpauth/roles')
const  bodyparser = require('body-parser')
const  passport = require('passport')
                  require('./Passports/passport')
//const { unique } = require('underscore')
                    require('dotenv').config
const routerAPI = require('./routes/router')
//const ngrok = require('ngrok');
const path =    require('path')
const http = require('http')
const https = require('https')
             
console.log(authRole())

  mongoose.connect('mongodb://127.0.0.1:27017/eBuuk',{ useNewUrlParser: true, useUnifiedTopology: true,
	  
	 connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000
	  })
  .then(()=>{
        console.log("Mongo DB is connected successfully")
  }).catch(err=>{
      console.log("error is occurred",err)
  })
  
  

     const app = express()           
             
     

     app.use(cors({
        orgin:['https://e-buuk.com','http://127.0.0.1:4200'],
        credentials:true
    }))
    app.use(cors({
        origin: '*'
    }));
    
    app.use(express.static('uploads'));
    app.use(express.static('uploads/BAgs'));
    app.use(express.static('BAgs'));
 app.use(passport.initialize())
 app.use(cors())
 app.use(morgan('dev'))
app.disable('etag')
 app.use(bodyparser.urlencoded({extended:true}))
 app.use(bodyparser.json())
// app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const corsoption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

app.use(cors(corsoption));


app.use('/api',routerAPI)

 const PORT = process.env.PORT || 8080

 app.listen(PORT,err=>{

     if(!err){
         console.log("server is up successfully")
        
     }else{
         console.log("error is occurred")
     }
 })
