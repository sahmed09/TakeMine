// controllers/userController.js

const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const jwt = require('jsonwebtoken'); // For generating tokens if needed
require('dotenv').config();

// Register User
exports.registerUser = async (req, res) => {

    
    // Extract user data from request body
    const user = req.body;
    
    
   
    // Validate required fields
    if (!user.studentId || !user.name || !user.password || !user.address || !user.dob ||!user.phone) {
        return res.status(400).json({ message: "Missing required fields for registration." });
    }
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const initialRoarBalance = 100;

        // Check if user already exists
        // TODO: Write a query to check if a user with the same email or TU_ID exists
        let checkUserQuery = 'SELECT * FROM user WHERE email = ?';
       
        // Assuming 'existingUser' is the result from the database
        let [existingUser] = await pool.query(checkUserQuery, [user.email]); // Replace with actual data from the query
        
        if (existingUser.length>0) {
            return res.status(409).json({ message: "User with this email  already exists." });
        
        }
        checkUserQuery = 'SELECT * FROM user WHERE TU_ID = ?';
        [existingUser] = await pool.query(checkUserQuery, [user.studentId]); 
        if (existingUser.length>0) {
            return res.status(409).json({ message: "User with this StudentId already exists." });
        
        }
        // Assuming 'existingUser' is the result from the database
         [existingUser] = await pool.query(checkUserQuery, [user.studentId]);
        
        
         checkUserQuery = 'SELECT * FROM user WHERE nickname = ?';
       
         // Assuming 'existingUser' is the result from the database
          [existingUser] = await pool.query(checkUserQuery, [user.nickname]);
          if (existingUser.length>0) {
            return res.status(409).json({ message: "User with this nickname already exists." });
        
        }
        
        // If user does not exist, insert new user
        // TODO: Write a query to insert the new user into the database
        const insertUserQuery = 'INSERT INTO user (TU_ID, email, name, nickname, password, phone,address,dob,roars) VALUES (?, ?, ?, ?, ?, ?, ? ,?,?)';
        await pool.query(insertUserQuery, [user.studentId, user.email, user.name, user.nickname, hashedPassword,user.phone,user.address,user.dob,100]);
        
        // Return success response
        return res.status(201).json({ message: "User registered successfully.",user: req.body });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Authenticate User
exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required for authentication." });
    }

    try {
        // Retrieve user from the database
        // TODO: Write a query to get the user by email
        const getUserQuery = 'SELECT * FROM user WHERE email = ?';
      
        // Assuming 'user' is the result from the database
        const [user] = await pool.query(getUserQuery, [email]); // Replace with actual data from the query
        
        if (user.length==0) {
            return res.status(404).json({ message: "User not found." });
        }
       
        // Compare passwords
        const match = await bcrypt.compare(password, user[0].Password);
        
        if (!match) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Authentication successful
       
        return res.status(200).json({
            message: "Authentication successful.",
            user: {
                userId: user[0].TU_ID,
                nickname: user[0].Nickname,
                email: user[0].Email,
                    //add other details if i forgot guys            },
              },    // token: token // we can use it  IF we used auth jwt
        });

    } catch (error) {
        console.error("Error authenticating user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const updates = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // Build the fields to update
        const fields = [];
        const params = [];

        if (updates.name) {
            fields.push("name = ?");
            params.push(updates.name);
        }
        if (updates.nickname) {
            fields.push("nickname = ?");
            params.push(updates.nickname);
        }
        if (updates.phone) {
            fields.push("phone = ?");
            params.push(updates.phone);
        }
        if (updates.password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            fields.push("password = ?");
            params.push(hashedPassword);
        }
        // Add other fields as necessary

        if (fields.length === 0) {
            return res.status(400).json({ message: "No fields to update." });
        }

        params.push(userId);

        // TODO: Write a query to update the user profile
        const updateUserQuery = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`;
        await pool.query(updateUserQuery, params);

        // Return success response
        return res.status(200).json({ message: "User profile updated successfully." });

    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required." });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // TODO: Write a query to update the user's password
        const resetPasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
        const result = await pool.query(resetPasswordQuery, [hashedPassword, email]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return success response
        return res.status(200).json({ message: "Password reset successfully." });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get My Balance
exports.getMyBalance = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available from authentication middleware

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // TODO: Write a query to get the user's roar_balance
        const getBalanceQuery = 'SELECT roars FROM users WHERE user_id = ?';

        // Assuming 'result' is the query result
        const [result] = await pool.query(getBalanceQuery, [userId]); // Replace with actual query result

        if (!result) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the balance
        return res.status(200).json({ roar_balance: result.roar_balance });

    } catch (error) {
        console.error("Error retrieving user balance:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    const userId = req.params.id || 1; // Default to 1 if not provided or  req.user.id; // Use userId from params or authenticated user

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        // TODO: Write a query to get the user's profile information
        const getUserProfileQuery = 'SELECT * FROM user WHERE tu_id = ?';

        // Assuming 'userProfile' is the query result
        const [userProfile] = await pool.query(getUserProfileQuery, [userId]); // Replace with actual user profile data

        if (!userProfile) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the user profile
        console.log(userProfile[0])
        return res.status(200).json(userProfile[0]);
 
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: "Interno server error." });
    }
};
