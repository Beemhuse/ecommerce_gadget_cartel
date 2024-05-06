// pages/api/getUsers.js

import { getUserById } from "../../lib/getUserById";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
    
      try {
        const userId = req.user.id; // Assuming req.user contains the authenticated user's ID
        const user = await getUserById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
