// app/_layout.tsx
import { Slot } from 'expo-router';
import { NhostProvider } from '@nhost/react';
import { nhost } from '../lib/nhost/client';

export default function RootLayout() {
  return (
    <NhostProvider nhost={nhost}>
      <Slot />
    </NhostProvider>
  );
}
