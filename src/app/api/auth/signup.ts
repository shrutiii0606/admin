import { authController } from '@/controllers/auth.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signs up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: The user was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid request body.
 *       409:
 *         description: User already exists.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return authController.signup(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
