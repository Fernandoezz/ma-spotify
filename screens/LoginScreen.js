import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the eye icon

export default function SpotifyLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    Alert.alert('Success', 'You are logged in!');
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Spotify Logo */}
        <Image
          source={require('../assets/images/spotify-logo.png')} // Spotify logo
          style={styles.logo}
        />

        {/* Login Title */}
        <Text style={styles.title}>Log in to Spotify</Text>

        {/* Social Login Buttons */}
        <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
          <View style={styles.socialContent}>
            <Image
              source={require('../assets/images/google-logo.png')} // Google logo
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <View style={styles.socialContent}>
            <Image
              source={require('../assets/images/facebook-logo.png')} // Facebook logo
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
          <View style={styles.socialContent}>
            <Icon name="apple" size={20} color="#FFF" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email or username"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Me */}
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity style={styles.rememberMeButton}>
            <View style={styles.toggleButton} />
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign up for Spotify
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Spotify's dark background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  googleButton: {
    borderColor: '#4285F4',
  },
  facebookButton: {
    borderColor: '#1877F2',
  },
  appleButton: {
    borderColor: '#FFF',
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  rememberMeButton: {
    width: 24,
    height: 24,
    backgroundColor: '#282828',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  toggleButton: {
    width: 12,
    height: 12,
    backgroundColor: '#1DB954', // Spotify green
    borderRadius: 6,
  },
  rememberMeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#1DB954',
    fontSize: 14,
    marginBottom: 20,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
  signUpText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});
