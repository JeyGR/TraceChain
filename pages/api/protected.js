import { verifyToken } from '../../lib/jwt';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent as "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Token is valid, return protected data
    res.status(200).json({ message: 'Protected data', user: decoded });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
