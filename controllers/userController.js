const { getUser, addUser } = require("../services/userService");

//@route GET api/users
//@description find a user
//@access public
async function userController(req, res) {
    try {
      const user = await getUser(req.body);
      console.log(req.body);
      res.send(user);
    } catch (err) {
      return { error: err };
    }
  }

//@route POST api/user
//@description register a user
//@access private
async function registerController(req, res) {
    try {
      const site = await addUser(req.body);
      console.log(req.body);
      res.send(site);
    } catch (err) {
      return { error: err };
    }
  }


exports.userController = userController;
exports.registerController = registerController;
