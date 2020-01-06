import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    req.studentId = decoded.id;
    req.profile = decoded.profile;
    console.log(decoded);
    return next();
  } catch (error) {

    return res.status(401).json({ error: 'Token invalid' });
  }
};
