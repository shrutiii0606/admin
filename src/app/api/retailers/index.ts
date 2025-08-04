import { retailerController } from '@/controllers/retailer.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /retailers:
 *   get:
 *     summary: Returns a list of all retailers
 *     tags: [Retailers]
 *     responses:
 *       200:
 *         description: A list of retailers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Retailer'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Creates a new retailer
 *     tags: [Retailers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRetailer'
 *     responses:
 *       201:
 *         description: The retailer was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Retailer'
 *       400:
 *         description: Invalid request body.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return retailerController.getAllRetailers(req, res);
    case 'POST':
      return retailerController.createRetailer(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
