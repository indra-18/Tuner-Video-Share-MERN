const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

const registerController = async (req, res) => {
  try {
    const { name, email, profession, phone, password, confirmPassword } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!profession) {
      return res.send({ message: "Profession  is Required" });
    }
    if (password.length < 6) {
      return res.send({ message: "Password should have 6 charecters" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!confirmPassword) {
      return res.send({ message: "confirmpassword is Required" });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "password and confirmpassword should match" });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);



    const user = await new userModel({
      name,
      email,
      profession,
      phone,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errror in Registeration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profession: user.profession,
        myVideos: user.myVideos
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const getUserVideos = async(req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    userVideos = user.myVideos;
    res.status(200).send({userVideos})
  } catch (error) {
    res.status(404).send({message: 'error occured'})
  }
}

module.exports = {
  registerController,
  loginController,
  getUserVideos
}