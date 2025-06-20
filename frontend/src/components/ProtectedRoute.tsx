import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Loader, Center } from '@mantine/core';

export const ProtectedRoute = () => {
  const { isAuthenticated, fetchUser } = useAuth();
  const location = useLocation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchUser(); // opcional si querés validar sesión en cada refresh
      } catch (error) {
        // Si fetchUser falla, se maneja en el hook (se hace logout)
      } finally {
        setHydrated(true);
      }
    };

    initialize();
  }, []);

  if (!hydrated) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};