// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuthenticationStatus } from '@nhost/react';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return null;

  return <Redirect href={isAuthenticated ? '/(main)' : '/(auth)/login'} />;
}
