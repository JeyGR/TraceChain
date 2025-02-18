import connectDb from '../../lib/mongoose';
import User from '../../lib/models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      console.log(name+" ,"+email+","+password);

      if (!name || !email || !password) {
        return res.json({ msg: 'All fields are required' });
      }
      await connectDb();

      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.json({ msg: 'Email is already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);


      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = generateToken(user);

      res.json({ msg: 'success', user, token });

    } catch (error) {
      console.error('Error creating user:', error);
      res.json({ msg: 'Internal server error' });
    }
  } else {
    res.json({ msg: 'Method not allowed' });
  }
}
