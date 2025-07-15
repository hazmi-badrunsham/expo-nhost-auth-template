import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useUserData, useSignOut } from '@nhost/react';
import { router } from 'expo-router';


export default function MainScreen() {
  const user = useUserData(); // ✅ Correct usage
  const { signOut } = useSignOut();

  async function handleSignOut() {
    console.log('Sign Out pressed');
    const { error } = await signOut();

    if (error) {
      console.error('Sign Out Error:', error.message);
      Alert.alert('Sign Out Failed', error.message || 'An unknown error occurred.');
    } else {
      console.log('Sign Out successful');
      router.replace('/')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Main App!</Text>
      <Text style={styles.subtitle}>You are logged in as:</Text>
      <Text style={styles.emailText}>{user?.displayName}</Text>
      <Text style={styles.emailText}>{user?.email}</Text>


      <Button title="Sign Out" onPress={handleSignOut} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
});
