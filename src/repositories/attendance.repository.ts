import { AttendanceProvider } from "@/providers/attendance.provider";
import { BaseRepository } from "./base.repository";
import { db } from "@/db";
import {
    Attendance,
    CreateAttendance,
    UpdateAttendance,
    CheckIn,
    CheckOut,
    AttendanceWithUser,
    AttendanceReport,
    MonthlyAttendanceSummary,
    AttendanceSchema,
    CreateAttendanceSchema,
    UpdateAttendanceSchema,
    CheckInSchema,
    CheckOutSchema,
    AttendanceWithUserSchema,
    AttendanceReportSchema,
    MonthlyAttendanceSummarySchema
} from "@/models/attendance/attendance.model";
import { dbEvents } from "@/events/emitters";
import { AttendanceEvent } from "@/events/events/db.events";

class AttendanceRepository extends BaseRepository<AttendanceProvider> {
    constructor(provider: AttendanceProvider) {
        super(provider);
    }

    async getAll(): Promise<AttendanceWithUser[]> {
        const attendances = await this.provider.getAll();
        return attendances.map(attendance => AttendanceWithUserSchema.parse(attendance));
    }

    async getById(id: string): Promise<Attendance | null> {
        const attendance = await this.provider.getById(id);
        return attendance ? AttendanceSchema.parse(attendance) : null;
    }

    async getByUser(userId: string): Promise<Attendance[]> {
        const attendances = await this.provider.getByUser(userId);
        return attendances.map(attendance => AttendanceSchema.parse(attendance));
    }

    async getByUserAndDate(userId: string, date: Date): Promise<Attendance | null> {
        const attendance = await this.provider.getByUserAndDate(userId, date);
        return attendance ? AttendanceSchema.parse(attendance) : null;
    }

    async getByDateRange(startDate: Date, endDate: Date, userId?: string): Promise<AttendanceWithUser[]> {
        const attendances = await this.provider.getByDateRange(startDate, endDate, userId);
        return attendances.map(attendance => AttendanceWithUserSchema.parse(attendance));
    }

    async getTodayAttendance(): Promise<AttendanceWithUser[]> {
        const attendances = await this.provider.getTodayAttendance();
        return attendances.map(attendance => AttendanceWithUserSchema.parse(attendance));
    }

    async getMonthlyAttendance(userId: string, month: number, year: number): Promise<Attendance[]> {
        const attendances = await this.provider.getMonthlyAttendance(userId, month, year);
        return attendances.map(attendance => AttendanceSchema.parse(attendance));
    }

    async getAttendanceStats(userId: string, startDate: Date, endDate: Date): Promise<any> {
        return await this.provider.getAttendanceStats(userId, startDate, endDate);
    }

    async create(attendanceData: CreateAttendance): Promise<Attendance> {
        const validatedData = CreateAttendanceSchema.parse(attendanceData);
        const attendance = await this.provider.create(validatedData);
        dbEvents.emit(AttendanceEvent.created<CreateAttendance>(attendanceData));
        return AttendanceSchema.parse(attendance);
    }

    async update(attendanceData: UpdateAttendance): Promise<Attendance> {
        const validatedData = UpdateAttendanceSchema.parse(attendanceData);
        const attendance = await this.provider.update(validatedData);
        dbEvents.emit(AttendanceEvent.updated<UpdateAttendance>(attendanceData));
        return AttendanceSchema.parse(attendance);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
        type DeleteAttendance = string;
        dbEvents.emit(AttendanceEvent.deleted<DeleteAttendance>(id));
    }

    async checkIn(checkInData: CheckIn): Promise<Attendance> {
        const validatedData = CheckInSchema.parse(checkInData);
        const attendance = await this.provider.checkIn(validatedData.userId, validatedData.checkIn || new Date());
        dbEvents.emit(AttendanceEvent.updated<UpdateAttendance>({ id: checkInData.userId }));
        return AttendanceSchema.parse(attendance);
    }

    async checkOut(checkOutData: CheckOut): Promise<Attendance> {
        const validatedData = CheckOutSchema.parse(checkOutData);
        const attendance = await this.provider.checkOut(validatedData.attendanceId, validatedData.checkOut || new Date());
        dbEvents.emit(AttendanceEvent.updated<UpdateAttendance>({ id: checkOutData.attendanceId, checkOut: checkOutData.checkOut }));
        return AttendanceSchema.parse(attendance);
    }

    async markAbsent(userId: string, date: Date): Promise<Attendance> {
        const attendance = await this.provider.markAbsent(userId, date);
        dbEvents.emit(AttendanceEvent.updated<UpdateAttendance>({ id: userId, checkOut: date }));
        return AttendanceSchema.parse(attendance);
    }

    async markLeave(userId: string, date: Date): Promise<Attendance> {
        const attendance = await this.provider.markLeave(userId, date);
        dbEvents.emit(AttendanceEvent.updated<UpdateAttendance>({ id: userId, checkOut: date }));
        return AttendanceSchema.parse(attendance);
    }
}

export const attendanceRepository = new AttendanceRepository(new AttendanceProvider(db));