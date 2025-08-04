import { userRepository } from '@/repositories/user.repository';
import { CreateUserSchema, UpdateUserSchema, UserResponseSchema } from '@/models/user/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

export class RetailerController {
  async getAllRetailers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const retailers = await userRepository.getByRole('retailer');
      return res.status(200).json(retailers);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRetailerById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const retailer = await userRepository.getUserById(id as string);
      if (!retailer || retailer.role !== 'retailer') {
        return res.status(404).json({ message: 'Retailer not found' });
      }
      return res.status(200).json(retailer);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createRetailer(req: NextApiRequest, res: NextApiResponse) {
    try {
      const retailerData = CreateUserSchema.parse(req.body);
      if (retailerData.role && retailerData.role !== 'retailer') {
        return res.status(400).json({ message: 'Cannot create a retailer with a non-retailer role' });
      }
      const newRetailer = await userRepository.createUser({ ...retailerData, role: 'retailer' });
      return res.status(201).json(UserResponseSchema.parse(newRetailer));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async updateRetailer(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const retailerData = UpdateUserSchema.parse(req.body);
      if (retailerData.role && retailerData.role !== 'retailer') {
        return res.status(400).json({ message: 'Cannot change a retailer to a non-retailer role' });
      }
      const updatedRetailer = await userRepository.updateUser(id as string, retailerData);
      if (!updatedRetailer || updatedRetailer.role !== 'retailer') {
        return res.status(404).json({ message: 'Retailer not found' });
      }
      return res.status(200).json(UserResponseSchema.parse(updatedRetailer));
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async deleteRetailer(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const retailer = await userRepository.getUserById(id as string);
      if (!retailer || retailer.role !== 'retailer') {
        return res.status(404).json({ message: 'Retailer not found' });
      }
      await userRepository.deleteUser(id as string);
      return res.status(204).end();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const retailerController = new RetailerController();