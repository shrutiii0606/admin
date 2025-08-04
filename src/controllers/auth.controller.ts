import { authRepository } from '@/repositories/auth.repository';
import { LoginSchema, SignupSchema } from '@/models/auth/auth.model';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export class AuthController {
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const credentials = LoginSchema.parse(req.body);
      const result = await authRepository.login(credentials);

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { user, accessToken, refreshToken } = result;

      if (user.role === 'admin') {
        // Set cookie for web-based session
        res.setHeader('Set-Cookie', serialize('session', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60 * 15, // 15 minutes
          path: '/',
        }));
        return res.status(200).json({ user });
      } else {
        return res.status(200).json({ user, accessToken, refreshToken });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async signup(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userData = SignupSchema.parse(req.body);
      const result = await authRepository.signup(userData);

      if (!result) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const { user, accessToken, refreshToken } = result;

      if (user.role === 'admin') {
        res.setHeader('Set-Cookie', serialize('session', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 60 * 15, // 15 minutes
          path: '/',
        }));
        return res.status(201).json({ user });
      } else {
        return res.status(201).json({ user, accessToken, refreshToken });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async refreshToken(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }

    const result = await authRepository.refreshToken(token);

    if (!result) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    return res.status(200).json(result);
  }
}

export const authController = new AuthController();
