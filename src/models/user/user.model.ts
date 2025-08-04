import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, employee, retailer]
 *         createdAt:
 *           type: string
 *           format: date-time
 */
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  password: z.string(),
  email: z.string().email().optional(),
  mobile: z.string(),
  role: z.enum(['admin', 'employee', 'retailer']),
  createdAt: z.date(),
});

export const UserResponseSchema = UserSchema.omit({ password: true });

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });

export const UpdateUserSchema = UserSchema.partial();

export const WorkerSchema = z.object({
  retailerId: z.string().uuid(),
  employeeId: z.string().uuid(),
});

export const CreateWorkerSchema = WorkerSchema;

export type User = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Worker = z.infer<typeof WorkerSchema>;
export type CreateWorker = z.infer<typeof CreateWorkerSchema>;
