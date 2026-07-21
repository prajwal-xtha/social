require('dotenv').config()
const user = require("../module/user");
const post =require("../module/post")
const bcrypt = require("bcrypt");
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
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // find user
//     const findUser = await user.findOne({ email });

//     if (!findUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // compare password
//     const isMatch = await bcrypt.compare(
//       password,
//       findUser.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // create jwt token
//     const accessToken = jwt.sign(
//       {
//         userId: findUser._id,
//         username: findUser.username,
//         role: findUser.role,
//         userprofile:findUser.userprofile,
//       },
//       process.env.SECRECT_KEY,
//       { expiresIn: "10m" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token: accessToken,
//       userId:findUser._id,
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }




//view all feed
const feed = async (req, res) => {
  console.log("Feedd route hit");
  try {
    console.log(req.params);

    const { postclick } = req.params;
    const already = await post.findById(postclick);

    // const username = req.user.username;
    // console.log(username)
    console.log("Post ID:", postclick);

    const updated = await post.findByIdAndUpdate(
      postclick,
      { $inc: { postlike: 1 } },
    );
    console.log(updated);

    res.status(200).json({
      success: true,
      post: updated,
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
          { expiresIn: "40m" }
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

const createpost = async (req, res) => {
  try {
    const { posturl, postcaption } = req.body;
    console.log(req.body);
    const username = req.user.username;

    const newPost = await post.create({
      postuser: username,
      posturl,
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

module.exports={home,register,feed,login,test,createpost}