const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user);
    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("User not found");

    const match = await user.comparePassword(password);
    if (!match) throw Error("Incorrect password");

    const token = createToken(user);
    res.json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { signup, login };