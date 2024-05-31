import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {

  // [ userId == sentuser._id ]
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" })


  res.cookie("jwt_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent xss attacks 
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};

export default generateTokenAndSetCookie;











// import jwt from "jsonwebtoken";

// const generateTokenAndSetCookie = (userId, res) => {
//   // [ userId == sentuser._id ]

//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "15d",
//   });
//   return token;

//   // res.cookie("jwt-cookie", token, {
//   //     maxAge: 15 * 24 * 60 * 60 * 1000,
//   //     httpOnly: true, // prevent xss attacks
//   //     sameSite: "strict",
//   //     secure: process.env.NODE_ENV !== "development"
//   // })
// };

// export default generateTokenAndSetCookie;
