const messages = require("../../utills/messages")
const createResponse = require("../../utills/response")
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {

  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    req.body.password = hashedPassword;

    const user = new User({
      ...req.body,
      role: req.body.role ? req.body.role : "not specified"
    });

    const newAdmin = await user.save();
  

    return createResponse(res, 201, messages.SUCCESS.DATA_ADDED, newAdmin);
  } catch (err) {
    return createResponse(res, 201, messages.ERROR.SERVER_ERROR, "the error" + err);
  }
};

const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return createResponse(res, 404, messages.ERROR.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return createResponse(res, 400, messages.ERROR.INVALID_DATA);

    const newAdmin = await user.save();
    const token = jwt.sign(
      { userId: newAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    data = {
      newAdmin,
      token
    }

    return createResponse(res, 200, "Login successful", data);
  } catch (err) {
    return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return createResponse(res, 404, messages.ERROR.NOT_FOUND);


    return createResponse(res, 200, "Get User", user);
  } catch (err) {
    return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
  }
};
const getMembers = async (req, res) => {
  try {
    const user = await User.find()
    if (!user) return createResponse(res, 404, messages.ERROR.NOT_FOUND);


    return createResponse(res, 200, "Get Members", user);
  } catch (err) {
    return createResponse(res, 500, messages.ERROR.SERVER_ERROR, err.message);
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
  getMembers
};


