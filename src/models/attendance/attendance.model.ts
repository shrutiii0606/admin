import { z } from "zod";

export const AttendanceSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    checkIn: z.date(),
    checkOut: z.date().optional(),
    date: z.date(),
    status: z.enum(["present", "absent", "leave", "checkin"]).default("absent"),
});

export const CreateAttendanceSchema = AttendanceSchema.omit({ id: true });

export const UpdateAttendanceSchema = z.object({
    id: z.string().uuid(),
    checkOut: z.date().optional(),
    status: z.enum(["present", "absent", "leave", "checkin"]).optional(),
});

export const CheckInSchema = z.object({
    userId: z.string().uuid(),
    checkIn: z.date().optional(),
});

export const CheckOutSchema = z.object({
    attendanceId: z.string().uuid(),
    checkOut: z.date().optional(),
});

export const AttendanceWithUserSchema = AttendanceSchema.extend({
    user: z.object({
        id: z.string().uuid(),
        name: z.string(),
        mobile: z.string(),
        role: z.enum(["admin", "employee", "retailer"]),
    }),
});

export const AttendanceReportSchema = z.object({
    userId: z.string().uuid().optional(),
    startDate: z.string().datetime().or(z.date()),
    endDate: z.string().datetime().or(z.date()),
    status: z.enum(["present", "absent", "leave", "checkin"]).optional(),
});

export const MonthlyAttendanceSummarySchema = z.object({
    userId: z.string().uuid(),
    month: z.number().min(1).max(12),
    year: z.number().min(2000),
    totalWorkingDays: z.number(),
    presentDays: z.number(),
    absentDays: z.number(),
    leaveDays: z.number(),
    attendancePercentage: z.number(),
});

export type Attendance = z.infer<typeof AttendanceSchema>;
export type CreateAttendance = z.infer<typeof CreateAttendanceSchema>;
export type UpdateAttendance = z.infer<typeof UpdateAttendanceSchema>;
export type CheckIn = z.infer<typeof CheckInSchema>;
export type CheckOut = z.infer<typeof CheckOutSchema>;
export type AttendanceWithUser = z.infer<typeof AttendanceWithUserSchema>;
export type AttendanceReport = z.infer<typeof AttendanceReportSchema>;
export type MonthlyAttendanceSummary = z.infer<typeof MonthlyAttendanceSummarySchema>;