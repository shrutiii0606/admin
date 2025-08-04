import { attendanceController } from '@/controllers/attendance.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     summary: Returns an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The attendance record ID
 *     responses:
 *       200:
 *         description: The attendance record description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Updates an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The attendance record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttendance'
 *     responses:
 *       200:
 *         description: The attendance record was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Attendance record not found
 *   delete:
 *     summary: Deletes an attendance record by ID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The attendance record ID
 *     responses:
 *       204:
 *         description: The attendance record was successfully deleted.
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal server error
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return attendanceController.getAttendanceById(req, res);
    case 'PUT':
      return attendanceController.updateAttendance(req, res);
    case 'DELETE':
      return attendanceController.deleteAttendance(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
