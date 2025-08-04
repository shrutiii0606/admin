import { userRepository } from '@/repositories/user.repository';
import { UserSchema, UpdateUserSchema } from '@/models/user/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

export class UserController {
  async getAllUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await userRepository.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserById(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const user = await userRepository.getUserById(id as string);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userData = UserSchema.parse(req.body);
      const newUser = await userRepository.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async updateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const userData = UpdateUserSchema.parse(req.body);
      const updatedUser = await userRepository.updateUser(id as string, userData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  async deleteUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const deleted = await userRepository.deleteUser(id as string);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(204).end();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const userController = new UserController();
