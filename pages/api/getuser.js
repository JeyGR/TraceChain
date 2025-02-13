import connectDb from '../../lib/mongoose';
import User from '../../lib/models/user';

export default async function handler(req, res) {
  try {
    await connectDb();

    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
