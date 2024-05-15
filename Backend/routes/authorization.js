const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Vinay@$Bhatnagar";

//Route 1:  Create a User using: POST " /api/authorization/createUser . No Login Required"

router.post(
  "/createUser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("Name", "Enter a valid Name").isLength({ min: 3 }),
    body("password", "Password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          errors:
            "Sorry a user with this email aldready exists " && errors.array(),
        });
    }

    //  Hashing Passwords using bcryptjs and also adding Salt --
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      email: req.body.email,
      Name: req.body.Name,
      password: secpass,
    });

    // Creating auth token for validating the login endpoint using jsonwebtoken --
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({ authToken });
  }
);

// ROute 2 : Authenticate a User using: POST " /api/authorization/login . No Login Required"
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot b blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          errors:
            "Sorry a user with this email aldready exists " && errors.array(),
        });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: " Please try to login with correct credentials " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: " Please try to login with correct credentials " });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROute 3 : Get Loggedin User Details using: POST " /api/authorization/getuser . Login Required"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
