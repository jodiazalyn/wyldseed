import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Globe, Music, ShoppingBag, TrendingUp, Users } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for AI icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  const features = [
    {
      icon: <Sparkles size={28} color="#8B5CF6" />,
      title: 'AI-Powered Personalization',
      description: 'Your own AI agent that learns your taste and curates your entire experience',
    },
    {
      icon: <Music size={28} color="#EC4899" />,
      title: 'Global Music Discovery',
      description: 'Discover tracks, artists, and beats from hip hop scenes around the world',
    },
    {
      icon: <TrendingUp size={28} color="#F59E0B" />,
      title: 'Cultural Trends',
      description: 'Stay ahead with trending content from fashion to art to street culture',
    },
    {
      icon: <ShoppingBag size={28} color="#10B981" />,
      title: 'Curated Shopping',
      description: 'Shop exclusive drops, sneakers, jewelry, and fashion tailored to you',
    },
    {
      icon: <Users size={28} color="#3B82F6" />,
      title: 'Connect Globally',
      description: 'Join a community of hip hop lovers from every corner of the globe',
    },
    {
      icon: <Globe size={28} color="#8B5CF6" />,
      title: 'Multi-Regional Content',
      description: 'Experience hip hop culture through different regional lenses',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a1a1a', '#0a0a0a', '#1a1a1a']} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <Animated.View
            style={[
              styles.heroSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* AI Icon with Pulse */}
            <Animated.View style={[styles.aiIconContainer, { transform: [{ scale: pulseAnim }] }]}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899', '#F59E0B']}
                style={styles.aiIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Sparkles size={80} color="#fff" />
              </LinearGradient>
              <View style={styles.aiGlow} />
            </Animated.View>

            <Text style={styles.logo}>WYLDSEED</Text>
            <Text style={styles.tagline}>Where AI Meets Hip Hop Culture</Text>
            <Text style={styles.description}>
              Your personalized gateway to global hip hop - music, fashion, culture, and community
              powered by artificial intelligence.
            </Text>
          </Animated.View>

          {/* Features Grid */}
          <Animated.View style={[styles.featuresSection, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>What Makes Wyldseed Special</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.featureIconContainer}>{feature.icon}</View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

        </ScrollView>

        {/* CTA Button - Fixed at bottom */}
        <Animated.View style={[styles.ctaContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Get Started - It's Free</Text>
              <Sparkles size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>No credit card required • Takes 2 minutes</Text>
        </Animated.View>
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
  scrollContent: {
    paddingBottom: 140,
  },
  heroSection: {
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  aiIconContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  aiIconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#8B5CF6',
    opacity: 0.2,
    top: -10,
    left: -10,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    fontSize: 20,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  featureIconContainer: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  ctaGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  ctaSubtext: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
});

