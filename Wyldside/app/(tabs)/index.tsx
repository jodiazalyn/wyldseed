import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus, Heart, Volume2, VolumeX, TrendingUp } from 'lucide-react-native';
import { MusicPlayer } from '@/components/MusicPlayer';
import { RegionLanguageSelector } from '@/components/RegionLanguageSelector';
import { useRegion } from '@/hooks/useRegionContext';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { selectedGeography, currentGeography, getUIText } = useRegion();
  const [activeCultureVideo, setActiveCultureVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  // Animation values for each tile
  const tileAnimations = useRef(
    Array.from({ length: 4 }, () => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(1),
      translateY: new Animated.Value(0),
    }))
  ).current;

  // Floating animation effect for tiles
  useEffect(() => {
    const animations = tileAnimations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim.translateY, {
            toValue: -5 + (index % 2) * 10,
            duration: 2000 + index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: 5 - (index % 2) * 10,
            duration: 2000 + index * 200,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      );
    });

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  const handleTilePress = (tileIndex: number) => {
    const anim = tileAnimations[tileIndex];
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(anim.scale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(anim.scale, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(anim.scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Using global region context instead of local country state

  // Get culture videos based on selected geography
  const getCultureVideos = () => {
    const videosByCountry = {
      US: [
        {
          id: 1,
          title: "Street Style NYC",
          creator: "@streetstyle_nyc",
          avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          video: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
          location: "Brooklyn, NY",
          views: "2.3M",
          duration: "0:15"
        },
        {
          id: 2,
          title: "Hip Hop Dance Battle",
          creator: "@hiphopbattles",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          video: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          location: "Atlanta, GA",
          views: "1.8M",
          duration: "0:28"
        }
      ],
      // ... other regions would go here
    };

    return videosByCountry[selectedGeography as keyof typeof videosByCountry] || videosByCountry.US;
  };

  // Content varies by country
  const getLocalizedContent = () => {
    const contentByCountry = {
      US: {
        greeting: "Good evening",
        subtitle: "What's the vibe today?",
        featuredSongs: [
          {
            id: 1,
            title: "God's Plan",
            artist: "Drake",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Air Jordan 4 Retro",
            price: "$190",
          },
          {
            id: 2,
            title: "HUMBLE.",
            artist: "Kendrick Lamar",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Mercedes-AMG G63",
            price: "$180,000",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Life Is Good",
            artist: "Future ft. Drake",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
        ]
      },
      // ... other regions would go here
    };

    return contentByCountry[selectedGeography as keyof typeof contentByCountry] || contentByCountry.US;
  };

  const content = getLocalizedContent();
  const cultureVideos = getCultureVideos();
  const uiText = getUIText();

  // Get region-specific content
  const getRegionCategories = () => {
    const categories = {
      US: [
        { name: "Hip Hop Central", color: "#E91E63", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { name: "Luxury Lifestyle", color: "#1565C0", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
        { name: "Street Fashion", color: "#455A64", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { name: "Culture Vibes", color: "#6D4C41", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
      ],
      ZA: [
        { name: "Amapiano", color: "#2E7D32", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { name: "Afrobeats", color: "#F57C00", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { name: "Township Style", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { name: "Gqom", color: "#7B1FA2", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
      ],
      SA: [
        { name: "Reggaetón", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { name: "Trap Latino", color: "#EF4444", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { name: "Moda Urbana", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { name: "Cumbia", color: "#2E7D32", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
      ],
      KR: [
        { name: "K-Pop", color: "#E91E63", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { name: "K-Hip Hop", color: "#8B5CF6", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { name: "Korean Fashion", color: "#F57C00", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { name: "Streetwear", color: "#7B1FA2", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
      ],
      AE: [
        { name: "Bollywood Hip-Hop", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { name: "Luxury Lifestyle", color: "#7B1FA2", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
        { name: "Traditional Fusion", color: "#2E7D32", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { name: "Designer Wear", color: "#E91E63", image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" },
      ],
    };
    return categories[selectedGeography as keyof typeof categories] || categories.US;
  };

  const getRegionPersonalizedContent = () => {
    const content = {
      US: {
        playlist: [
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
        ],
        sports: [
          "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
          "https://images.pexels.com/photos/357307/pexels-photo-357307.jpeg",
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        ],
        sneakers: [
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        ],
        cars: [
          "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
          "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
        ],
      },
      ZA: {
        playlist: [
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
        ],
        sports: [
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
          "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
          "https://images.pexels.com/photos/357307/pexels-photo-357307.jpeg",
        ],
        sneakers: [
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
        ],
        cars: [
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
          "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
        ],
      },
      SA: {
        playlist: [
          "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
        ],
        sports: [
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
          "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
          "https://images.pexels.com/photos/357307/pexels-photo-357307.jpeg",
        ],
        sneakers: [
          "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
        ],
        cars: [
          "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
          "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        ],
      },
      KR: {
        playlist: [
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
        ],
        sports: [
          "https://images.pexels.com/photos/357307/pexels-photo-357307.jpeg",
          "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        ],
        sneakers: [
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        ],
        cars: [
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
          "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
        ],
      },
      AE: {
        playlist: [
          "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
        ],
        sports: [
          "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
          "https://images.pexels.com/photos/357307/pexels-photo-357307.jpeg",
          "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        ],
        sneakers: [
          "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
        ],
        cars: [
          "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg",
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        ],
      },
    };
    return content[selectedGeography as keyof typeof content] || content.US;
  };

  const getRegionTrendingContent = () => {
    const trending = {
      US: [
        { location: "New York, US", title: "Drill Wave Taking Over", stats: "2.3M views • 48K likes", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { location: "Atlanta, US", title: "Trap Evolution", stats: "1.8M views • 35K likes", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { location: "Los Angeles, US", title: "West Coast Revival", stats: "1.5M views • 42K likes", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
        { location: "Chicago, US", title: "Chicago Footwork", stats: "1.2M views • 28K likes", image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg" },
      ],
      ZA: [
        { location: "Johannesburg, ZA", title: "Amapiano Wave", stats: "3.1M views • 52K likes", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { location: "Cape Town, ZA", title: "Township Vibes", stats: "2.4M views • 41K likes", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { location: "Durban, ZA", title: "Gqom Revolution", stats: "1.9M views • 38K likes", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
        { location: "Pretoria, ZA", title: "Kwaito Returns", stats: "1.6M views • 32K likes", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
      ],
      SA: [
        { location: "Medellín, CO", title: "Reggaetón Nuevo", stats: "2.8M views • 47K likes", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { location: "Buenos Aires, AR", title: "Trap Latino Rising", stats: "2.1M views • 39K likes", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { location: "São Paulo, BR", title: "Brazilian Funk Takeover", stats: "1.7M views • 36K likes", image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg" },
        { location: "Mexico City, MX", title: "Cumbia Hip Hop Fusion", stats: "1.4M views • 29K likes", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
      ],
      KR: [
        { location: "Seoul, KR", title: "K-Hip Hop Rising Stars", stats: "4.2M views • 68K likes", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { location: "Busan, KR", title: "Korean Street Style", stats: "3.5M views • 55K likes", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
        { location: "Gangnam, KR", title: "Show Me The Money Vibes", stats: "2.9M views • 49K likes", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { location: "Hongdae, KR", title: "Underground Scene", stats: "2.3M views • 41K likes", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
      ],
      AE: [
        { location: "Mumbai, IN", title: "Gully Boy Movement", stats: "3.8M views • 62K likes", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
        { location: "Dubai, AE", title: "Dubai Luxury Hip Hop", stats: "2.9M views • 48K likes", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
        { location: "Delhi, IN", title: "Indian Hip Hop Evolution", stats: "2.4M views • 44K likes", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
        { location: "Bangalore, IN", title: "Tech City Beats", stats: "1.9M views • 36K likes", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
      ],
    };
    return trending[selectedGeography as keyof typeof trending] || trending.US;
  };

  const regionCategories = getRegionCategories();
  const personalizedContent = getRegionPersonalizedContent();
  const trendingContent = getRegionTrendingContent();

  // Featured music tile
  const featuredMusicTile = {
    title: uiText.music,
    subtitle: uiText.latestTracks,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    color: "#1a1a1a"
  };

  // Using the global region selector - no need for local country modal

  const renderCultureVideoCard = (video: any, index: number) => (
    <TouchableOpacity
      key={video.id}
      style={[
        styles.cultureCard,
        index === activeCultureVideo && styles.activeCultureCard
      ]}
      onPress={() => setActiveCultureVideo(index)}
    >
      <Image source={{ uri: video.video }} style={styles.cultureThumbnail} />
      
      {/* Play button overlay */}
      <View style={styles.cultureOverlay}>
        <Play size={20} color="#fff" fill="#fff" />
      </View>

      {/* Duration badge */}
      <View style={styles.cultureDuration}>
        <Text style={styles.cultureDurationText}>{video.duration}</Text>
      </View>

      {/* Creator info */}
      <View style={styles.cultureCreatorInfo}>
        <Image source={{ uri: video.avatar }} style={styles.cultureAvatar} />
        <Text style={styles.cultureCreatorName} numberOfLines={1}>{video.creator}</Text>
      </View>

      {/* Location badge */}
      <View style={styles.cultureLocationBadge}>
        <Text style={styles.cultureLocationText}>{video.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#1a1a1a']}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{uiText.goodEvening}</Text>
            <Text style={styles.title}>{uiText.whatsTheVibe}</Text>
          </View>
          
          <RegionLanguageSelector />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Music Tile */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.featuredMusicTile, { backgroundColor: featuredMusicTile.color }]}
            onPress={() => router.push('/(tabs)/music')}
            activeOpacity={0.8}
          >
            <Image source={{ uri: featuredMusicTile.image }} style={styles.musicTileImage} />
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
              style={styles.musicTileGradient}
            >
              <View style={styles.musicTileContent}>
                <View style={styles.musicTileTextContainer}>
                  <Text style={styles.musicTileTitle}>{featuredMusicTile.title}</Text>
                </View>
                <TouchableOpacity style={styles.musicPlayButton}>
                  <Play size={28} color="#fff" fill="#fff" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Browse Categories - Start browsing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{uiText.startBrowsing}</Text>
          <View style={styles.categoriesGrid}>
            {regionCategories.map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => router.push('/(tabs)/categories')}
              >
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                  style={styles.categoryGradient}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Personalized Homepage Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{uiText.yourPersonalizedFeed}</Text>
          <View style={styles.personalizedGrid}>
            {/* Custom Playlist */}
            <TouchableOpacity 
              style={styles.personalizedColumn}
              onPress={() => router.push('/(tabs)/music')}
            >
              <View style={styles.personalizedHeader}>
                <Text style={styles.personalizedTitle}>{uiText.customPlaylist}</Text>
                <Text style={styles.personalizedSubtitle}>{uiText.yourMix}</Text>
              </View>
              <View style={styles.personalizedContent}>
                {personalizedContent.playlist.map((image, idx) => (
                  <Image 
                    key={idx}
                    source={{ uri: image }} 
                    style={styles.personalizedItemImage} 
                  />
                ))}
              </View>
            </TouchableOpacity>

            {/* Sports */}
            <TouchableOpacity 
              style={styles.personalizedColumn}
              onPress={() => router.push('/(tabs)/shop')}
            >
              <View style={styles.personalizedHeader}>
                <Text style={styles.personalizedTitle}>{uiText.sports}</Text>
                <Text style={styles.personalizedSubtitle}>{uiText.gameTime}</Text>
              </View>
              <View style={styles.personalizedContent}>
                {personalizedContent.sports.map((image, idx) => (
                  <Image 
                    key={idx}
                    source={{ uri: image }} 
                    style={styles.personalizedItemImage} 
                  />
                ))}
              </View>
            </TouchableOpacity>

            {/* Sneakers */}
            <TouchableOpacity 
              style={styles.personalizedColumn}
              onPress={() => router.push('/(tabs)/shop')}
            >
              <View style={styles.personalizedHeader}>
                <Text style={styles.personalizedTitle}>{uiText.sneakers}</Text>
                <Text style={styles.personalizedSubtitle}>{uiText.freshKicks}</Text>
              </View>
              <View style={styles.personalizedContent}>
                {personalizedContent.sneakers.map((image, idx) => (
                  <Image 
                    key={idx}
                    source={{ uri: image }} 
                    style={styles.personalizedItemImage} 
                  />
                ))}
              </View>
            </TouchableOpacity>

            {/* Cars */}
            <TouchableOpacity 
              style={styles.personalizedColumn}
              onPress={() => router.push('/(tabs)/cars')}
            >
              <View style={styles.personalizedHeader}>
                <Text style={styles.personalizedTitle}>{uiText.cars}</Text>
                <Text style={styles.personalizedSubtitle}>{uiText.luxuryRides}</Text>
              </View>
              <View style={styles.personalizedContent}>
                {personalizedContent.cars.map((image, idx) => (
                  <Image 
                    key={idx}
                    source={{ uri: image }} 
                    style={styles.personalizedItemImage} 
                  />
                ))}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Hip Hop Section */}
        <View style={styles.section}>
          <View style={styles.trendingSectionHeader}>
            <TrendingUp size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>{uiText.trendingInHipHop}</Text>
          </View>
          <Text style={styles.sectionSubtitle}>{uiText.mostViralContent} {currentGeography.name}</Text>
          
          {/* Trending Cards */}
          <View style={styles.trendingGrid}>
            {trendingContent.map((item, index) => (
              <TouchableOpacity key={index} style={styles.trendingCard}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.trendingImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                  style={styles.trendingGradient}
                />
                <View style={styles.trendingBadge}>
                  <TrendingUp size={14} color="#fff" />
                  <Text style={styles.trendingBadgeText}>#{index + 1} Trending</Text>
                </View>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingLocation}>🌍 {item.location}</Text>
                  <Text style={styles.trendingTitle}>{item.title}</Text>
                  <Text style={styles.trendingStats}>{item.stats}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

                 {/* Region Info */}
         <View style={styles.section}>
           <View style={styles.regionInfo}>
             <Text style={styles.regionInfoTitle}>🌍 {uiText.exploring} {currentGeography.name}</Text>
             <Text style={styles.regionInfoText}>
               {currentGeography.description}. {uiText.regionDescription} {currentGeography.name} {uiText.musicScene}
             </Text>
           </View>
         </View>
      </ScrollView>

      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '85%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  countryList: {
    maxHeight: 400,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedCountryItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  countryDetails: {
    marginLeft: 12,
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  countryCurrency: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  // Spotify-style browse tiles
  browseTilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  browseTile: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  browseTileBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  browseTileGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  browseTileContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    justifyContent: 'flex-end',
  },
  browseTileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  featuredImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  featuredInfo: {
    flex: 1,
    marginLeft: 12,
  },
  featuredTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  featuredArtist: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  featuredProduct: {
    flexDirection: 'row',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  featuredProductText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  featuredPrice: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  featuredPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cultureVideosCarousel: {
    marginBottom: 20,
  },
  cultureCard: {
    width: 110,
    height: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeCultureCard: {
    borderColor: '#8B5CF6',
    transform: [{ scale: 1.05 }],
  },
  cultureThumbnail: {
    width: '100%',
    height: '100%',
  },
  cultureOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cultureDuration: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cultureDurationText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
  },
  cultureCreatorInfo: {
    position: 'absolute',
    bottom: 24,
    left: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cultureAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  cultureCreatorName: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
  cultureLocationBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  cultureLocationText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeCultureVideoContainer: {
    width: '100%',
    height: height * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  activeCultureVideoImage: {
    width: '100%',
    height: '100%',
  },
  cultureVideoControlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  culturePlayButtonLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cultureMuteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cultureVideoInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  cultureVideoHeader: {
    marginBottom: 12,
  },
  cultureCreatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeCultureVideoAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  cultureCreatorDetails: {
    flex: 1,
  },
  activeCultureVideoCreator: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  cultureVideoTitle: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 2,
  },
  cultureVideoLocation: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 2,
  },
  cultureVideoContent: {
    marginBottom: 16,
  },
  cultureVideoDescription: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  cultureVideoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cultureVideoViews: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  cultureProgressContainer: {
    position: 'absolute',
    top: 12,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 4,
  },
  cultureProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  activeCultureProgressBar: {
    backgroundColor: '#8B5CF6',
  },
  recentCard: {
    width: 140,
    marginRight: 16,
  },
  recentImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  recentArtist: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    fontWeight: '500',
  },
  regionInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  regionInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  regionInfoText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  // Featured Music Tile Styles
  featuredMusicTile: {
    height: 360,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  musicTileImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  musicTileGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  musicTileContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  musicTileTextContainer: {
    flex: 1,
  },
  musicTileTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  musicTileSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  musicPlayButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 2,
  },
     categoryImage: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     width: '100%',
     height: '100%',
     resizeMode: 'cover',
     opacity: 0.9,
   },
   categoryGradient: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     height: '60%',
   },
   cultureCarousel: {
     marginBottom: 20,
   },
   personalizedGrid: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     gap: 10,
   },
   personalizedColumn: {
     flex: 1,
     backgroundColor: '#2a2a2a',
     borderRadius: 12,
     padding: 10,
     borderWidth: 1,
     borderColor: '#444',
   },
   personalizedHeader: {
     marginBottom: 10,
   },
   personalizedTitle: {
     fontSize: 14,
     fontWeight: 'bold',
     color: '#fff',
     marginBottom: 2,
   },
   personalizedSubtitle: {
     fontSize: 11,
     color: '#999',
   },
   personalizedContent: {
     gap: 6,
   },
   personalizedItemImage: {
     width: '100%',
     height: 80,
     borderRadius: 8,
     marginBottom: 4,
   },
   trendingSectionHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 8,
     marginBottom: 4,
   },
   trendingGrid: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     gap: 12,
   },
   trendingCard: {
     width: '48%',
     height: 220,
     borderRadius: 16,
     overflow: 'hidden',
     position: 'relative',
     backgroundColor: '#2a2a2a',
     borderWidth: 1,
     borderColor: '#444',
   },
   trendingImage: {
     width: '100%',
     height: '100%',
     resizeMode: 'cover',
   },
   trendingGradient: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     height: '70%',
     justifyContent: 'flex-end',
     padding: 12,
   },
   trendingBadge: {
     position: 'absolute',
     top: 10,
     left: 10,
     flexDirection: 'row',
     alignItems: 'center',
     gap: 4,
     backgroundColor: 'rgba(245, 158, 11, 0.9)',
     paddingHorizontal: 8,
     paddingVertical: 4,
     borderRadius: 12,
   },
   trendingBadgeText: {
     fontSize: 10,
     fontWeight: 'bold',
     color: '#fff',
   },
   trendingInfo: {
     position: 'absolute',
     bottom: 12,
     left: 12,
     right: 12,
   },
   trendingLocation: {
     fontSize: 11,
     color: '#F59E0B',
     fontWeight: '600',
     marginBottom: 4,
   },
   trendingTitle: {
     fontSize: 15,
     fontWeight: 'bold',
     color: '#fff',
     marginBottom: 4,
   },
   trendingStats: {
     fontSize: 11,
     color: '#999',
   },
 });