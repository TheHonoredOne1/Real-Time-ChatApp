import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


// console.log(bcrypt)

export const signup = async (req, res) => {
  try {

    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {

      return res.status(400).json({ error: "Passwords do not match. Try Again!" });

    }

    const user = await User.findOne({ username });

    if (user) {

      return res.status(400).json({ error: "Username already exists. set up another username." });

    }

    // hashing password here //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    //comeback
    if (newUser) {

      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });

    }
    else {
      res.status(400).json({ error: "Invalid User Data." });
    }
  }
  catch (error) {
    console.log("Error in the signup controller.", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req, res) =>  {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    // optional chaining ====> in case user is null
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }

    generateTokenAndSetCookie(user._id, res);//token

    res.status(200).json({
      __id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });


  }
  catch (error) {
    console.log("Error in the Login controller.", error.message);
    res.status(500).json({ error: "Internal Server Error in login controller." });
  }
};

export const logout =  (req, res) => {
  try {

    res.cookie("jwt_token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });

  }
  catch (error) {

    console.log("Error in the Logout controller.", error.message);
    res.status(500).json({ error: "Internal Server Error. in logout controller." });

  }
};



/*
import bcrypt from "bcryptjs";
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;


    if (password !== confirmPassword) {

      // 400 -> bad request // request hi GALAT hai behinchod !!!
      return res.status(400).json({ error: "Passwords do not match. Try Again!" })

    }

    const user = await User.findOne({ username })

    if (user) {

      // firse bad request => 'sala hack karne ki koshish kar raha.'
      return res.status(400).json({ error: "Username already exists. set up another username." })

    }

    // hashing password here //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {

      /// generate jwt token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();


      res.status(201).json(
        {
          __id: newUser.__id,
          fullName: newUser.fullName,
          username: newUser.username,
          // gender: newUser.gender,
          profilePic: newUser.profilePic,
        }
      )
    }
    else {
      res.status(400).json({ error: "Invalid User Data." })
    }
  }
  catch (error) {
    console.log("Error in the signup controller.", error.message)
    res.status(500).json({ error: "Internal Server Error." })
  }
};

export const login = async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });


    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
    // optional chaining ====> in case user is null 
    if (!user || !isPasswordCorrect) {

      return res.status(400).json({ error: "Invalid Credentials." })

    }


    generateTokenAndSetCookie(user._id, res);

    res.status(200).json(
      {
        __id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      }
    )

  } catch (error) {

    console.log("Error in the Login controller.", error.message)
    res.status(500).json({ message: "Internal Server Error." })

  }
};

export const logout = async (req, res) => {

  try {

    res.cookie("jwt-token", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully." })

  }
  catch (error) {

    console.log("Error in the Logout controller.", error.message)
    res.status(500).json({ error: "Internal Server Error." })

  }
};
*/