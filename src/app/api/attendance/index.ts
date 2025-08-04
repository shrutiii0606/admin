import { attendanceController } from '@/controllers/attendance.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Returns a list of all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: A list of attendance records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Creates a new attendance record
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAttendance'
 *     responses:
 *       201:
 *         description: The attendance record was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid request body.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return attendanceController.getAllAttendance(req, res);
    case 'POST':
      return attendanceController.createAttendance(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
