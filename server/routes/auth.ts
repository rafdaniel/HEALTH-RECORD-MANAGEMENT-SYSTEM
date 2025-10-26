import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// I'm using the path from your previous files. Update if 'database' is correct.
import db from '../database/connection.ts'; 
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// --- Interfaces for Type Safety ---
interface User extends RowDataPacket {
  user_id: number;
  email: string;
  full_name: string;
  password_hash: string;
  // Add other user fields as needed
}

// --- Router Setup ---
const router: Router = express.Router();

// Get secret key and salt rounds from environment variables
const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345';
const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

// === Sign Up ===
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phone, specialty, licenseNumber, 
            yearsOfExperience, password } = req.body;
    
    // 1. Check if user already exists
    const [existingUsers] = await db.query<User[]>(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ // 409 Conflict
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // 3. Insert user
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO users (full_name, email, phone, password_hash, 
         specialty, license_number, years_of_experience) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, phone, hashedPassword, specialty, 
       licenseNumber, yearsOfExperience]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating user' 
    });
  }
});

// === Login ===
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user
    const [users] = await db.query<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
    
    const user = users[0];
    
    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // 3. Create JSON Web Token (JWT)
    // This token is the user's "access card" for future requests
    const tokenPayload = { 
      userId: user.user_id, 
      email: user.email,
      fullName: user.full_name
      // Add any other non-sensitive data you want
    };
    
    const token = jwt.sign(tokenPayload, jwtSecret, { 
      expiresIn: '8h' // Token lasts for 8 hours
    });

    // 4. Remove password from user object before sending
    delete user.password_hash;
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      user,
      token: token // Send the token to the client
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in' 
    });
  }
});

export default router;