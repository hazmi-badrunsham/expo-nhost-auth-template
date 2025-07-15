import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { nhost } from '../../lib/nhost/client';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Missing Fields', 'Please enter email and password.');
    }
    if (!email.includes('@') || !email.includes('.')) {
      return Alert.alert('Invalid Email', 'Enter a valid email address.');
    }

    setLoading(true);
    try {
      const { session, error } = await nhost.auth.signIn({ email, password });
      console.log('📦 Login response:', { session, error });

      if (error?.message?.includes('Email is not verified')) {
        Alert.alert(
          'Email Not Verified',
          'Your email is not verified. Do you want us to resend the verification email?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Resend',
              onPress: async () => {
                try {
                  await nhost.auth.sendVerificationEmail({ email });
                  Alert.alert('Sent', 'Verification email has been resent.');
                } catch (resendError: any) {
                  Alert.alert('Error', resendError?.message || 'Failed to resend verification email.');
                }
              },
            },
          ]
        );
        return;
      }

      if (session && !session.user.emailVerified) {
        Alert.alert('Email Not Verified', 'Please verify your email before signing in.');
        return;
      }

      if (error) {
        Alert.alert('Login Error', error.message);
        return;
      }

      Alert.alert('Welcome!', 'You are now logged in.');
      router.replace('/'); // ✅ trigger redirect from index.tsx
     
    } catch (e: any) {
      Alert.alert('Network Error', e?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
        placeholderTextColor="#616161ff"
      />
      <View style={styles.buttonGroup}>
        <Button title="Sign In" onPress={handleLogin} disabled={loading} />
        {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.activityIndicator} />}
      </View>
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push('/(auth)/signup')}
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
