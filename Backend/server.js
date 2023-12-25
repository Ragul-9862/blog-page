const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')


// <----------------------------------------Bodyparser------------------------------------>
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json())
// <----------------------------------------Cors------------------------------------>

const corsopt = { origin: "http://localhost:3000" };
app.use(cors(corsopt));

// <----------------------------------------Mongodb connection------------------------------------>

mongoose.connect('mongodb://127.0.0.1:27017/newblog')
.then(()=>{
    console.log("Mongodb Connected");
}).catch((err)=>console.log(err));

app.listen(1000,(()=>console.log("server running")))

//                <--------------------------------------Signup------------------------------------------>

const User = require('./SignupPage/signupPage')

app.get('/getuser',((req,res)=>{
    User.find()
    .then((user)=>{
        res.send(user)
    }).catch((err)=>{
        console.log(err);
    })
}))


app.post('/signup', (req, res) => {
    User.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Repassword: req.body.Repassword
    })
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});


//                <--------------------------------------Login------------------------------------------>

app.post('/login', (req, res) => {
    User.findOne({
        Username: req.body.Username,
        Password: req.body.Password
    }).then((user) => {
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});


//        <-------------------------------------Multer--------------------------------------------------------->

const multer = require('multer')
app.use("/files", express.static("files"))
const imageupload = require('./Uploadimages/uploadImages')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + file.originalname);
    },
   
  });
  
  const uploadMiddleware = multer({ storage: storage });

app.post('/upload-image',uploadMiddleware.single('image'),(req,res)=>{
   const title = req.body.title
   const info = req.body.info
   const image = req.file.filename

   try{
    imageupload.create({
        title:title,
        info,info,
        image:image
    })
    res.send({ status: 'File uploaded successfully', image: `./files/${image}` });
   }catch (error) {
    res.json({ status: error });
  }
})



app.post('/upload-image', uploadMiddleware.single('image'), function (req, res) {
    const title = req.body.title;
    const info= req.body.info;
    const image = req.file.filename;
  
    try {
     imageupload.create({
        title: title,
        info:info,
        image: image
      });
      res.send({ status: 'File uploaded successfully', image: `./files/${image}` });
    } catch (error) {
      res.json({ status: error });
    }
  });

  app.get("/get-files",(req,res)=>{
    try{
        imageupload.find({})
        .then(data => {
      res.send({status:"ok" , data:data})
        })
    }catch (err) {
        res.send(err);
      }
  })

// <---------------------------------------------Image update-------------------------------------------------->
// Update an existing image, title, and info

app.get('/get-image/:id', async (req, res) => {
  try {
      const image = await imageupload.findById(req.params.id);
      res.send(image);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.put('/update-image/:id' ,uploadMiddleware.single('image'),function(req,res){
  User.findByIdAndUpdate(req.params.id,req.body)
  .then(function(user){
      res.send(user)
  })
  .catch(err => res.send(err));
})



// <--------------------------Delete Post-------------------------------->

app.delete('/delete-image/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const existingImage = await imageupload.findById(id);

    if (!existingImage) {
      return res.status(404).send('Image not found');
    }

    // Remove the file associated with the existing image
    const filePath = `./files/${existingImage.image}`;
    
    // Check if the file exists before trying to delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.error(`File not found: ${filePath}`);
    }

    // Delete the image from the database
    await existingImage.deleteOne();

    res.send({
      status: 'Image deleted successfully',
      image: `./files/${existingImage.image}`,
      title: existingImage.title,
      info: existingImage.info,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
