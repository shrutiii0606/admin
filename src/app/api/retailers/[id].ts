import { retailerController } from '@/controllers/retailer.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /retailers/{id}:
 *   get:
 *     summary: Returns a retailer by ID
 *     tags: [Retailers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The retailer ID
 *     responses:
 *       200:
 *         description: The retailer description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Retailer'
 *       404:
 *         description: Retailer not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Updates a retailer by ID
 *     tags: [Retailers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The retailer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRetailer'
 *     responses:
 *       200:
 *         description: The retailer was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Retailer'
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Retailer not found
 *   delete:
 *     summary: Deletes a retailer by ID
 *     tags: [Retailers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The retailer ID
 *     responses:
 *       204:
 *         description: The retailer was successfully deleted.
 *       404:
 *         description: Retailer not found
 *       500:
 *         description: Internal server error
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return retailerController.getRetailerById(req, res);
    case 'PUT':
      return retailerController.updateRetailer(req, res);
    case 'DELETE':
      return retailerController.deleteRetailer(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
