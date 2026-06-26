const user = require("../module/user");
const post =require("../module/post")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const post = require("../module/post");


// REGISTER CONTROLLER
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



// LOGIN CONTROLLER
const login = async (req, res) => {
  // try {
  //   const { email, password } = req.body;

  //   // find user
  //   const findUser = await user.findOne({ email });

  //   if (!findUser) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "User not found",
  //     });
  //   }

  //   // compare password
  //   const isMatch = await bcrypt.compare(
  //     password,
  //     findUser.password
  //   );

  //   if (!isMatch) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Invalid password",
  //     });
  //   }

  //   // create jwt token
  //   const accessToken = jwt.sign(
  //     {
  //       userId: findUser._id,
  //       username: findUser.username,
  //       role: findUser.role,
  //       userprofile:findUser.userprofile,
  //     },
  //     "secretkey",
  //     { expiresIn: "10m" }
  //   );

  //   res.status(200).json({
  //     success: true,
  //     message: "Login successful",
  //     token: accessToken,
  //     userId:findUser._id,
  //   });

  // } catch (error) {
  //   console.log(error);

  //   res.status(500).json({
  //     success: false,
  //     message: "Something went wrong",
  //   });
  // }
  
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
};
//home
const home = async (req, res) => {
  res.json({
      success: true,
      message: "Home route accessed",
      user: req.user   // THIS comes from JWT payload
  });
};
const profile=async (req,res)=>{
  res.json({
    success:true,
    message:"we are good",
    user: req.user,
  })
}

//all the content shown here
const global=async (req,res)=>{
//   res.json({
//     success:true,
//     massage:'you can assec the browser',
//     post:req.post
// })


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

const demo=async (req,res)=>{
  try{
    // const posts=await post.find()
    const posts=["hira","manish"]
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




module.exports = { register, login,home,profile,global,demo};