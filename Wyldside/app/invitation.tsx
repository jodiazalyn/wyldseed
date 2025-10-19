import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Lock, ArrowLeft } from 'lucide-react-native';

export default function InvitationScreen() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = () => {
    if (!inviteCode.trim()) {
      Alert.alert('Required', 'Please enter your invitation code');
      return;
    }

    setIsLoading(true);

    // Simulate verification delay
    setTimeout(() => {
      // For now, accept any non-empty code
      // TODO: Add actual verification logic with backend
      setIsLoading(false);
      router.push('/onboarding');
    }, 1000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#0a0a0a', '#1a1a1a']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899', '#F59E0B']}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Lock size={48} color="#fff" />
              </LinearGradient>
            </View>

            {/* Title */}
            <Text style={styles.title}>Enter Invitation Code</Text>
            <Text style={styles.subtitle}>
              Wyldseed is currently invitation-only. Enter your unique code to get started.
            </Text>

            {/* Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="XXXXXXXX"
                placeholderTextColor="#666"
                value={inviteCode}
                onChangeText={setInviteCode}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={16}
              />
            </View>

            {/* Info Text */}
            <Text style={styles.infoText}>
              Don't have a code?{' '}
              <Text style={styles.infoLink}>Request access</Text>
            </Text>

            {/* Continue Button */}
            <TouchableOpacity
              style={[styles.continueButton, (!inviteCode.trim() || isLoading) && styles.continueButtonDisabled]}
              onPress={handleVerifyCode}
              disabled={!inviteCode.trim() || isLoading}
            >
              <LinearGradient
                colors={(!inviteCode.trim() || isLoading) ? ['#666', '#666'] : ['#8B5CF6', '#EC4899']}
                style={styles.continueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.continueText}>
                  {isLoading ? 'Verifying...' : 'Continue'}
                </Text>
                {!isLoading && <Sparkles size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 4,
    fontWeight: '600',
    borderWidth: 2,
    borderColor: '#444',
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 32,
  },
  infoLink: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  continueButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  continueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

