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
        return res.status(400).json({ error: 'All fields are required' });
      }
      await connectDb();

      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);


      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = generateToken(user);

      res.status(201).json({ message: 'User created successfully', user, token });

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
