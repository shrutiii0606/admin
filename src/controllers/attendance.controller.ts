import { attendanceRepository } from '@/repositories/attendance.repository';
import { CreateAttendanceSchema, UpdateAttendanceSchema } from '@/models/attendance/attendance.model';
import { NextApiRequest, NextApiResponse } from 'next';

export class AttendanceController {
  async getAllAttendance(req: NextApiRequest, res: NextApiResponse) {
    try {
      const attendanceRecords = await attendanceRepository.getAllAttendance();
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAttendanceById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const attendanceRecord = await attendanceRepository.getAttendanceById(id as string);
      if (!attendanceRecord) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }
      return res.status(200).json(attendanceRecord);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createAttendance(req: NextApiRequest, res: NextApiResponse) {
    try {
      const attendanceData = CreateAttendanceSchema.parse(req.body);
      const newAttendance = await attendanceRepository.createAttendance(attendanceData);
      return res.status(201).json(newAttendance);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async updateAttendance(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const attendanceData = UpdateAttendanceSchema.parse(req.body);
      const updatedAttendance = await attendanceRepository.updateAttendance(id as string, attendanceData);
      if (!updatedAttendance) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }
      return res.status(200).json(updatedAttendance);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async deleteAttendance(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const deleted = await attendanceRepository.deleteAttendance(id as string);
      if (!deleted) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }
      return res.status(204).end();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const attendanceController = new AttendanceController();
