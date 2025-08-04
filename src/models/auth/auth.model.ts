import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - mobile
 *         - password
 *       properties:
 *         mobile:
 *           type: string
 *         password:
 *           type: string
 */
export const LoginSchema = z.object({
  mobile: z.string(),
  password: z.string(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Signup:
 *       type: object
 *       required:
 *         - name
 *         - mobile
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *         mobile:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, employee, retailer]
 */
export const SignupSchema = z.object({
  name: z.string(),
  mobile: z.string(),
  password: z.string(),
  email: z.string().email().optional(),
  role: z.enum(['admin', 'employee', 'retailer']),
});

export const JWTPayloadSchema = z.object({
  id: z.string(),
  role: z.string(),
});

export const SessionSchema = z.object({
  userId: z.string(),
  role: z.string(),
  createdAt: z.date(),
  expiresAt: z.date(),
});

export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
export type Session = z.infer<typeof SessionSchema>;
