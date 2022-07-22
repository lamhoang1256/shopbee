const User = require("../user/user.model");
const bcrypt = require("bcrypt");

const authControllers = {
  signUp: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        avatar: req.body.avatar,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        password: hashed,
        isAdmin: req.body.isAdmin,
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json(error);
    }
  },

  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) res.status(404).json("Wrong username");
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) res.status(404).json("Wrong password");
      if (user && validPassword) res.status(200).json(user);
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = authControllers;
