require('dotenv').config()
const user = require("../module/user");
const post =require("../module/post")
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");

const jwt = require("jsonwebtoken");

const home = async (req,res)=>{
    try{
        const posts=await post.find()
        res.status(200).json({
          success: true,
          posts,
        })
        }catch(error){
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
  
}
//register logic


const register = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // check existing user
      const checkAlreadyExist = await user.findOne({
        $or: [{ username }, { email }],
      });
  
      if (checkAlreadyExist) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // create user
      const newUser = await user.create({
        username,
        email,
        password: hashedPassword,
        role,
      });
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
  
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
//login 


const feed = async (req, res) => {
  try {
    const { postclick } = req.params;
    const userId = req.user.userId;
    const already = await post.findById(postclick);
    const alreadyLiked = already.likes.some(
      (id) => id.toString() === userId
    );
    if(!alreadyLiked){
      await post.findByIdAndUpdate(
        postclick,
        {
          $push: { likes: userId },
          $inc: { postlike: 1 } 

        },{ new: true }
      )
      }
    else{
      await post.findByIdAndUpdate(
        postclick,
        {
          $pull: { likes: userId },
          $inc: { postlike: -1 }
        },{ new: true })
    }
    // const likecount = await post.findById(postclick);
    // const totalLikes = likecount.likes.length;

    const after=await post.find()
    res.status(200).json({
      success: true,
      postclick,
      already,
      alreadyLiked,
      userId,
      // totalLikes,
      // after
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const login = async (req,res)=>{
  try {
        const { email, password } = req.body;
    
        // find user
        const findUser = await user.findOne({ email });
    
        if (!findUser) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        // compare password
        const isMatch = await bcrypt.compare(
          password,
          findUser.password
        );
    
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Invalid password",
          });
        }
    
        // create jwt token
        const accessToken = jwt.sign(
          {
            userId: findUser._id,
            username: findUser.username,
            role: findUser.role,
            userprofile:findUser.userprofile,
          },
          process.env.SECRECT_KEY,
          { expiresIn: "2h" }
        );
    
        res.status(200).json({
          success: true,
          message: "Login successful",
          token: accessToken,
          userId:findUser._id,
        });
    
      } catch (error) {
        console.log(error);
      
        return res.status(401).json({
          success: false,
          message: error.message,
        });
    
      }}

const test = async (req,res)=>{
  res.status(200).json({
    success: true,
    message: "Login successful",
  

  });
}

// const createpost = async (req, res) => {
//   try {
//     const { posturl, postcaption } = req.body;
//     console.log(req.body);
//     const username = req.user.username;

//     const newPost = await post.create({
//       postuser: username,
//       posturl,
//       postcaption,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//       newPost,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





const createpost = async (req, res) => {
  try {

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "social_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });





    const {postcaption } = req.body;
    // console.log(req.body);
    const username = req.user.username;

    const newPost = await post.create({
      postuser:username,
      posturl: result.secure_url,
      postcaption,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};










const sug = async (req, res) => {
  try {
    const loggedInUserId = req.user.username;
    // const admin = loggedInUserId;
    const admin = await user.find({
      username: loggedInUserId,
    });
    const suggestion = await user.find({ username: { $ne: loggedInUserId } });

    res.status(200).json({
      success: true,
      suggestion,
      admin,
    });
  } catch (err) {
    console.error("useris",err);

    res.status(500).json({
      success: false,
      message:"false username",
  
    });
  }
};

// profile
const profile = async (req,res)=>{
try{
  const loggedInUserId = req.user.username;
  const owner = await post.find({
    postuser: loggedInUserId,
  });

  res.status(200).json({
    success: true,
    loggedInUserId,
    owner, 
  });
}
catch(err){
  res.status(500).json({
    success: false,
    message:"failed to lode profile",
  });
}
}



module.exports={home,register,feed,login,test,createpost,sug,profile}