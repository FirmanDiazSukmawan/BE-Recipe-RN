require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.SECRET_KEY;

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });

  // console.log(token);
  return token;
};

const refreshToken = async (payload) => {
  const token = await jwt.sign(payload, jwtSecretKey, {
    expiresIn: "3h",
  });
  // console.log(token);
  return token;
};

module.exports = { generateToken, refreshToken };
