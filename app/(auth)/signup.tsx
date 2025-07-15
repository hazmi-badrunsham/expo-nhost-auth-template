// app/(auth)/signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { nhost } from '../../lib/nhost/client';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // --- Client-side validation ---
    if (!username || !email || !password || !confirmPassword) {
      return Alert.alert('Missing Fields', 'Please fill in all fields.');
    }
    if (!email.includes('@') || !email.includes('.')) {
      return Alert.alert('Invalid Email', 'Enter a valid email address.');
    }
    if (password.length < 6) {
      return Alert.alert('Weak Password', 'Password must be at least 6 characters.');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Password Mismatch', 'Passwords do not match.');
    }
    // --- End client-side validation ---

    setLoading(true);
    console.log('--- SignUpScreen Debug ---');
    console.log('Attempting sign-up for:', email, 'with username:', username);

    try {
      const { session, error } = await nhost.auth.signUp({
        email,
        password,
        options: {
          displayName: username, // Pass the username as displayName for Nhost auth user
        },
      });

      if (error) {
        console.error('Sign Up Error:', error.message);
        Alert.alert('Sign Up Error', error.message);
      } else if (session?.user) {
        // Successful signup AND user is immediately logged in (if Nhost config allows)
        console.log('Sign up successful! User:', session.user.email);
        Alert.alert('Sign Up Successful', 'Account created and you are logged in!');
        // If Nhost auto-signs in, _layout.tsx will handle the redirect to (main)
        // No explicit router.replace needed here if _layout.tsx handles it
      } else {
        // Signup completed without error, but no session returned (e.g., email verification required)
        console.log('Sign up completed, but no session returned. Email verification likely required.');
        Alert.alert(
          'Sign Up Successful',
          'Account created! Please check your email to verify before logging in.'
        );
        // Explicitly redirect to login page for verification
        router.replace('/(auth)/login');
      }
    } catch (e: any) {
      // Catch any unexpected network or SDK errors
      console.error('Network/SDK Error during signup:', e?.message);
      Alert.alert('Network Error', e?.message || 'Something went wrong during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        placeholderTextColor="#616161ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#616161ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
        placeholderTextColor="#616161ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCorrect={false}
        placeholderTextColor="#616161ff"
      />
      <View style={styles.buttonGroup}>
        <Button title="Sign Up" onPress={handleSignup} disabled={loading} />
        {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.activityIndicator} />}
      </View>
      <Button
        title="Already have an account? Log In"
        onPress={() => router.push('/(auth)/login')}
        disabled={loading}
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityIndicator: {
    marginLeft: 10,
  },
});
