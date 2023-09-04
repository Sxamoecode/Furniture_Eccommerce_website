const {
    requestPasswordReset,
    resetPassword,
  } = require("./auth.service");
  
  const resetPasswordRequestController = async (req, res, next) => {
    try {
      const requestPasswordResetService = await requestPasswordReset(
        req.body.email
      );
      return res.json(requestPasswordResetService);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send('Invalid details')
    }
  };
  
  const resetPasswordController = async (req, res, next) => {
    try {
      const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
      );
      return res.json(resetPasswordService);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send('Invalid details');
    }
  }
  module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
  };