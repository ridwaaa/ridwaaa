const express = require('express')
const Users = require('../usermode/usermode')
const bodyparser = require('body-parser')
const lpchar = require('../usermode/lpmode')
const bcrypto = require('bcrypt')
const passport = require('passport')
const soldschema = require('../usermode/sales')
const soldpost = require('../usermode/salespost')
const axios = require('axios');
const payment = require('../usermode/payments')

var fs = require('fs')






//definition router
const router = express.Router()


//routing api's
router.post('/register',(req,res,next)=>{
    const user = new Users()

  bcrypto.genSalt(10,(err,salt)=>{
      bcrypto.hash(req.body.password,salt,(err,hash)=>{

        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.email = req.body.email,
        user.role = req.body.role
        user.password = hash

        user.save()
        .then(user=>{
          if(user){
            return res.status(200).json({message:"the user saved successfully",user})
          }
        }).catch(err=>{
          if(err){
            next(err)
            return res.status(220).json({message:"this user is not saved successfully"})
          }
        })
          
        })
      
  })
    
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){return res.status(211).json(err)}
        else if(user){return res.status(200).json({"token":user.generateJWT()})}
        else{
            return res.status(212).json({info,message:"incorrect credential"})
        }
    })(req,res,next)
})

//file uploads
const multer = require('multer')
const path = require('path')
const uuid  = require('uuid').v4
const { isValidObjectId } = require('mongoose')
const { object, unique, find } = require('underscore')

/*
const multerstorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
   const ext = path.extname(file.originalname)
   const id = uuid()
   const filePath = `LPchrgrs/${id}${ext}`
   cb(null,filePath)
  }
})

const LPstorage = multer({ storage:multerstorage })

router.post('/lpupload',LPstorage.single('file'),(req,res,next)=>{

  const lpmode = new lpchar()
  
 lpmode.filepath = req.file.filename
  lpmode.title = req.body.title
  lpmode.description = req.body.description
  lpmode.price  = req.body.price
  lpmode.quantity = req.body.quantity

  lpmode.save()
  .then(doc=>{
    if(doc){
      return res.status(200).json({message:"this file is saved successfully",doc})
    }
  }).catch(err=>{
    if(err){
      next(err)
      return res.status(221).json({message:"this file is not saved sorry"})
    }
  
  })
})
*/
const baMod = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname)
    const id = uuid()
    const filePath = `BAgs/${id}${ext}`
     cb(null,filePath)
  }
})

const mybaMode = multer({  storage:baMod })


//ba upload

const baMode = require('../usermode/bamode')

router.post('/baupload',mybaMode.array('files', 2),(req,res,next)=>{
  


const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files provided' });
  }

  
    const filePromises = files.map((file) => {
      if(file.filename.split('.').pop()== "pdf"){
      const bamodel = new baMode();
      bamodel.filepath = file.filename;
      bamodel.title = req.body.title;
      bamodel.description = req.body.description;
      bamodel.subtitle = req.body.subtitle;
      bamodel.description1 = req.body.description1;
      bamodel.subtitle2 = req.body.subtitle2;
      bamodel.description2 = req.body.description2;
      bamodel.subtitle3 = req.body.subtitle3;
      bamodel.description3 = req.body.description3;
      bamodel.price = req.body.price;
  
      return bamodel.save();
      }else{
        const lpmode = new lpchar()
        //const bamodel = new baMode();
        lpmode.filepath = file.filename;
        lpmode.title = req.body.title;
	lpmode.description = req.body.description;
        lpmode.subtitle = req.body.subtitle;
        lpmode.description1 = req.body.description1;
	lpmode.subtitle2 = req.body.subtitle2;
        lpmode.description2 = req.body.description2;
	lpmode.subtitle3 = req.body.subtitle3;      
	lpmode.description3 = req.body.description3;
        lpmode.price = req.body.price;
  
      return lpmode.save();
      }
    });
  
    Promise.all(filePromises)
      .then((docs) => {
        return res.status(200).json({ message: 'Files saved successfully', docs });
      })
      .catch((err) => {
        console.error('Error saving files', err);
        return res.status(500).json({ message: 'Error saving files', error: err });
      });
  
  // Assuming you want to save information for each file
  /*
  const filePromises = files.map((file) => {
    const bamodel = new baMode();
    bamodel.filepath = file.filename;
    bamodel.title = req.body.title;
    bamodel.subtitle = req.body.subtitle;
    bamodel.description = req.body.description;
    bamodel.price = req.body.price;

    return bamodel.save();
  });

  Promise.all(filePromises)
    .then((docs) => {
      return res.status(200).json({ message: 'Files saved successfully', docs });
    })
    .catch((err) => {
      console.error('Error saving files', err);
      return res.status(500).json({ message: 'Error saving files', error: err });
    });
*/
/*
bamodel.filepath = req.files.filename

bamodel.title = req.body.title
bamodel.subtitle = req.body.subtitle
bamodel.description = req.body.description 
bamodel.price = req.body.price 


bamodel.save()
.then(doc=>{
  if(doc){
    return res.status(200).json({message:"this file is saved successfully",doc})
  }
}).catch(err=>{
  if(err){
 
    return res.status(221).json({message:"this file is not saved sorry",err})
  }
})

*/
})



const maAcc = multer.diskStorage({
  destination:(req,file,cb)=>{
        cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname)
    const id = uuid()
    const filePath = `Books/${id}${ext}`
    cb(null,filePath)
  }
})

const mymaAcc = multer({ storage:maAcc })

  const Accesr = require('../usermode/mA_accessory')
const { findOne } = require('../usermode/usermode')

router.post('/accessor',mymaAcc.single('file'),(req,res,next)=>{
 
  const accessor = new Accesr()

  accessor.filepath = req.file.filename


  accessor.save()
  .then(doc=>{
    if(doc){
      return res.status(200).json({message:"this file is saved successfully",doc})
    }
  }).catch(err=>{
    if(err){
      next(err)
      return res.status(221).json({message:"this file is not saved "})
    }
  })
})

//payments

router.post('/initialize-payment', async (req, res) => {
  try {
    const amountinUSD =2.00;
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: amountinUSD * 100,
      currency: "USD",
      email: req.body.email,
  callback_url: 'https://e-buuk.com/chargers', // Redirect URL after successful payment
    }, {
      headers: {
        Authorization: `Bearer sk_live_abfce6b20b347f5283aab014adbbd072fdbcefa6`,
      },
    });
    console.log(response.data)
    if (response.data.status = 'true') {
      // Payment is successful
     // res.json({ success: true });
     const reference = response.data.data.reference
     console.log("this is my referece",reference)
     const mypayment = new payment()
     mypayment.productname = req.body.productname 
    mypayment.email = req.body.email
    mypayment.reference = response.data.data.reference
     const myurl = response.data
     mypayment.save()
     .then(doc=>{
     if(doc){
      
         const url = myurl.data.authorization_url
         const reference = myurl.data.reference
         const id = myurl.data.access_code 
        return res.status(200).json({message:"payment saccesfully saved",success: true,url,reference})
      }else{
        return res.status(222).json({message:"no payment happen"})
      }
    }).catch(err=>{
      console.log(err)
   })
     
    } else {
      res.json({ success: false, message: 'Payment verification failed' });
    }
  //  res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle Paystack webhook events
const chrge = require('../usermode/charge')
router.post('/paystack-webhook', (req, res) => {

  const event = req.body;
  console.log(event.event);
  
  // Handle the event based on the event type
 if (event.event = 'charge.success') {
 
   const data = event.event
   console.log(event.data.id,"tan")
   const callbackUrl = 'http://localhost:4200/chargers';

    // Respond to Paystack with a 200 OK status and include the callback URL in the response
    res.status(200).json({
      message: 'Webhook received successfully',
      callbackUrl: callbackUrl,
    });
 //return res.status(200).json(data);
    // Payment was successful
    //const url = 'http://localhost:4200/chargers'
   // console.log(url)
   /*
   // const callbackUrl = 'http://localhost:4200/chargers'; // Adjust this based on your route
    const posturl = 'http://localhost:3000/api/charge'
    const amount = event.data.amount
    const id = event.data.id
    const postData = {
      amount: amount,
      id: id,
    //  callback_url:'http://localhost:4200/chargers'
    };
    
   // const newTabUrl = `${callbackUrl}?paymentSuccessful=true`;
    
    axios.post( posturl,postData)
      .then(() => {
        
        console.log('Callback handled successfully');
       
      })
      .catch(error => {
        console.error('Error handling callback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
      */
  } else if (event.event === 'charge.failure') {
    // Payment failed
    const data = event.event;
    console.log('Payment failed:', data);
    res.status(220).json(data);
    
  }
  
});


router.post('/charge',(req,res)=>{
  const chrg = new chrge()
  chrg.amount = req.body.amount
  chrg.id = req.body.id

  chrg.save()
  .then(data=>{
    if(data){
      console.log(data)
       res.status(200).json(data)
    }else{
      console.log("data is not saved successfully")
    }
  })
})


router.get('/chdownload/:title',(req,res)=>{
  
  baMode.findOne({title:req.params.title})
 .then(data=>{
   
  if(data){

      
    res.setHeader('Content-Disposition', 'attachment; filename=data.title');
  res.setHeader('Content-Type', 'text/pdf');

  // Stream the file to the response
  const pdfFilePath = path.resolve('uploads', data.filepath);
  console.log('pdfFilePath:', pdfFilePath)
  res.download(pdfFilePath,(err)=>{
    if(!err){
      console.log("the file is downloaded succesfully")
    }else{
      console.log("file not downloaded")
    }
  })
  }else{
    return res.status(332).json({message:"this file is not in the DB"})
  }
  /*
  const fileStream = require('fs').createReadStream(pdfFilePath);
  fileStream.pipe(res);
  fileStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

  res.on('finish', () => {
    console.log(`File ${data.title} has been successfully downloaded.`);
  });

  fileStream.on('close', () => {
    console.log(`File ${data.title} stream has been closed.`);
    // Additional cleanup or logging can be done here if needed
  });
} else {
  // If the file doesn't exist, send a 404 response
  res.status(404).send('File not found');
}
*/
   // const pdfFilePath = path.resolve('uploads', data.filepath);
   // console.log('pdfFilePath:', pdfFilePath,"this is file");
    //   res.status(200).download(pdfFilePath);
  
    // return  res.status(200).json({message:"this file is ready",data})

  //const pdfFilePath = path.join(__dirname, '..', '/uploads', data.filepath);
 
  // Check if the file exists
  //if (require('fs').existsSync(data.filepath)) {
    // Use res.download to simplify file downloads
  //  res.download(data.filepath, "this file is downloading");
 // } else {
    // Return a 404 response if the file does not exist
   // res.status(404).send('PDF File not found');
 // }
 

 }).catch(err=>{
 return res.status(422).json({message:"this file is not ready",err})
 })
})

router.get('/download')
/*

const mbModel = multer.diskStorage({
  destination:(req,file,cb)=>{
        cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    const ext = path.extname(file.originalname)
    const id = uuid()
    const filePath = `Mbmodel/${id}${ext}`
    cb(null,filePath)
  }
})

const mymbModel = multer({storage:mbModel})

  const Mbmodel = require('../usermode/mbMode')
const { timeStamp } = require('console')
router.post('/mbupload',mymbModel.single('file'),(req,res,next)=>{
 
  const mbModel= new Mbmodel()

  mbModel.filepath = req.file.filename
  mbModel.title = req.body.title 
  mbModel.description = req.body.description 
  mbModel.price = req.body.price 
  mbModel.quantity = req.body.quantity 

  mbModel.save()
  .then(doc=>{
    if(doc){
      return res.status(200).json({message:"this file is saved successfully",doc})
    }
  }).catch(err=>{
    if(err){
      next(err)
      return res.status(221).json({message:"this file is not saved "})
    }
  })
})

*/
//GET DATA
//lpchar baModel   Accesor Mbmodel


router.get('/getbaMode',(req,res,next)=>{
  baMode.find()
  .then(data=>{
    if(data){
      return res.status(200).json({status:"ok",data})
    }
  }).catch(err=>{
    return next(err)
  })
})


router.get('/getlpmode',(req,res,next)=>{
  lpchar.find()
  .then(data=>{
    if(data){
      return res.status(200).json({status:"ok",data})
    }
  }).catch(err=>{
    return next(err)
  })
})



/*
router.get('/getmaAcc',(req,res,next)=>{
  Accesr.find()
  .then(data=>{
    if(data){
      return res.status(200).json({status:"ok",data})
    }
  }).catch(err=>{
    return next(err)
  })
})


router.get('/getmbMode',(req,res,next)=>{
  Mbmodel.find()
  .then(data=>{
    if(data){
      return res.status(200).json({status:"ok",data})
    }
  }).catch(err=>{
    return next(err)
  })
})

*/
//delete content
//lpchar baModel   Accesor Mbmodel

router.delete('/baDelete/:id',(req,res)=>{
  const resourceId = req.params.id;
  baMode.findOneAndDelete(resourceId)
  .then(deleted=>{

    if(!deleted){
      return res.status(230).json({message:"no data here"})
    }else{
      console.log(deleted.filepath)
      fs.unlink('uploads/'+deleted.filepath,(err)=>{
        if(!err)
         console.log("this file is deleted from folder")


      })
      return  res.status(200).json({message:"this file is deleted successfully",deleted})
    }
  }).catch(err=>{

    return res.status(221).json({message:"this file not deleted", err})
  })

})





router.delete('/lpDelete/:id',(req,res)=>{
  const resourceId = req.params.id;
  lpchar.findOneAndDelete(resourceId)
  .then(deleted=>{
   
    if(!deleted){
      return res.status(230).json({message:"no data here"})
    }else{
      console.log(deleted.filepath)
      fs.unlink('uploads/'+deleted.filepath,(err)=>{
        if(!err)
         console.log("this file is deleted from folder")
        
      
      })
      return  res.status(200).json({message:"this file is deleted successfully",deleted})
    }
  }).catch(err=>{
  
    return res.status(221).json({message:"this file not deleted", err})
  })
 
})



/*
router.delete('/lpDelete/:id',(req,res)=>{
  lpchar.findByIdAndRemove(req.params.id)
  .then(deleted=>{
    if(deleted){
      res.status(200).json({message:"this file is deleted successfully",deleted})
      fs.unlink('uploads/'+deleted.filepath,(err)=>{
        if(!err){ 
          console.log("this file is deleted from folder")
      }
      
      })
    }
  }).catch(err=>{
    next(err)
    return res.status(221).json({message:"this file not deleted"})
 })
})

router.delete('/maDelete/:id',(req,res)=>{
  Accesr.findByIdAndRemove(req.params.id)
  .then(deleted=>{
    if(deleted){
      res.status(200).json({message:"this file is deleted successfully",deleted})
      fs.unlink('uploads/'+deleted.filepath,(err)=>{
        if(!err){ 
          console.log("this file is deleted from folder")
      }
      
      })
    }
  }).catch(err=>{
    next(err)
    return res.status(221).json({message:"this file not deleted"})
 })
})


router.delete('/mbDelete/:id',(req,res)=>{
  Mbmodel.findByIdAndRemove(req.params.id)
  .then(deleted=>{
    if(deleted){
      res.status(200).json({message:"this file is deleted successfully",deleted})
      fs.unlink('uploads/'+deleted.filepath,(err)=>{
        if(!err){ 
          console.log("this file is deleted from folder")
      }
      
      })
    }
  }).catch(err=>{
   
    return res.status(221).json({message:"this file not deleted"})
 })
})
*/
//sales route


router.post('/buy',(req,res,next)=>{
   var mybought = 0;
   var mysold = 0;
   const soldsch = new soldschema()
  console.log(mysold)
  soldschema.findOne({id:req.body._id})
  .then((content)=>{
    if(!content){
    
      soldsch.id =req.body._id
      soldsch.bought =req.body.sold
      soldsch.name = req.body.title
      soldsch.filepath = req.body.filepath
      soldsch.price = req.body.price
      soldsch.quantity = req.body.quantity
      soldsch.sold = req.body.sold
    
      
      soldsch.save()
      .then(file=>{
        return res.status(200).json({message:"the user saved successfully",file})
       
      }).catch(err=>{
        console.log(err)
      })


    }else{
      
      soldsch.bought = req.body.sold
      mysold = mybought + soldsch.bought
     // let remaining = content.quantity - mysold
     // soldsch.quantity = remaining
      soldsch.sold = content.sold + mysold
      content.updateOne({sold:soldsch.sold})
      .then(updated=>{
        return res.status(200).json({message:"this one sold",updated})
      }).catch(err=>{
        return res.status(221).json({message:"not sold",err})
      })
    }
  }).catch(err=>{
    return next(err)
  
  })
})



router.post('/buypost',(req,res,next)=>{
const sldpost = new soldpost()
sldpost.bought =req.body.sold
sldpost.name = req.body.title
sldpost.price = req.body.price
sldpost.quantity = req.body.quantity
sldpost.sold = req.body.sold 

sldpost.save()
.then(data=>{
 if(data){
   return res.status(200).json({message:"the data is saved successfully"})
 }
}).catch(err=>{
  next(err)
  console.log(err)
})
})
//get buypost and buy
router.get('/getbuy',(req,res,next)=>{
  //const soldget = new soldschema()
 
  soldschema.find()
  .then(sold=>{
    if(sold){
      return res.status(200).json({message:"this data is ready",sold})
    }else{
      console.log("this data is not found")
    }
  
  }).catch(err=>{
    next(err)
    console.log(err)
  })
})

router.get('/items',(req, res,next) => {
  const { startDate, endDate } = req.query;
  console.log(startDate,endDate,"ala ciyarta")
  soldschema.find({
    date: { $gte: startDate, $lte:endDate }
 
  })
  .then(records => {
    console.log(records.date)
    if (records.length > 0) {
      console.log("data ready")
      return res.status(200).json({ message: "Data is ready", records });
    } else {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }
  })
  .catch(err => {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  });


  
 
})

router.get('/search',(req,res)=>{
  const searchTerm = req.query.term;
  soldschema.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ]
  }).then(data=>{
    return res.status(200).json({ message: "you are searching this", data });
  }).catch(err=>{
 
   return res.status(500).json({ error: 'An error occurred' });
   
  })

 
})



router.get('/getbuypost',(req,res,next)=>{
  //const soldget = new soldschema()
  soldpost.find()
  .then(sold=>{
    if(sold){
      return res.status(200).json({message:"this data is ready",sold})
    }else{
      console.log("no data is found")
    }
   
  }).catch(err=>{
    next(err)
    console.log(err)
  })
})
module.exports = router
