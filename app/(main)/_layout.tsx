import { Slot, useRouter } from 'expo-router';
import { useAuthenticationStatus } from '@nhost/react';
import { useEffect } from 'react';

export default function MainLayout() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/(auth)/login'); // Force back to login
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) return null;

  return <Slot />;
}
