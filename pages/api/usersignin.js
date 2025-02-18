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
        return res.json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ msg: 'Invalid credentials' });
      }

      const token = generateToken(user);

      res.json({ msg: 'success', user, token });

    } catch (error) {
      console.error('Error during login:', error);
      res.json({ msg: 'Something went wrong' });
    }
  } else {
    res.sjson({ msg: 'Method not allowed' });
  }
}
