const Users = require('../model/user')
const bcrypt = require('bcrypt');


// Register Users
exports.registerUser = async (req,res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, email: req.body.email, password: hashedPassword }
        Users.create(user)
        res.status(201).json({
            message: 'Registered successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
     
}

// Login Users

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
        const user = await Users.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

		const pass = await bcrypt.compare(password, user.password);
		if (!pass) {
			return res.status(404).json({ 
                success: false,
                message: "Invalid Password"
             });
		}

		return res.status(200).json({ 
            success: true,
            message: "Login Success", 
            user
        });
	} catch (error) {
        res.status(500).json({
             message: error.message
        })
     } 
	
};


