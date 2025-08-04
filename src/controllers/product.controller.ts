import { productRepository } from '@/repositories/product.repository';
import { CreateProductSchema, UpdateProductSchema } from '@/models/product/product.model';
import { NextApiRequest, NextApiResponse } from 'next';

export class ProductController {
  async getAllProducts(req: NextApiRequest, res: NextApiResponse) {
    try {
      const products = await productRepository.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProductById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const product = await productRepository.getProductById(id as string);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
      const productData = CreateProductSchema.parse(req.body);
      const newProduct = await productRepository.createProduct(productData);
      return res.status(201).json(newProduct);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async updateProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const productData = UpdateProductSchema.parse(req.body);
      const updatedProduct = await productRepository.updateProduct(id as string, productData);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async deleteProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const deleted = await productRepository.deleteProduct(id as string);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).end();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const productController = new ProductController();
