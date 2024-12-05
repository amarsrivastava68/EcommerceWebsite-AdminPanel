const bcrypt = require('bcryptjs'); // Fixed import
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Register User
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUser  = await User.findOne({email})
        if (checkUser) return res.json({success: false , message : 'A user exists with the same email already . . . '})
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPassword });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration is successful.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error has occurred.",
        });
    }
};

// Login (currently empty, but structure is fine)
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser  = await User.findOne({email})
        if (!checkUser)  return res.json({
            success : false , 
            message : "User Does'nt exists . . . ,  please register first before login . . . "
        })
        const checkPassword  = await bcrypt.compare(password ,checkUser.password )
        if (!checkPassword) return res.json({
            success : false , 
            message : 'Wrong password , please try again . . .'
        })
       
        const token = jwt.sign({  id : checkUser._id,role : checkUser.role , email : checkUser.email     } , 'CLIENT_SECRET_KEY' , {expiresIn : '60m'})
        res.cookie('token' , token  , {httpOnly : true  , secure: false }).json({
            success : true , 
            message : 'Logged in succesfully . . . ' , 
            user : {email : checkUser.email , role : checkUser.role , id : checkUser._id}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error has occurred.",
        });
    }
};

module.exports = { registerUser , loginUser };
