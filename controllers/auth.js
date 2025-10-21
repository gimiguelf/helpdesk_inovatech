
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'troque_este_segredo';
const EXPIRES_IN = '7d';

export async function register({name,email,password,role='employee'}) {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already registered');
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash, role });
  await user.save();
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  return { user, token };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  return { user, token };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
