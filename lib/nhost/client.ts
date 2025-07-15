// lib/nhost/client.ts
import { NhostClient } from '@nhost/nhost-js';
import Constants from 'expo-constants';

// Retrieve Nhost subdomain and region from app.json's 'extra' field.
const nhostSubdomain = Constants.expoConfig?.extra?.nhostSubdomain as string;
const nhostRegion = Constants.expoConfig?.extra?.nhostRegion as string;

// --- IMPORTANT: Replace these placeholders with your actual Nhost project details ---
// You can find these values in your Nhost project dashboard under 'Settings'.
// Example: subdomain: 'bhmrxbkzzjxyghkssbnt', region: 'ap-southeast-1'
const YOUR_ACTUAL_NHOST_SUBDOMAIN = ''; // <-- Put your Nhost project subdomain here
const YOUR_ACTUAL_NHOST_REGION = '';     // <-- Put your Nhost project region here
// ----------------------------------------------------------------------------------

// Initialize the Nhost client.
export const nhost = new NhostClient({
  subdomain: nhostSubdomain || YOUR_ACTUAL_NHOST_SUBDOMAIN,
  region: nhostRegion || YOUR_ACTUAL_NHOST_REGION,
});

// Basic warning for development if configuration is missing.
if (!nhostSubdomain && !YOUR_ACTUAL_NHOST_SUBDOMAIN) {
  console.warn("Nhost subdomain is not configured. Please add it to app.json's 'extra' field or directly in lib/nhost/client.ts.");
}
if (!nhostRegion && !YOUR_ACTUAL_NHOST_REGION) {
  console.warn("Nhost region is not configured. Please add it to app.json's 'extra' field or directly in lib/nhost/client.ts.");
}
