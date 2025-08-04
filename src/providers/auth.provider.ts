import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/models/auth/auth.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key';

export class AuthProvider {
  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  }

  async generateRefreshToken(payload: JWTPayload): Promise<string> {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }

  async verifyAccessToken(token: string): Promise<JWTPayload | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<JWTPayload | null> {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
