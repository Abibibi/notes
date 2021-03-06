const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  
const authUserInfo = async (req, res) => {
    // user id is available in req.user
    // thanks to authMiddleware,
    // in which req.user value was defined as the decoded token (thus, the user id)
    const authenticatedUserInfo = await User.findById(req.user.id)
    // excluding user password from the info sent to client
    .select('-password')

    return res.status(200).json(authenticatedUserInfo);
};


const signUp = async (req, res) => {
    let { firstname, email, password, confirmPassword } = req.body;

    if (!firstname || !email || !password || !confirmPassword) {
        return res.status(400).send({ missingInformation: 'User information is missing.' })
    }

    if (password !== confirmPassword) {
        return res.status(400).send({ unequalPasswords: 'Passwords are not equal.' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send({ alreadySignedUp: 'User has already signed up.' });
    }

    let hash = await bcrypt.hash(password, 10);

    const newUser = new User ({
        firstname,
        email,
        password: hash
    });

    await newUser.save();

    return res.status(200).send({ successfullyRegistered: 'User has been successfully registered.' })
};


const signIn = async (req, res) => {
    let { email, password } = req.body
    console.log(req.body);

    const userRegistered = await User.findOne({ email });

    if (!userRegistered) {
        return res.status(400).send({ notSignedUpYet: 'User is not registered.' });
    }

    const passwordMatch = await bcrypt.compare(password, userRegistered.password);

    if (!passwordMatch) {
        return res.status(400).send({ noPasswordMatch: 'Wrong password.' });
    }
  
    const token = jwt.sign(
        { id: userRegistered.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    return res.status(200).json({
        token,
        user: {
            id: userRegistered.id,
            firstname: userRegistered.firstname,
            email: userRegistered.email
        }
    }); 
};

module.exports = {
    authUserInfo,
    signUp,
    signIn
}