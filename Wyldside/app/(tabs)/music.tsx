import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, TextInput } from 'react-native';
import { Play, Shuffle, MoveVertical as MoreVertical, Video, Music as MusicIcon, X, Heart, Download, Plus, Pause, SkipBack, SkipForward, Volume2, VolumeX, ShoppingBag, Star, Tag, Bell, Cast, Search, Filter, Globe, ChevronDown, Check, MessageCircle, Send, Brain } from 'lucide-react-native';
import { useState } from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';
import { RegionLanguageSelector } from '@/components/RegionLanguageSelector';
import { useRegion } from '@/hooks/useRegionContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MusicScreen() {
  const { selectedGeography, currentGeography, getUIText } = useRegion();
  const [activeTab, setActiveTab] = useState<'music' | 'videos'>('music');
  const [showAd, setShowAd] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0.3); // 30% progress for demo
  const [activeVideoFilter, setActiveVideoFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const uiText = getUIText();

  // YouTube-style video filters
  const videoFilters = [
    'All', 'Music', 'Hip Hop', 'Rap', 'R&B', 'Trap', 'New to you', 'Recently uploaded', 'Watched'
  ];

  // Spotify-style category tiles with translated titles
  const categoryTiles = [
    {
      id: 1,
      title: uiText.hipHopCentral,
      color: '#E91E63',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    },
    {
      id: 2,
      title: 'R&B Vibes',
      color: '#2E7D32',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    },
    {
      id: 3,
      title: 'Trap Nation',
      color: '#1565C0',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
    },
    {
      id: 4,
      title: 'Chill Beats',
      color: '#7B1FA2',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    },
    {
      id: 5,
      title: 'Workout Mix',
      color: '#F57C00',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    },
    {
      id: 6,
      title: 'Late Night',
      color: '#5E35B1',
      image: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg',
    },
  ];

  const playlists = [
    {
      id: 1,
      name: "Today's Top Hits",
      description: "The biggest songs right now",
      tracks: 50,
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      isOfficial: true,
    },
    {
      id: 2,
      name: "RapCaviar",
      description: "New music from hip-hop's biggest stars",
      tracks: 65,
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      isOfficial: true,
    },
    {
      id: 3,
      name: "Beast Mode",
      description: "Aggressive rap for your workouts",
      tracks: 45,
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      isOfficial: true,
    },
    {
      id: 4,
      name: "Chill Hip-Hop",
      description: "Laid back beats and smooth flows",
      tracks: 38,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      isOfficial: true,
    },
  ];

  const recentlyPlayed = [
    {
      id: 1,
      name: "Tha Carter IV",
      artist: "Lil Wayne",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      type: "Album",
    },
    {
      id: 2,
      name: "Scorpion",
      artist: "Drake",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      type: "Album",
    },
    {
      id: 3,
      name: "Views",
      artist: "Drake",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      type: "Album",
    },
    {
      id: 4,
      name: "Hip Hop Central",
      artist: "Spotify",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      type: "Playlist",
    },
    {
      id: 5,
      name: "ASTROWORLD",
      artist: "Travis Scott",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      type: "Album",
    },
  ];

  const topTracks = [
    {
      id: 1,
      title: "God's Plan",
      artist: "Drake",
      duration: "3:18",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      isExplicit: true,
      isLiked: true,
    },
    {
      id: 2,
      title: "SICKO MODE",
      artist: "Travis Scott",
      duration: "5:12",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      isExplicit: true,
      isLiked: false,
    },
    {
      id: 3,
      title: "Money Trees",
      artist: "Kendrick Lamar",
      duration: "6:26",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      isExplicit: true,
      isLiked: true,
    },
    {
      id: 4,
      title: "Life Is Good",
      artist: "Future ft. Drake",
      duration: "4:17",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      isExplicit: true,
      isLiked: false,
    },
    {
      id: 5,
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      duration: "2:57",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      isExplicit: true,
      isLiked: true,
    },
  ];

  const musicVideos = [
    {
      id: 1,
      title: "God's Plan",
      artist: "Drake",
      channel: "DrakeVEVO",
      duration: "5:03",
      views: "1.2B",
      uploadTime: "5 years ago",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      videoUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      isNew: false,
      isVerified: true,
      taggedItems: [
        {
          id: 1,
          name: "Air Jordan 1 Retro High",
          brand: "Nike",
          price: "$170",
          originalPrice: "$200",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          rating: 4.8,
          category: "Sneakers",
          timeTag: "0:45",
          description: "Classic basketball shoe with premium leather upper",
          aiAnalysis: "Confident, bold style - perfect for streetwear enthusiasts"
        },
        {
          id: 2,
          name: "OVO Hoodie",
          brand: "October's Very Own",
          price: "$150",
          originalPrice: "$180",
          image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          rating: 4.6,
          category: "Apparel",
          timeTag: "1:23",
          description: "Premium cotton hoodie with embroidered OVO owl logo",
          aiAnalysis: "Luxury streetwear - matches Drake's sophisticated aesthetic"
        },
        {
          id: 3,
          name: "Gold Chain Necklace",
          brand: "Custom Jewelry",
          price: "$2,500",
          originalPrice: "$3,000",
          image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
          rating: 4.9,
          category: "Jewelry",
          timeTag: "2:10",
          description: "18k gold Cuban link chain, 20 inches",
          aiAnalysis: "Status symbol - reflects success and confidence"
        },
        {
          id: 4,
          name: "Designer Sunglasses",
          brand: "Ray-Ban",
          price: "$320",
          originalPrice: "$400",
          image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          rating: 4.7,
          category: "Accessories",
          timeTag: "3:15",
          description: "Classic aviator style with polarized lenses",
          aiAnalysis: "Timeless accessory - adds mystery and cool factor"
        },
        {
          id: 5,
          name: "Premium Denim Jacket",
          brand: "Levi's",
          price: "$120",
          originalPrice: "$150",
          image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          rating: 4.5,
          category: "Apparel",
          timeTag: "4:20",
          description: "Classic denim jacket with premium wash",
          aiAnalysis: "Versatile layering piece - perfect for any season"
        },
        {
          id: 6,
          name: "Wireless Earbuds",
          brand: "Apple",
          price: "$249",
          originalPrice: "$279",
          image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg",
          rating: 4.9,
          category: "Electronics",
          timeTag: "5:00",
          description: "AirPods Pro with active noise cancellation",
          aiAnalysis: "Essential for music lovers - matches the audio theme"
        }
      ]
    },
    {
      id: 2,
      title: "HUMBLE.",
      artist: "Kendrick Lamar",
      channel: "KendrickLamarVEVO",
      duration: "2:57",
      views: "890M",
      uploadTime: "6 years ago",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      videoUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      isNew: false,
      isVerified: true,
      taggedItems: [
        {
          id: 5,
          name: "Nike Air Force 1",
          brand: "Nike",
          price: "$90",
          originalPrice: "$110",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          rating: 4.9,
          category: "Sneakers",
          timeTag: "1:15",
          description: "Iconic basketball shoe with leather upper",
          aiAnalysis: "Humble yet powerful - reflects Kendrick's message"
        },
        {
          id: 6,
          name: "Black Tracksuit",
          brand: "Adidas",
          price: "$120",
          originalPrice: "$150",
          image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          rating: 4.5,
          category: "Apparel",
          timeTag: "0:30",
          description: "Classic three-stripe tracksuit in black",
          aiAnalysis: "Athletic comfort - perfect for active lifestyle"
        },
        {
          id: 7,
          name: "Baseball Cap",
          brand: "New Era",
          price: "$35",
          originalPrice: "$45",
          image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          rating: 4.3,
          category: "Accessories",
          timeTag: "2:00",
          description: "Classic fitted cap with embroidered logo",
          aiAnalysis: "Street culture essential - adds authenticity"
        },
        {
          id: 8,
          name: "Gold Watch",
          brand: "Rolex",
          price: "$12,000",
          originalPrice: "$15,000",
          image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
          rating: 4.8,
          category: "Watches",
          timeTag: "2:30",
          description: "Luxury timepiece with diamond accents",
          aiAnalysis: "Success symbol - represents achievement and status"
        }
      ]
    },
    {
      id: 3,
      title: "Sicko Mode",
      artist: "Travis Scott",
      channel: "TravisScottXX",
      duration: "5:12",
      views: "756M",
      uploadTime: "5 years ago",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      videoUrl: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      isNew: false,
      isVerified: true,
      taggedItems: [
        {
          id: 7,
          name: "Cactus Jack Hoodie",
          brand: "Travis Scott",
          price: "$200",
          originalPrice: "$250",
          image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          rating: 4.8,
          category: "Apparel",
          timeTag: "2:45",
          description: "Limited edition Cactus Jack merchandise"
        },
        {
          id: 8,
          name: "Jordan 4 Travis Scott",
          brand: "Nike x Travis Scott",
          price: "$1,800",
          originalPrice: "$190",
          image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          rating: 5.0,
          category: "Sneakers",
          timeTag: "4:20",
          description: "Exclusive collaboration with reverse swoosh"
        }
      ]
    },
    {
      id: 4,
      title: "Money Trees",
      artist: "Kendrick Lamar",
      channel: "KendrickLamarVEVO",
      duration: "6:26",
      views: "445M",
      uploadTime: "11 years ago",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      videoUrl: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      isNew: false,
      isVerified: true,
      taggedItems: [
        {
          id: 9,
          name: "Vintage Snapback",
          brand: "New Era",
          price: "$35",
          originalPrice: "$45",
          image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          rating: 4.4,
          category: "Accessories",
          timeTag: "1:30",
          description: "Classic fitted cap with embroidered logo"
        }
      ]
    },
    {
      id: 5,
      title: "Life Is Good",
      artist: "Future ft. Drake",
      channel: "FutureVEVO",
      duration: "4:17",
      views: "234M",
      uploadTime: "4 years ago",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      videoUrl: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      isNew: true,
      isVerified: true,
      taggedItems: [
        {
          id: 10,
          name: "Designer Watch",
          brand: "Rolex",
          price: "$15,000",
          originalPrice: "$18,000",
          image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
          rating: 4.9,
          category: "Watches",
          timeTag: "2:15",
          description: "Luxury timepiece with diamond accents"
        }
      ]
    },
    {
      id: 6,
      title: "First Class",
      artist: "Jack Harlow",
      channel: "JackHarlowVEVO",
      duration: "2:54",
      views: "189M",
      uploadTime: "2 years ago",
      image: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
      videoUrl: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
      isNew: true,
      isVerified: true,
      taggedItems: [
        {
          id: 11,
          name: "Louis Vuitton Bag",
          brand: "Louis Vuitton",
          price: "$2,800",
          originalPrice: "$3,200",
          image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          rating: 4.8,
          category: "Accessories",
          timeTag: "1:45",
          description: "Premium leather handbag with signature monogram"
        }
      ]
    }
  ];

  const renderNFLJerseyAd = () => (
    <View style={styles.adContainer}>
      <TouchableOpacity 
        style={styles.adCloseButton}
        onPress={() => setShowAd(false)}
      >
        <X size={20} color="#fff" />
      </TouchableOpacity>
      
      <LinearGradient
        colors={['#FF6B35', '#F7931E']}
        style={styles.adGradient}
      >
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>Advertisement</Text>
        </View>
        
        <View style={styles.adHeader}>
          <Text style={styles.adTitle}>EXCLUSIVE NFL DROP</Text>
          <Text style={styles.adSubtitle}>FOR A LIMITED TIME</Text>
        </View>

        <View style={styles.adContent}>
          <View style={styles.adTextSection}>
            <Text style={styles.adMainText}>RETRO JERSEY</Text>
            <Text style={styles.adMainText}>COLLECTION</Text>
            <Text style={styles.adDescription}>
              Authentic throwback jerseys from legendary NFL teams. 
              Limited edition designs you won't find anywhere else.
            </Text>
            <View style={styles.adPriceSection}>
              <Text style={styles.adPrice}>Starting at $89</Text>
              <Text style={styles.adOriginalPrice}>$129</Text>
            </View>
          </View>
          
          <View style={styles.adImageSection}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg' }} 
              style={styles.adJerseyImage}
            />
            <View style={styles.adLogoContainer}>
              <Text style={styles.adLogo}>fanatics</Text>
              <Text style={styles.adNFLLogo}>NFL</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.adShopButton}>
          <Text style={styles.adShopButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderVideoPlayer = () => {
    if (!selectedVideo) return null;

    return (
      <Modal
        visible={!!selectedVideo}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setSelectedVideo(null)}
      >
        <ScrollView style={styles.videoPlayerContainer} showsVerticalScrollIndicator={false}>
          {/* Video Player */}
          <View style={styles.videoPlayerWrapper}>
            <Image 
              source={{ uri: selectedVideo.videoUrl }} 
              style={styles.fullscreenVideo}
            />
            
            {/* Video Controls Overlay */}
            <View style={styles.videoControlsOverlay}>
              <TouchableOpacity 
                style={styles.closeVideoButton}
                onPress={() => setSelectedVideo(null)}
              >
                <X size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.muteButton}
                onPress={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX size={24} color="#fff" />
                ) : (
                  <Volume2 size={24} color="#fff" />
                )}
              </TouchableOpacity>

              <View style={styles.centerControls}>
                <TouchableOpacity style={styles.skipButton}>
                  <SkipBack size={32} color="#fff" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.playPauseButton}
                  onPress={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? (
                    <Pause size={40} color="#fff" fill="#fff" />
                  ) : (
                    <Play size={40} color="#fff" fill="#fff" />
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.skipButton}>
                  <SkipForward size={32} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${videoProgress * 100}%` }]} />
                </View>
                <Text style={styles.timeText}>
                  {Math.floor(videoProgress * 5 * 60)}:{Math.floor((videoProgress * 5 * 60 % 1) * 60).toString().padStart(2, '0')} / {selectedVideo.duration}
                </Text>
              </View>

              {/* Video Info */}
              <View style={styles.videoInfoOverlay}>
                <Text style={styles.videoPlayerTitle}>{selectedVideo.title}</Text>
                <Text style={styles.videoPlayerArtist}>{selectedVideo.artist}</Text>
                <Text style={styles.videoPlayerViews}>{selectedVideo.views} views</Text>
              </View>
            </View>
          </View>

          {/* AI Analysis Section */}
          <View style={styles.aiAnalysisSection}>
            <View style={styles.aiAnalysisHeader}>
              <Brain size={20} color="#1DB954" />
              <Text style={styles.aiAnalysisTitle}>AI Style Analysis</Text>
            </View>
            <View style={styles.aiAnalysisContent}>
              <View style={styles.aiAnalysisCard}>
                <Text style={styles.aiAnalysisLabel}>Mood Detected:</Text>
                <Text style={styles.aiAnalysisValue}>Confident & Sophisticated</Text>
              </View>
              <View style={styles.aiAnalysisCard}>
                <Text style={styles.aiAnalysisLabel}>Style Category:</Text>
                <Text style={styles.aiAnalysisValue}>Luxury Streetwear</Text>
              </View>
              <View style={styles.aiAnalysisCard}>
                <Text style={styles.aiAnalysisLabel}>AI Recommendations:</Text>
                <Text style={styles.aiAnalysisValue}>Based on your style preferences</Text>
              </View>
            </View>
          </View>

          {/* Tagged Items Section */}
          <View style={styles.taggedItemsSection}>
            <View style={styles.taggedItemsHeader}>
              <Tag size={20} color="#1DB954" />
              <Text style={styles.taggedItemsTitle}>AI-Curated Featured Items</Text>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.taggedItemsScroll}
            >
              {selectedVideo.taggedItems?.map((item: any) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.taggedItemCard}
                  onPress={() => {
                    setSelectedItem(item);
                    setShowCheckout(true);
                  }}
                >
                  <View style={styles.taggedItemImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.taggedItemImage} />
                    <View style={styles.timeTagBadge}>
                      <Text style={styles.timeTagText}>{item.timeTag}</Text>
                    </View>
                    <View style={styles.aiRecommendationBadge}>
                      <Brain size={10} color="#fff" />
                      <Text style={styles.aiRecommendationText}>AI PICK</Text>
                    </View>
                  </View>
                  
                  <View style={styles.taggedItemInfo}>
                    <Text style={styles.taggedItemBrand}>{item.brand}</Text>
                    <Text style={styles.taggedItemName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.taggedItemDescription} numberOfLines={2}>{item.description}</Text>
                    
                    <View style={styles.aiAnalysisItem}>
                      <Text style={styles.aiAnalysisItemText}>{item.aiAnalysis}</Text>
                    </View>
                    
                    <View style={styles.taggedItemRating}>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <Text style={styles.categoryText}>• {item.category}</Text>
                    </View>
                    
                    <View style={styles.taggedItemPricing}>
                      <Text style={styles.taggedItemPrice}>{item.price}</Text>
                      {item.originalPrice !== item.price && (
                        <Text style={styles.taggedItemOriginalPrice}>{item.originalPrice}</Text>
                      )}
                    </View>
                    
                    <TouchableOpacity style={styles.shopItemButton}>
                      <ShoppingBag size={16} color="#fff" />
                      <Text style={styles.shopItemButtonText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Shop All Button */}
            <TouchableOpacity style={styles.shopAllButton}>
              <Text style={styles.shopAllButtonText}>Shop All AI-Recommended Items</Text>
              <ShoppingBag size={20} color="#1DB954" />
            </TouchableOpacity>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <View style={styles.commentsHeader}>
              <MessageCircle size={20} color="#1DB954" />
              <Text style={styles.commentsTitle}>Comments & Reactions</Text>
            </View>
            
            <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
              <View style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>JD</Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>John Doe</Text>
                    <Text style={styles.commentTime}>2 hours ago</Text>
                  </View>
                  <Text style={styles.commentText}>This song is fire! 🔥 The AI recommendations are spot on too.</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                      <Heart size={14} color="#666" />
                      <Text style={styles.commentActionText}>24</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentAction}>
                      <MessageCircle size={14} color="#666" />
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>SM</Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>Sarah Music</Text>
                    <Text style={styles.commentTime}>5 hours ago</Text>
                  </View>
                  <Text style={styles.commentText}>Love how the AI analyzes the mood and suggests matching styles! 🎯</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                      <Heart size={14} color="#666" />
                      <Text style={styles.commentActionText}>18</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentAction}>
                      <MessageCircle size={14} color="#666" />
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>FS</Text>
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>Fashion Sense</Text>
                    <Text style={styles.commentTime}>1 day ago</Text>
                  </View>
                  <Text style={styles.commentText}>The style matching is incredible! Bought the OVO hoodie and it's perfect 👌</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity style={styles.commentAction}>
                      <Heart size={14} color="#666" />
                      <Text style={styles.commentActionText}>32</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentAction}>
                      <MessageCircle size={14} color="#666" />
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Add Comment */}
            <View style={styles.addCommentSection}>
              <View style={styles.commentInputContainer}>
                <TextInput 
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  placeholderTextColor="#666"
                  multiline
                />
                <TouchableOpacity style={styles.commentSendButton}>
                  <Send size={20} color="#1DB954" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  // Region modal removed - now using global RegionLanguageSelector component

  const renderMusicContent = () => (
    <>
      {/* Browse Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{uiText.browseCategories}</Text>
        <View style={styles.categoryGrid}>
          {categoryTiles.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryTile, { backgroundColor: category.color }]}
            >
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* NFL Jersey Ad */}
      {showAd && renderNFLJerseyAd()}

      {/* Recently Played */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{uiText.recentlyPlayed}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentlyPlayed.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recentCard}>
              <Image source={{ uri: item.image }} style={styles.recentImage} />
              <Text style={styles.recentName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.recentArtist}>{item.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Made for You */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{uiText.madeForYou}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {playlists.map((playlist) => (
            <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
              <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
              <Text style={styles.playlistName} numberOfLines={2}>{playlist.name}</Text>
              <Text style={styles.playlistDescription} numberOfLines={2}>{playlist.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Your Top Songs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your top songs</Text>
        {topTracks.map((track, index) => (
          <TouchableOpacity key={track.id} style={styles.trackItem}>
            <Text style={styles.trackNumber}>{index + 1}</Text>
            <Image source={{ uri: track.image }} style={styles.trackImage} />
            <View style={styles.trackInfo}>
              <View style={styles.trackTitleRow}>
                <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
                {track.isExplicit && (
                  <View style={styles.explicitBadge}>
                    <Text style={styles.explicitText}>E</Text>
                  </View>
                )}
              </View>
              <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
            </View>
            <TouchableOpacity style={styles.likeButton}>
              <Heart 
                size={20} 
                color={track.isLiked ? "#1DB954" : "#999"} 
                fill={track.isLiked ? "#1DB954" : "none"}
              />
            </TouchableOpacity>
            <Text style={styles.trackDuration}>{track.duration}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={20} color="#999" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderVideosHeader = () => (
    <View style={styles.videosHeader}>
      <Text style={styles.videosTitle}>Videos</Text>
      <View style={styles.videosHeaderActions}>
        <TouchableOpacity style={styles.videosHeaderButton}>
          <Cast size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.videosHeaderButton}>
          <Bell size={24} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>9+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.videosHeaderButton}>
          <Search size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVideoFilters = () => (
    <View style={styles.videoFiltersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoFiltersScroll}>
        {videoFilters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.videoFilterButton,
              activeVideoFilter === filter && styles.activeVideoFilterButton
            ]}
            onPress={() => setActiveVideoFilter(filter)}
          >
            <Text style={[
              styles.videoFilterText,
              activeVideoFilter === filter && styles.activeVideoFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderYouTubeSidebar = () => (
    <View style={styles.youtubeSidebar}>
      {/* Wyldseed Logo and Menu */}
      <View style={styles.youtubeSidebarHeader}>
        <View style={styles.youtubeLogoContainer}>
          <Text style={styles.youtubeLogo}>Wyldseed</Text>
        </View>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(!sidebarVisible)}
        >
          <MoreVertical size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* AI Discovery */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>AI Discovery</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎯</Text>
          </View>
          <Text style={styles.sidebarText}>Smart Recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🔍</Text>
          </View>
          <Text style={styles.sidebarText}>AI Music Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎨</Text>
          </View>
          <Text style={styles.sidebarText}>Style Matching</Text>
        </TouchableOpacity>
      </View>

      {/* Fashion & Shopping */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Fashion & Shopping</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>👕</Text>
          </View>
          <Text style={styles.sidebarText}>Shop Looks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🛍️</Text>
          </View>
          <Text style={styles.sidebarText}>Trending Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>💎</Text>
          </View>
          <Text style={styles.sidebarText}>Luxury Finds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎭</Text>
          </View>
          <Text style={styles.sidebarText}>Artist Merch</Text>
        </TouchableOpacity>
      </View>

      {/* Music Categories */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Music Categories</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🔥</Text>
          </View>
          <Text style={styles.sidebarText}>Trending Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎤</Text>
          </View>
          <Text style={styles.sidebarText}>Hip Hop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎵</Text>
          </View>
          <Text style={styles.sidebarText}>R&B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎧</Text>
          </View>
          <Text style={styles.sidebarText}>Trap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>🎶</Text>
          </View>
          <Text style={styles.sidebarText}>New Releases</Text>
        </TouchableOpacity>
      </View>

      {/* Social & Sharing */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Social & Sharing</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>📱</Text>
          </View>
          <Text style={styles.sidebarText}>Post to Social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>👥</Text>
          </View>
          <Text style={styles.sidebarText}>Share with Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>📸</Text>
          </View>
          <Text style={styles.sidebarText}>Create Stories</Text>
        </TouchableOpacity>
      </View>

      {/* Your Library */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSectionTitle}>Your Library</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>❤️</Text>
          </View>
          <Text style={styles.sidebarText}>Liked Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>📋</Text>
          </View>
          <Text style={styles.sidebarText}>Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>⏰</Text>
          </View>
          <Text style={styles.sidebarText}>Watch Later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem}>
          <View style={styles.sidebarIconContainer}>
            <Text style={styles.sidebarIcon}>📊</Text>
          </View>
          <Text style={styles.sidebarText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVideoContent = () => (
    <View style={styles.youtubeLayout}>
      <View style={[styles.youtubeSidebarContainer, sidebarVisible && styles.youtubeSidebarVisible]}>
        {renderYouTubeSidebar()}
      </View>
      {sidebarVisible && (
        <TouchableOpacity 
          style={styles.sidebarOverlay}
          onPress={() => setSidebarVisible(false)}
          activeOpacity={1}
        />
      )}
      <View style={[styles.youtubeMainContent, !sidebarVisible && styles.youtubeMainContentExpanded, { margin: 0, padding: 0 }]}>
        <View style={styles.youtubeMainHeader}>
          <TouchableOpacity 
            style={styles.sidebarToggleButton}
            onPress={() => setSidebarVisible(!sidebarVisible)}
          >
            <MoreVertical size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.youtubeMainTitle}>Videos</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={{ marginHorizontal: 0, paddingHorizontal: 0 }}>
          {renderVideoFilters()}
        </View>
        
        <View style={[styles.youtubeVideosList, { marginHorizontal: 0, paddingHorizontal: 0 }]}>
          {musicVideos.map((video) => (
            <TouchableOpacity 
              key={video.id} 
              style={[styles.youtubeVideoItem, { paddingHorizontal: 0 }]}
              onPress={() => setSelectedVideo(video)}
            >
              <View style={styles.youtubeVideoThumbnailContainer}>
                <Image source={{ uri: video.image }} style={styles.youtubeVideoThumbnail} />
                <View style={styles.youtubePlayOverlay}>
                  <Play size={20} color="#fff" fill="#fff" />
                </View>
                <View style={styles.youtubeVideoDuration}>
                  <Text style={styles.youtubeVideoDurationText}>{video.duration}</Text>
                </View>
                {video.isNew && (
                  <View style={styles.youtubeNewBadge}>
                    <Text style={styles.youtubeNewBadgeText}>NEW</Text>
                  </View>
                )}
                {video.taggedItems && video.taggedItems.length > 0 && (
                  <View style={styles.youtubeShoppableBadge}>
                    <ShoppingBag size={10} color="#fff" />
                    <Text style={styles.youtubeShoppableBadgeText}>SHOP</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.youtubeVideoContent}>
                <View style={styles.youtubeVideoInfo}>
                  <Text style={styles.youtubeVideoTitle} numberOfLines={2}>{video.title}</Text>
                  <View style={styles.youtubeVideoMeta}>
                    <View style={styles.youtubeChannelInfo}>
                      <Text style={styles.youtubeChannelName}>{video.channel}</Text>
                      {video.isVerified && (
                        <View style={styles.youtubeVerifiedBadge}>
                          <Text style={styles.youtubeVerifiedIcon}>✓</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.youtubeVideoStats}>
                      {video.views} views • {video.uploadTime}
                    </Text>
                                      {video.taggedItems && (
                    <Text style={styles.youtubeTaggedItemsCount}>
                      🛍️ {video.taggedItems.length} items featured
                    </Text>
                  )}
                  <View style={styles.aiFeaturesContainer}>
                    <View style={styles.aiFeatureBadge}>
                      <Text style={styles.aiFeatureIcon}>🤖</Text>
                      <Text style={styles.aiFeatureText}>AI Style Match</Text>
                    </View>
                    <View style={styles.aiFeatureBadge}>
                      <Text style={styles.aiFeatureIcon}>🎯</Text>
                      <Text style={styles.aiFeatureText}>Smart Shop</Text>
                    </View>
                    <View style={styles.aiFeatureBadge}>
                      <Text style={styles.aiFeatureIcon}>📱</Text>
                      <Text style={styles.aiFeatureText}>Share Ready</Text>
                    </View>
                  </View>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.youtubeMoreButton}>
                  <MoreVertical size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCheckoutModal = () => {
    if (!selectedItem) return null;

    const reviews = [
      { id: 1, user: "Alex M.", rating: 5, comment: "Perfect fit and amazing quality! The AI recommendation was spot on.", date: "2 days ago" },
      { id: 2, user: "Sarah K.", rating: 5, comment: "Love this item! Matches my style perfectly. Great purchase.", date: "1 week ago" },
      { id: 3, user: "Mike R.", rating: 4, comment: "High quality product. The AI really knows my style!", date: "2 weeks ago" },
      { id: 4, user: "Emma L.", rating: 5, comment: "Exceeded my expectations. Will definitely buy more AI-recommended items.", date: "3 weeks ago" },
    ];

    const exclusiveDrops = [
      { id: 1, name: "Limited Edition Colorway", discount: "20% OFF", originalPrice: "$200", newPrice: "$160" },
      { id: 2, name: "Bundle Deal", discount: "Buy 2 Save 15%", originalPrice: "$300", newPrice: "$255" },
      { id: 3, name: "Early Access", discount: "VIP Members Only", originalPrice: "$180", newPrice: "$150" },
    ];

    return (
      <Modal
        visible={showCheckout}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setShowCheckout(false)}
      >
        <ScrollView style={styles.checkoutContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.checkoutHeader}>
            <TouchableOpacity 
              style={styles.closeCheckoutButton}
              onPress={() => setShowCheckout(false)}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.checkoutTitle}>Product Details</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Product Image */}
          <View style={styles.productImageContainer}>
            <Image source={{ uri: selectedItem.image }} style={styles.productImage} />
            <View style={styles.aiRecommendationBadge}>
              <Brain size={12} color="#fff" />
              <Text style={styles.aiRecommendationText}>AI RECOMMENDED</Text>
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.productInfoSection}>
            <Text style={styles.productBrand}>{selectedItem.brand}</Text>
            <Text style={styles.productName}>{selectedItem.name}</Text>
            <Text style={styles.productDescription}>{selectedItem.description}</Text>
            
            <View style={styles.aiAnalysisItem}>
              <Text style={styles.aiAnalysisItemText}>{selectedItem.aiAnalysis}</Text>
            </View>

            <View style={styles.productRating}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{selectedItem.rating}</Text>
              <Text style={styles.categoryText}>• {selectedItem.category}</Text>
            </View>

            <View style={styles.purchaseStats}>
              <Text style={styles.purchaseStatsText}>🔥 {Math.floor(Math.random() * 500) + 100} people bought this today</Text>
              <Text style={styles.purchaseStatsText}>⭐ {Math.floor(Math.random() * 1000) + 500} verified purchases</Text>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.pricingSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>{selectedItem.price}</Text>
              {selectedItem.originalPrice !== selectedItem.price && (
                <Text style={styles.originalPrice}>{selectedItem.originalPrice}</Text>
              )}
              {selectedItem.originalPrice !== selectedItem.price && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((parseInt(selectedItem.originalPrice.replace('$', '')) - parseInt(selectedItem.price.replace('$', ''))) / parseInt(selectedItem.originalPrice.replace('$', ''))) * 100)}% OFF
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Exclusive Drops */}
          <View style={styles.exclusiveSection}>
            <Text style={styles.exclusiveTitle}>🎯 Exclusive Drops</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {exclusiveDrops.map((drop) => (
                <View key={drop.id} style={styles.exclusiveCard}>
                  <Text style={styles.exclusiveName}>{drop.name}</Text>
                  <Text style={styles.exclusiveDiscount}>{drop.discount}</Text>
                  <View style={styles.exclusivePricing}>
                    <Text style={styles.exclusiveNewPrice}>{drop.newPrice}</Text>
                    <Text style={styles.exclusiveOriginalPrice}>{drop.originalPrice}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.reviewsTitle}>Customer Reviews</Text>
              <Text style={styles.reviewsCount}>({reviews.length})</Text>
            </View>
            
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={12} 
                        color={star <= review.rating ? "#F59E0B" : "#666"} 
                        fill={star <= review.rating ? "#F59E0B" : "none"}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.checkoutActions}>
            <TouchableOpacity style={styles.addToCartButton}>
              <ShoppingBag size={20} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.giftButton}>
              <Heart size={20} color="#1DB954" />
              <Text style={styles.giftText}>Gift to Someone</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {activeTab === 'videos' ? null : (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{uiText.goodEvening}</Text>
            <Text style={styles.subtitle}>{uiText.discoverMusic} {currentGeography.name}</Text>
          </View>
          <View style={styles.headerActions}>
            <RegionLanguageSelector />
            <TouchableOpacity style={styles.headerButton}>
              <Download size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'music' && styles.activeTab]}
          onPress={() => setActiveTab('music')}
        >
          <MusicIcon size={20} color={activeTab === 'music' ? '#1DB954' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'music' && styles.activeTabText]}>
            Music
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Video size={20} color={activeTab === 'videos' ? '#FF0000' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={activeTab === 'videos' ? { flex: 1, paddingHorizontal: 0 } : styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'music' ? renderMusicContent() : renderVideoContent()}
      </ScrollView>

      {renderVideoPlayer()}
      {renderCheckoutModal()}
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  regionFlag: {
    fontSize: 14,
  },
  regionCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  headerButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#282828',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#121212',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#1DB954',
  },
  content: {
    flex: 1,
    paddingHorizontal: width < 768 ? 20 : 0,
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
  // Videos Header (without YouTube logo)
  videosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#0F0F0F',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 0,
  },
  videosTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  videosHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  videosHeaderButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  // Video Filters
  videoFiltersContainer: {
    marginBottom: 16,
    backgroundColor: '#0F0F0F',
    marginHorizontal: -20,
    paddingHorizontal: width < 768 ? 20 : 0,
  },
  videoFiltersScroll: {
    paddingVertical: 8,
  },
  videoFilterButton: {
    backgroundColor: '#272727',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3F3F3F',
  },
  activeVideoFilterButton: {
    backgroundColor: '#fff',
  },
  videoFilterText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  activeVideoFilterText: {
    color: '#000',
  },
  // YouTube Videos List
  youtubeVideosList: {
    backgroundColor: '#0F0F0F',
    marginHorizontal: -20,
    paddingHorizontal: width < 768 ? 20 : 0,
    paddingBottom: 100,
  },
  youtubeVideoItem: {
    marginBottom: 24,
    paddingHorizontal: width < 768 ? 20 : 0,
    width: '100%',
  },
  youtubeVideoThumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: width < 768 ? 400 : 500,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 0,
  },
  youtubeVideoThumbnail: {
    width: '100%',
    height: '100%',
  },
  youtubePlayOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    width: 48,
    height: 34,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  youtubeVideoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  youtubeVideoDurationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  youtubeNewBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF0000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  youtubeNewBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  youtubeShoppableBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  youtubeShoppableBadgeText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  youtubeVideoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: width < 768 ? 16 : 12,
  },
  youtubeVideoInfo: {
    flex: 1,
    paddingTop: 4,
  },
  youtubeVideoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
    marginBottom: 8,
  },
  youtubeVideoMeta: {
    gap: 2,
  },
  youtubeChannelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  youtubeChannelName: {
    fontSize: 14,
    color: '#AAAAAA',
    marginRight: 4,
  },
  youtubeVerifiedBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  youtubeVerifiedIcon: {
    fontSize: 8,
    color: '#0F0F0F',
    fontWeight: 'bold',
  },
  youtubeVideoStats: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 8,
    fontWeight: '500',
  },
  youtubeTaggedItemsCount: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  // AI Features
  aiFeaturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  aiFeatureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  aiFeatureIcon: {
    fontSize: 12,
  },
  aiFeatureText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  youtubeMoreButton: {
    padding: 4,
  },
  // YouTube Layout and Sidebar
  youtubeLayout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0F0F0F',
  },
  youtubeSidebar: {
    width: '100%',
    backgroundColor: '#0F0F0F',
    paddingTop: 0,
  },
  youtubeMainContent: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    width: '100%',
    paddingLeft: width < 768 ? 0 : 0,
  },
  youtubeSidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  youtubeLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  menuButton: {
    padding: 4,
  },
  sidebarSection: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  sidebarSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sidebarIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sidebarIcon: {
    fontSize: 18,
  },
  sidebarText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryTile: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 2,
  },
  categoryImage: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 60,
    height: 60,
    borderRadius: 8,
    transform: [{ rotate: '25deg' }],
    opacity: 0.8,
  },
  // NFL Jersey Ad
  adContainer: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  adCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  adGradient: {
    padding: 20,
    minHeight: 200,
  },
  adBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  adBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  adHeader: {
    marginBottom: 16,
  },
  adTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  adSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 4,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  adTextSection: {
    flex: 1,
    paddingRight: 16,
  },
  adMainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 24,
  },
  adDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 8,
    lineHeight: 18,
  },
  adPriceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  adPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  adOriginalPrice: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    textDecorationLine: 'line-through',
  },
  adImageSection: {
    alignItems: 'center',
  },
  adJerseyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  adLogoContainer: {
    alignItems: 'center',
  },
  adLogo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'lowercase',
  },
  adNFLLogo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  adShopButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'center',
  },
  adShopButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  // Recently Played
  recentCard: {
    width: 140,
    marginRight: 16,
  },
  recentImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  recentArtist: {
    fontSize: 12,
    color: '#999',
  },
  // Playlists
  playlistCard: {
    width: 160,
    marginRight: 16,
  },
  playlistImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  // Track Items
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  trackNumber: {
    fontSize: 16,
    color: '#999',
    width: 30,
    textAlign: 'center',
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginLeft: 12,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
  },
  explicitBadge: {
    backgroundColor: '#999',
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  explicitText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  likeButton: {
    padding: 8,
    marginRight: 8,
  },
  trackDuration: {
    fontSize: 14,
    color: '#999',
    marginRight: 12,
  },
  moreButton: {
    padding: 8,
  },
  // Video Items
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoThumbnailContainer: {
    position: 'relative',
    width: 120,
    height: 68,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  newBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#1DB954',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  shoppableBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  shoppableBadgeText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  videoArtist: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  videoViews: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  taggedItemsCount: {
    fontSize: 12,
    color: '#1DB954',
    marginTop: 2,
    fontWeight: '500',
  },
  // Video Player
  videoPlayerContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 100,
  },
  videoPlayerWrapper: {
    height: height * 0.4,
    position: 'relative',
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  videoControlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 20,
  },
  closeVideoButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  muteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -25 }],
  },
  skipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(29, 185, 84, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  videoInfoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  videoPlayerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  videoPlayerArtist: {
    fontSize: 16,
    color: '#999',
    marginBottom: 2,
  },
  videoPlayerViews: {
    fontSize: 14,
    color: '#666',
  },
  // Tagged Items Section
  taggedItemsSection: {
    backgroundColor: '#121212',
    padding: 20,
    minHeight: 300,
  },
  taggedItemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taggedItemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  taggedItemsScroll: {
    marginBottom: 20,
    height: 200,
  },
  taggedItemCard: {
    backgroundColor: '#282828',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 200,
  },
  taggedItemImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  taggedItemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  timeTagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeTagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  taggedItemInfo: {
    flex: 1,
  },
  taggedItemBrand: {
    fontSize: 12,
    color: '#1DB954',
    fontWeight: '600',
    marginBottom: 4,
  },
  taggedItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  taggedItemDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
    marginBottom: 8,
  },
  taggedItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
    fontWeight: '600',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  taggedItemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  taggedItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DB954',
    marginRight: 8,
  },
  taggedItemOriginalPrice: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  shopItemButton: {
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  shopItemButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  shopAllButton: {
    backgroundColor: '#282828',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#1DB954',
    gap: 8,
  },
  shopAllButtonText: {
    fontSize: 16,
    color: '#1DB954',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regionModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '85%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  regionModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  regionModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  regionList: {
    maxHeight: 400,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedRegionItem: {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
  },
  regionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  // AI Analysis Section
  aiAnalysisSection: {
    backgroundColor: '#121212',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 0,
  },
  aiAnalysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiAnalysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  aiAnalysisContent: {
    gap: 12,
  },
  aiAnalysisCard: {
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 12,
  },
  aiAnalysisLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  aiAnalysisValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1DB954',
  },
  aiRecommendationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1DB954',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  aiRecommendationText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  aiAnalysisItem: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    borderRadius: 6,
    padding: 6,
    marginBottom: 8,
  },
  aiAnalysisItemText: {
    fontSize: 11,
    color: '#1DB954',
    fontStyle: 'italic',
  },
  // Comments Section
  commentsSection: {
    backgroundColor: '#121212',
    padding: 20,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  commentsList: {
    maxHeight: 300,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentAvatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 12,
    color: '#666',
  },
  addCommentSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#282828',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    maxHeight: 100,
  },
  commentSendButton: {
    padding: 8,
  },
  checkoutContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  checkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeCheckoutButton: {
    padding: 10,
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
    height: 20,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 800,
    borderRadius: 10,
  },
  productInfoSection: {
    marginBottom: 20,
  },
  productBrand: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  purchaseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  purchaseStatsText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  pricingSection: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  exclusiveSection: {
    marginBottom: 20,
  },
  exclusiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  exclusiveCard: {
    backgroundColor: '#282828',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
    width: 150,
  },
  exclusiveName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  exclusiveDiscount: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  exclusivePricing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  exclusiveNewPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  exclusiveOriginalPrice: {
    fontSize: 12,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  reviewsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  reviewItem: {
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  checkoutActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buyNowButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  giftButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  giftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DB954',
  },
  youtubeMainContentExpanded: {
    flex: 1,
    marginLeft: width < 768 ? 0 : 0,
  },
  youtubeMainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width < 768 ? 16 : 4,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  sidebarToggleButton: {
    padding: 8,
  },
  youtubeMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  youtubeSidebarContainer: {
    width: width < 768 ? 280 : 220,
    backgroundColor: '#0F0F0F',
    borderRightWidth: 1,
    borderRightColor: '#272727',
    paddingTop: 60,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    transform: [{ translateX: -280 }],
  },
  youtubeSidebarVisible: {
    transform: [{ translateX: 0 }],
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});