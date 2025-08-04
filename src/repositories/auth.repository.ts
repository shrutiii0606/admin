import { AuthProvider } from '@/providers/auth.provider';
import { UserProvider } from '@/providers/user.provider';
import { Login, Signup } from '@/models/auth/auth.model';
import { User } from '@/models/user/user.model';
import { db } from '@/db';

class AuthRepository {
  private authProvider: AuthProvider;
  private userProvider: UserProvider;

  constructor(authProvider: AuthProvider, userProvider: UserProvider) {
    this.authProvider = authProvider;
    this.userProvider = userProvider;
  }

  async login(credentials: Login): Promise<{ user: User; accessToken: string; refreshToken: string } | null> {
    const user = await this.userProvider.validatePassword(
      credentials.mobile,
      credentials.password
    );

    if (!user) {
      return null;
    }

    const accessToken = await this.authProvider.generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = await this.authProvider.generateRefreshToken({ id: user.id, role: user.role });
    return { user, accessToken, refreshToken };
  }

  async signup(userData: Signup): Promise<{ user: User; accessToken: string; refreshToken: string } | null> {
    const existingUser = await this.userProvider.getByMobile(userData.mobile);
    if (existingUser) {
      return null;
    }

    const user = await this.userProvider.create(userData);

    const accessToken = await this.authProvider.generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = await this.authProvider.generateRefreshToken({ id: user.id, role: user.role });

    return { user, accessToken, refreshToken };
  }

  async refreshToken(token: string): Promise<{ accessToken: string } | null> {
    const payload = await this.authProvider.verifyRefreshToken(token);
    if (!payload) {
      return null;
    }

    const user = await this.userProvider.getById(payload.id);
    if (!user) {
      return null;
    }

    const accessToken = await this.authProvider.generateAccessToken({ id: user.id, role: user.role });
    return { accessToken };
  }
}

export const authRepository = new AuthRepository(
  new AuthProvider(),
  new UserProvider(db)
);
