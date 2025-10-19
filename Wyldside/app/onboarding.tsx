import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ChevronRight, Check } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface OnboardingData {
  name: string;
  handle: string;
  phoneNumber: string;
  socialMedia: string;
  gender: string;
  age: string;
  region: string;
  interests: string[];
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: '',
    handle: '',
    phoneNumber: '',
    socialMedia: '',
    gender: '',
    age: '',
    region: '',
    interests: [],
  });

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

  const genderOptions = ['Woman', 'Man', 'Non-binary', 'I prefer not to say'];
  
  const regions = [
    { id: 'AF', name: 'Africa', flag: '🌍' },
    { id: 'AS', name: 'Asia', flag: '🌏' },
    { id: 'NA', name: 'North America', flag: '🌎' },
    { id: 'SA', name: 'South America', flag: '🌎' },
    { id: 'IN', name: 'India', flag: '🇮🇳' },
    { id: 'AU', name: 'Australia', flag: '🇦🇺' },
    { id: 'EU', name: 'Europe', flag: '🌍' },
  ];

  const interests = [
    { id: 1, name: 'Beat Vault', icon: '🎵' },
    { id: 2, name: 'Blogs / Music Reviews', icon: '📝' },
    { id: 3, name: 'Cultural News', icon: '📰' },
    { id: 4, name: 'Videos', icon: '📹' },
    { id: 5, name: 'Dance', icon: '💃' },
    { id: 6, name: 'Fashion', icon: '👔' },
    { id: 7, name: 'Cars', icon: '🚗' },
    { id: 8, name: 'Poetry', icon: '✍️' },
    { id: 9, name: 'Jewelry', icon: '💎' },
    { id: 10, name: 'Women of The Culture', icon: '👑' },
    { id: 11, name: 'Animals (Pets)', icon: '🐾' },
    { id: 12, name: 'Artist Development', icon: '🎨' },
    { id: 13, name: 'Sports', icon: '⚽' },
    { id: 14, name: 'Gaming', icon: '🎮' },
    { id: 15, name: 'Concerts', icon: '🎤' },
    { id: 16, name: 'Art / Graffiti', icon: '🎨' },
    { id: 17, name: 'Hip Hop History', icon: '📚' },
    { id: 18, name: 'Shoes', icon: '👟' },
    { id: 19, name: 'Social', icon: '💬' },
    { id: 20, name: 'Cross Culture', icon: '🌐' },
  ];

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    try {
      // Save onboarding data and create AI agent
      console.log('Onboarding completed with data:', onboardingData);
      
      // Save onboarding data to AsyncStorage
      await AsyncStorage.setItem('onboardingData', JSON.stringify(onboardingData));
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      
      // TODO: Send to API to create personalized AI agent
      // const response = await fetch('YOUR_API_ENDPOINT/create-agent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(onboardingData),
      // });
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const toggleInterest = (interestName: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestName)
        ? prev.interests.filter((i) => i !== interestName)
        : [...prev.interests, interestName],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true; // Welcome screen
      case 1:
        return onboardingData.name && onboardingData.handle;
      case 2:
        return onboardingData.phoneNumber && onboardingData.socialMedia;
      case 3:
        return onboardingData.gender;
      case 4:
        return onboardingData.age;
      case 5:
        return onboardingData.region;
      case 6:
        return onboardingData.interests.length >= 3;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.aiIconContainer}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                style={styles.aiIconGradient}
              >
                <Sparkles size={64} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={styles.welcomeTitle}>Welcome to Wyldseed</Text>
            <Text style={styles.welcomeSubtitle}>
              Your AI-Powered Hip Hop Culture Experience
            </Text>
            <Text style={styles.description}>
              We're about to create a personalized journey just for you. Our AI will learn your
              preferences and curate everything from music to fashion, videos to cultural trends.
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Check size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>Personalized music discovery</Text>
              </View>
              <View style={styles.featureItem}>
                <Check size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>Curated fashion & shopping</Text>
              </View>
              <View style={styles.featureItem}>
                <Check size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>Cultural trends & news</Text>
              </View>
              <View style={styles.featureItem}>
                <Check size={20} color="#8B5CF6" />
                <Text style={styles.featureText}>Global hip hop connection</Text>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Let's get to know you</Text>
            <Text style={styles.stepSubtitle}>Tell us your name and handle</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>What's your name?</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                value={onboardingData.name}
                onChangeText={(text) =>
                  setOnboardingData({ ...onboardingData, name: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Choose your handle</Text>
              <View style={styles.handleInputContainer}>
                <Text style={styles.handlePrefix}>@</Text>
                <TextInput
                  style={[styles.input, styles.handleInput]}
                  placeholder="username"
                  placeholderTextColor="#666"
                  value={onboardingData.handle}
                  onChangeText={(text) =>
                    setOnboardingData({ ...onboardingData, handle: text.toLowerCase() })
                  }
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Stay connected</Text>
            <Text style={styles.stepSubtitle}>How can we reach you?</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 123-4567"
                placeholderTextColor="#666"
                value={onboardingData.phoneNumber}
                onChangeText={(text) =>
                  setOnboardingData({ ...onboardingData, phoneNumber: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Social Media of Choice</Text>
              <TextInput
                style={styles.input}
                placeholder="Instagram, Twitter, TikTok, etc."
                placeholderTextColor="#666"
                value={onboardingData.socialMedia}
                onChangeText={(text) =>
                  setOnboardingData({ ...onboardingData, socialMedia: text })
                }
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>How do you identify?</Text>
            <Text style={styles.stepSubtitle}>Tell us about yourself to improve your experience on Wyldseed.</Text>
            
            <View style={styles.optionsContainer}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    onboardingData.gender === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => setOnboardingData({ ...onboardingData, gender: option })}
                >
                  <Text
                    style={[
                      styles.optionText,
                      onboardingData.gender === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {onboardingData.gender === option && (
                    <Check size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>How old are you?</Text>
            <Text style={styles.stepSubtitle}>This helps us recommend age-appropriate content</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.ageInput]}
                placeholder="Enter your age"
                placeholderTextColor="#666"
                value={onboardingData.age}
                onChangeText={(text) =>
                  setOnboardingData({ ...onboardingData, age: text.replace(/[^0-9]/g, '') })
                }
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Where are you from?</Text>
            <Text style={styles.stepSubtitle}>Help us connect you with your local culture</Text>
            
            <ScrollView style={styles.regionsScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.regionsContainer}>
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region.id}
                    style={[
                      styles.regionCard,
                      onboardingData.region === region.id && styles.regionCardSelected,
                    ]}
                    onPress={() => setOnboardingData({ ...onboardingData, region: region.id })}
                  >
                    <Text style={styles.regionFlag}>{region.flag}</Text>
                    <Text
                      style={[
                        styles.regionName,
                        onboardingData.region === region.id && styles.regionNameSelected,
                      ]}
                    >
                      {region.name}
                    </Text>
                    {onboardingData.region === region.id && (
                      <View style={styles.regionCheck}>
                        <Check size={16} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What interests you?</Text>
            <Text style={styles.stepSubtitle}>
              Select at least 3 interests to personalize your feed
            </Text>
            <Text style={styles.interestsCount}>
              {onboardingData.interests.length} selected
            </Text>
            
            <ScrollView style={styles.interestsScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.interestsGrid}>
                {interests.map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestCard,
                      onboardingData.interests.includes(interest.name) && styles.interestCardSelected,
                    ]}
                    onPress={() => toggleInterest(interest.name)}
                  >
                    <Text style={styles.interestIcon}>{interest.icon}</Text>
                    <Text
                      style={[
                        styles.interestName,
                        onboardingData.interests.includes(interest.name) && styles.interestNameSelected,
                      ]}
                    >
                      {interest.name}
                    </Text>
                    {onboardingData.interests.includes(interest.name) && (
                      <View style={styles.interestCheck}>
                        <Check size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0a0a0a', '#1a1a1a']} style={styles.gradient}>
        {/* Skip Button - Top Right */}
        {step > 0 && step < totalSteps - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={() => setStep(totalSteps - 1)}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Modal Container */}
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              {/* Content */}
              <ScrollView 
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {renderStep()}
              </ScrollView>

              {/* Navigation */}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    !canProceed() && styles.continueButtonDisabled,
                  ]}
                  onPress={handleNext}
                  disabled={!canProceed()}
                >
                  <Text style={styles.continueButtonText}>
                    {step === totalSteps - 1 ? 'Complete' : step === 0 ? "Let's Start" : 'Continue'}
                  </Text>
                </TouchableOpacity>
                
                {step > 0 && (
                  <TouchableOpacity style={styles.backLink} onPress={handleBack}>
                    <Text style={styles.backLinkText}>Back</Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>

        {/* Progress Indicator - Bottom */}
        <View style={styles.progressDots}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === step && styles.dotActive,
                index < step && styles.dotCompleted,
              ]}
            />
          ))}
        </View>
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
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 12,
  },
  skipText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 480,
    maxHeight: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  keyboardView: {
    maxHeight: '100%',
  },
  modalContent: {
    padding: 32,
    paddingBottom: 24,
  },
  modalFooter: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  stepContainer: {
    alignItems: 'center',
  },
  aiIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  aiIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#8B5CF6',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 21,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  handleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  handlePrefix: {
    fontSize: 16,
    color: '#8B5CF6',
    paddingLeft: 16,
    fontWeight: '600',
  },
  handleInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  ageInput: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  optionsContainer: {
    gap: 12,
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 18,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  optionText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  regionsScroll: {
    maxHeight: 400,
    width: '100%',
  },
  regionsContainer: {
    gap: 12,
    width: '100%',
  },
  regionCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 18,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  regionCardSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  regionFlag: {
    fontSize: 28,
  },
  regionName: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  regionNameSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  regionCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestsCount: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  interestsScroll: {
    maxHeight: 400,
    width: '100%',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  interestCard: {
    width: (width - 100) / 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    position: 'relative',
    minHeight: 100,
  },
  interestCardSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  interestIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 13,
    color: '#1a1a1a',
    textAlign: 'center',
    fontWeight: '500',
  },
  interestNameSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  interestCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    padding: 12,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: '#8B5CF6',
    width: 24,
  },
  dotCompleted: {
    backgroundColor: '#8B5CF6',
  },
});

