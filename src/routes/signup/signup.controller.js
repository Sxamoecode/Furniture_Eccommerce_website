const Users = require('../../models/User.model');
const {userValidator} = require('../../services/Joi.validator');
const {hashit} = require('../../services/bcrypt')
const {myToken} = require('../../services/jwt')

async function signUp(req, res) {
 try {
       const details = req.body
       if (!details.password || !details.firstName || !details.lastName || !details.email) {
           return res.status(400).send('Input all required details')
       }
       let user = await Users.findOne({ email: details.email });
       if (user) {
         //throw new Error("Email already exist", 422);
         return res.status(422).send('Email already exist');
       }
        const {error, validateDetails} = userValidator.validate(details);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }

        const newUser = new Users(hashUser(details));
        console.log(newUser);
        let token = myToken({ id: newUser._id })
        const {err, Profile} = await newUser.save();
        if (err) {
          console.log(err.message);
          return res.status(500).send('Error saving');
        }
        else {
          return res.status(201).json({
            Msg: "Profile created",
            signedDetail: user = {
              userId: newUser.id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              token: token
            }
          });
        }
 } catch (error) {
    console.error(error.message);
    return res.status(500).send('SErver error');
 }
}
function hashUser(details) {
    password = details.password;
    const hashedpassword = hashit(password);
    details.password = hashedpassword;
    return details;
}

module.exports = {
    signUp,
}