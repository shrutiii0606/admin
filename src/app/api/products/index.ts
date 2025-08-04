import { productController } from '@/controllers/product.controller';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Creates a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:c
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: The product was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request body.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return productController.getAllProducts(req, res);
    case 'POST':
      return productController.createProduct(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
