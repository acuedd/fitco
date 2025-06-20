import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/auth.services';
import type { LoginPayload, RegisterPayload } from '../services/auth.services';
import type { RootState } from '../store';
import { logout as logoutAction, setCredentials } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const login = async (payload: LoginPayload) => {
    const data = await authService.login(payload);
    dispatch(setCredentials({
      accessToken: data.access_token,
      user: data.user,
    }));
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const register = async (payload: RegisterPayload) => {
    await authService.register(payload);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn('Logout failed or already logged out.');
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      dispatch(logoutAction());
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await authService.getProfile();
      dispatch(setCredentials({
        accessToken,
        user: userData,
      }));
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user profile', error);
      dispatch(logoutAction());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  };

  return {
    accessToken,
    user,
    login,
    register,
    logout,
    fetchUser,
    isAuthenticated: !!accessToken && !!user,
  };
};