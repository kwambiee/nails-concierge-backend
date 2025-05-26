const { userService } = require('../services');

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Create a new user
        const newUser = await userService.createLocalUser({
            email: email.toLowerCase(),
            password,
        });
        res.status(201).json({ user: newUser });
    }    
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
        if(req.isAuthenticated()) {
            return res.status(200).json({ user: req.user });
        }
        res.status(401).json({ error: "Unauthorized" });   
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
}



module.exports = {
    signUp,
    login,
    logout,
}