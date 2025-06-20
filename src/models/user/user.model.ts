import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Name is required"),
    password: z.string().optional(),
    email: z.string().email().optional(),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    role: z.enum(["admin", "employee", "retailer"]),
    createdAt: z.date().optional(),
});

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });

export const UpdateUserSchema = CreateUserSchema.partial().extend({
    id: z.string().uuid(),
});

export const LoginSchema = z.object({
    mobile: z.string().min(10, "Mobile number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const UserResponseSchema = UserSchema.omit({ password: true });

export const WorkerSchema = z.object({
    retailerId: z.string().uuid(),
    employeeId: z.string().uuid(),
});

export const CreateWorkerSchema = WorkerSchema;

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type Worker = z.infer<typeof WorkerSchema>;
export type CreateWorker = z.infer<typeof CreateWorkerSchema>;