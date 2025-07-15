// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

// This layout defines the navigation stack specifically for the authentication flow.
export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false, title: 'Login' }} />
      <Stack.Screen name="signup" options={{ headerShown: false, title: 'Sign Up' }} />
    </Stack>
  );
}
