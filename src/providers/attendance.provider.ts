import { BaseProvider } from "@/providers/base.provider";
import { attendance, users } from "@/db/schema";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";

export class AttendanceProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                id: attendance.id,
                userId: attendance.userId,
                checkIn: attendance.checkIn,
                checkOut: attendance.checkOut,
                date: attendance.date,
                status: attendance.status,
                user: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    role: users.role,
                }
            })
            .from(attendance)
            .innerJoin(users, eq(attendance.userId, users.id))
            .orderBy(desc(attendance.date));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(attendance).where(eq(attendance.id, id));
        return result[0] || null;
    }

    async getByUser(userId: string): Promise<any[]> {
        return await this.db
            .select()
            .from(attendance)
            .where(eq(attendance.userId, userId))
            .orderBy(desc(attendance.date));
    }

    async getByUserAndDate(userId: string, date: Date): Promise<any> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const result = await this.db
            .select()
            .from(attendance)
            .where(
                and(
                    eq(attendance.userId, userId),
                    gte(attendance.date, startOfDay),
                    lte(attendance.date, endOfDay)
                )
            );
        return result[0] || null;
    }

    async getByDateRange(startDate: Date, endDate: Date, userId?: string): Promise<any[]> {
        const conditions = [
            gte(attendance.date, startDate),
            lte(attendance.date, endDate)
        ];

        if (userId) {
            conditions.push(eq(attendance.userId, userId));
        }

        return await this.db
            .select({
                id: attendance.id,
                userId: attendance.userId,
                checkIn: attendance.checkIn,
                checkOut: attendance.checkOut,
                date: attendance.date,
                status: attendance.status,
                user: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    role: users.role,
                }
            })
            .from(attendance)
            .innerJoin(users, eq(attendance.userId, users.id))
            .where(and(...conditions))
            .orderBy(desc(attendance.date));
    }

    async getTodayAttendance(): Promise<any[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return await this.db
            .select({
                id: attendance.id,
                userId: attendance.userId,
                checkIn: attendance.checkIn,
                checkOut: attendance.checkOut,
                date: attendance.date,
                status: attendance.status,
                user: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    role: users.role,
                }
            })
            .from(attendance)
            .innerJoin(users, eq(attendance.userId, users.id))
            .where(
                and(
                    gte(attendance.date, today),
                    lte(attendance.date, tomorrow)
                )
            )
            .orderBy(desc(attendance.checkIn));
    }

    async getMonthlyAttendance(userId: string, month: number, year: number): Promise<any[]> {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        return await this.db
            .select()
            .from(attendance)
            .where(
                and(
                    eq(attendance.userId, userId),
                    gte(attendance.date, startDate),
                    lte(attendance.date, endDate)
                )
            )
            .orderBy(attendance.date);
    }

    async getAttendanceStats(userId: string, startDate: Date, endDate: Date): Promise<any> {
        const result = await this.db
            .select({
                total: sql<number>`count(*)`,
                present: sql<number>`count(case when ${attendance.status} = 'present' then 1 end)`,
                absent: sql<number>`count(case when ${attendance.status} = 'absent' then 1 end)`,
                leave: sql<number>`count(case when ${attendance.status} = 'leave' then 1 end)`,
                checkin: sql<number>`count(case when ${attendance.status} = 'checkin' then 1 end)`,
            })
            .from(attendance)
            .where(
                and(
                    eq(attendance.userId, userId),
                    gte(attendance.date, startDate),
                    lte(attendance.date, endDate)
                )
            );

        return result[0] || { total: 0, present: 0, absent: 0, leave: 0, checkin: 0 };
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(attendance).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(attendance)
            .set(updateData)
            .where(eq(attendance.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(attendance).where(eq(attendance.id, id));
    }

    async checkIn(userId: string, checkInTime?: Date): Promise<any> {
        const now = checkInTime || new Date();
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);

        const existingAttendance = await this.getByUserAndDate(userId, today);

        if (existingAttendance) {
            return await this.update({
                id: existingAttendance.id,
                checkIn: now,
                status: "checkin"
            });
        } else {
            return await this.create({
                userId,
                checkIn: now,
                date: today,
                status: "checkin"
            });
        }
    }

    async checkOut(attendanceId: string, checkOutTime?: Date): Promise<any> {
        const now = checkOutTime || new Date();

        return await this.update({
            id: attendanceId,
            checkOut: now,
            status: "present"
        });
    }

    async markAbsent(userId: string, date: Date): Promise<any> {
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const existingAttendance = await this.getByUserAndDate(userId, attendanceDate);

        if (existingAttendance) {
            return await this.update({
                id: existingAttendance.id,
                status: "absent"
            });
        } else {
            return await this.create({
                userId,
                date: attendanceDate,
                status: "absent"
            });
        }
    }

    async markLeave(userId: string, date: Date): Promise<any> {
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const existingAttendance = await this.getByUserAndDate(userId, attendanceDate);

        if (existingAttendance) {
            return await this.update({
                id: existingAttendance.id,
                status: "leave"
            });
        } else {
            return await this.create({
                userId,
                date: attendanceDate,
                status: "leave"
            });
        }
    }
}