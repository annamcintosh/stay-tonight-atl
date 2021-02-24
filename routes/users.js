const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");
// const { userController, registerController } = require("../controllers/userController");
const { getUser, addUser } = require("../services/userService");

//@route POST api/sites
//@description all sites
//@access public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  console.log("req.body=", req.body)

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

//   //Check for existing user
//   getUser({ email }) //GET USER CONTROLLER
//     .then((user) => {
//       if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = {
        name,
        email,
        password,
        id: uuidv4()
      };

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          console.log("newUserinBCRYPT=", newUser)
          return addUser(newUser)
            .then((user) => {
              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                    },
                  });
                }
              );
            });
        });
      });
    });
// });

module.exports = router;
