const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretportfoliojwtkey_change_in_production_2025';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const directKey = req.headers['x-admin-key'];

  // Direct password check fallback
  if (directKey && directKey === ADMIN_PASSWORD) {
    req.admin = { role: 'admin' };
    return next();
  }

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
}

module.exports = {
  authenticateAdmin,
  JWT_SECRET,
  ADMIN_PASSWORD
};

