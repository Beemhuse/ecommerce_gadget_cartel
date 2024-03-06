// pages/api/signup.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import crypto from 'crypto';
import { createUser, getUserByEmail } from '../../lib/client';

// Function to generate a random secret key
const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(409).json({ error: 'User with this email already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    _id: uuidv4(),
    email,
    password: hashedPassword,
  };
  const newUser = await createUser(user);

  const secretKey = generateRandomSecret();
  const expiresIn = 30 * 24 * 60 * 60; // 30 days in seconds

  // Generate JWT token
  const token = jwt.sign({ userId: newUser._id  }, secretKey, { expiresIn: expiresIn });

  res.status(201).json({ user: newUser, token });
}
