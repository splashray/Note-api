const User = require("../models/userModel");
const {
  handleAsync,
  handleResponse,
} = require("../utils/helper");


const getUser = handleAsync(async (req, res) => {
  try{
      const user = await User.findById(req.user.id).select('-password');

      if (!user)  return res.status(404).json({
        success: false,
        msg: `User ID ${req.user.id} not found`,
      });
      res.status(200).json(handleResponse({ user }));
  } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        msg: `Error in getting Specified User details`,
      });
  }

});

const deleteUser = handleAsync(async (req, res) => {
    try {
        const user = await User.findById(req.user.id ).select('-password');
        if (!user) return res.status(404).json({
          success: false,
          msg: `User ID ${req.user.id} not found`,
        });

        const result = await user.deleteOne({ _id: req.user.id });
        if (!result) return res.status(404).json({
          success: false,
          msg: `User deletion failed`,
        });

        res.status(200).json(handleResponse({ result }, "user deleted successfully"));
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        msg: `Error in deleting Specified User`,
      });
  
    }
});

const updateUser = handleAsync(async (req, res) => {
  try{
      const {name, email} =  req.body;
      let user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(204).json({
        success: false,
        msg: `User ID ${req.user.id} not found`,
      });

      user.name = name;
      user.email = email;
      user = await user.save();
      res.status(200).json(handleResponse({ user }, "user updated successfully"));
  } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        msg: `Error in Updating Specified User`,
      });
  }
});


module.exports = {
  getUser,
  deleteUser,
  updateUser,
};
