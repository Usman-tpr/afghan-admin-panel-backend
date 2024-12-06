const messages = require("../../utills/messages")
const createResponse = require("../../utills/response")
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    req.body.password = hashedPassword;
    
    const user = new User(req.body);
    await user.save();

    return createResponse(res, 201, messages.SUCCESS.DATA_ADDED, user);
  } catch (err) {
    return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
        const user = await User.findOne({ email });
      if (!user) return createResponse(res, 404, messages.ERROR.NOT_FOUND);
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return createResponse(res, 400, messages.ERROR.INVALID_DATA);
  
      return createResponse(res, 200, "Login successful", user);
    } catch (err) {
      return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
    }
  };

module.exports = {
  createUser,
  loginUser
};


 