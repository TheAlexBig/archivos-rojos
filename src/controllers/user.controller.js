import logger from "../config/logger.js";

import db from "../models/index.js";
const User = db.user;

async function insertUser(req, res) {
    try {
        const { name, email } = req.body;

        const newUser = await User.create({
            name: name,
            email: email
        });


        res.status(201).json({ message: 'User created successfully', user: newUser.toJSON() });
    } catch (error) {
        logger.error('Error inserting user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export { insertUser };