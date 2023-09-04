const User = require('../../models/User.model');
const {compare} = require('../../services/bcrypt');
const {myToken} = require('../../services/jwt');

async function login(req, res) {
    try {
        const details = req.body
        const verifiedUser = loginCheck(details.email, details.password)
        verifiedUser
            .then(result => {
                console.log(result)
                if (result === false) {
                    return res.status(401).json({
                        Msg: 'Incorrect password/email',
                        user: result
                    })
                }
                const token = myToken(details.email);
                // Store the token in the session
                req.session.token = token;
                userId(details.email)
                .then((result) => {
                    req.session.userID = result;
                })
                return roleCheck(details.email)
                .then((result) => {
                    req.session.role = result;

                    return res.status(200).json({
                        Msg: 'Successfully logged in',
                        userToken: token,
                        userRole: result
                    })
                })
            })
            .catch(error => {
                console.error(error);
              });

    } catch (error) {
        console.error(error, 'Something wrong');
        return res.status(500).json({
            Msg: 'Server Error, pls get back later'
        })
    }
};


const loginCheck = async (user, pass) => {
    
    try {
        const see = await User.findOne({ email: user})
        if (!see) {
            console.log('email not found');
            return false;
        }
        let comparedPass = compare(pass, see.password)
        if (comparedPass === false) {
            console.log('password not the same');
            return false;
        }
        return true;
    } catch (err) {
        console.log(err.message, '\nError in login check')
        return false;
    }
}

const roleCheck = async (user) => {
    const userRole = await User.findOne({ email: user});
    return userRole.role;
}
const userId = async (user) => {
    const getUser = await User.findOne({ email: user});
    return getUser._id;

}
module.exports = {
    login,
}
