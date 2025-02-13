import connectDb from '../../lib/mongoose';
import User from '../../lib/models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.json({ msg: 'Email and password are required' });
      }

      await connectDb();

      const user = await User.findOne({ email });
      if (!user) {
        console.log("user not exist");
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.status(200).json({ msg: 'success', user, token });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
