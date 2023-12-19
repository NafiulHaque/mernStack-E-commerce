import asyncHandler from "express-async-handler";
import Users from "../Models/UserModel.js";
import generateToken from "../utils/generateTokens.js";
import cloudinary from "cloudinary";

// @des get user profile
// @route GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image:user.image,
      address:user.address,
      phoneNumber:user.phoneNumber,
      city:user.city,
      divition:user.divition,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @des auth user and get token
// @route POST /api/users/login
// @access public

const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @des register a new user
// @route POST /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("user already exist");
  }
  const user = await Users.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

// @des update user profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, image, address, phoneNumber, city, divition } =
    req.body;
  const userExist = await Users.findOne({ email });

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "avatars",
  });

  if (userExist) {
    userExist.name = req.body.name || userExist.name;
    userExist.email = req.body.email || userExist.email;
    userExist.image = myCloud.url;
    userExist.address = address;
    userExist.phoneNumber = phoneNumber;
    userExist.city = city;
    userExist.divition = divition;
    if (req.body.password) {
      userExist.password = req.body.password;
    }
    const updatedUser = await userExist.save();

    res.status(201).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updateUser.image,
      address: updateUser.address,
      phoneNumber: updateUser.phoneNumber,
      city: updateUser.city,
      divition: updateUser.divition,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc get user by id
// @route GET /api/users/:id
// @access private/admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");
  // console.log("userbyid.....", user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      address: user.address,
      phoneNumber: user.phoneNumber,
      city: user.city,
      divition: user.divition,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user
// @route PUT /api/users/:id
// @access private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
