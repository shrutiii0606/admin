import { authController } from '@/controllers/auth.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refreshes an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: The access token was refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid refresh token.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return authController.refreshToken(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
