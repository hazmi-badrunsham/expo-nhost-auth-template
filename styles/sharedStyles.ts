// styles/sharedStyles.ts (optional)
import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1e40af',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: '#1e40af',
    marginTop: 16,
  },
});
