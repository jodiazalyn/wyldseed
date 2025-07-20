import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  Play, 
  Pause, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Users, 
  MessageCircle, 
  Bell,
  BellOff,
  Star,
  Music,
  Video,
  Camera,
  Send,
  Globe,
  ChevronDown,
  Check,
  Crown,
  Flame,
  TrendingUp,
  Award,
  Headphones,
  Mic,
  Radio,
  Volume2
} from 'lucide-react-native';
import { MusicPlayer } from '@/components/MusicPlayer';

const { width, height } = Dimensions.get('window');

export default function ArtistPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedTab, setSelectedTab] = useState<'music' | 'merch' | 'tours' | 'updates' | 'community'>('music');
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});

  const regions = [
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: '$' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: '£' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'C$' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'A$' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: '€' },
    { code: 'FR', name: 'France', flag: '🇫🇷', currency: '€' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: '¥' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'R$' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: '$' },
    { code: 'IN', name: 'India', flag: '🇮🇳', currency: '₹' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];
  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];

  // Mock artist data - in real app this would come from API based on id
  const artist = {
    id: id,
    name: 'Drake',
    verified: true,
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    followers: '52.3M',
    monthlyListeners: '89.2M',
    bio: 'Grammy Award-winning artist from Toronto. OVO Sound founder. Views from the 6.',
    genres: ['Hip Hop', 'R&B', 'Pop'],
    location: 'Toronto, Canada',
    website: 'drakeofficial.com',
    socialMedia: {
      instagram: '@champagnepapi',
      twitter: '@Drake',
      tiktok: '@drake'
    },
    stats: {
      totalStreams: '50B+',
      albums: 13,
      awards: 47,
      collaborations: 200
    }
  };

  const tabs = [
    { id: 'music', name: 'Music', icon: Music },
    { id: 'merch', name: 'Merch', icon: ShoppingBag },
    { id: 'tours', name: 'Tours', icon: Calendar },
    { id: 'updates', name: 'Updates', icon: Bell },
    { id: 'community', name: 'Community', icon: Users },
  ];

  const topTracks = [
    {
      id: 1,
      title: "God's Plan",
      album: "Scorpion",
      duration: "3:18",
      streams: "2.1B",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      isExplicit: false,
    },
    {
      id: 2,
      title: "Hotline Bling",
      album: "Views",
      duration: "4:27",
      streams: "1.8B",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      isExplicit: false,
    },
    {
      id: 3,
      title: "In My Feelings",
      album: "Scorpion",
      duration: "3:37",
      streams: "1.5B",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      isExplicit: true,
    },
    {
      id: 4,
      title: "One Dance",
      album: "Views",
      duration: "2:54",
      streams: "2.3B",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      isExplicit: false,
    },
    {
      id: 5,
      title: "Started From The Bottom",
      album: "Nothing Was The Same",
      duration: "2:54",
      streams: "900M",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      isExplicit: true,
    },
  ];

  const merchandise = [
    {
      id: 1,
      name: "OVO Owl Hoodie",
      price: "$120",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      category: "Clothing",
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Scorpion Album Vinyl",
      price: "$35",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      category: "Music",
      inStock: true,
      featured: false,
    },
    {
      id: 3,
      name: "OVO Snapback Hat",
      price: "$45",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      category: "Accessories",
      inStock: false,
      featured: false,
    },
    {
      id: 4,
      name: "Views Tour T-Shirt",
      price: "$35",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      category: "Clothing",
      inStock: true,
      featured: true,
    },
  ];

  const tourDates = [
    {
      id: 1,
      date: "2024-03-15",
      venue: "Madison Square Garden",
      city: "New York, NY",
      country: "United States",
      status: "On Sale",
      price: "From $89",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    },
    {
      id: 2,
      date: "2024-03-18",
      venue: "Staples Center",
      city: "Los Angeles, CA",
      country: "United States",
      status: "Sold Out",
      price: "From $95",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    },
    {
      id: 3,
      date: "2024-03-22",
      venue: "O2 Arena",
      city: "London",
      country: "United Kingdom",
      status: "On Sale",
      price: "From £75",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    },
    {
      id: 4,
      date: "2024-03-25",
      venue: "Scotiabank Arena",
      city: "Toronto, ON",
      country: "Canada",
      status: "Presale",
      price: "From C$85",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    },
  ];

  const updates = [
    {
      id: 1,
      type: "announcement",
      title: "New Album 'For All The Dogs' Out Now",
      content: "My latest album is finally here! 23 tracks of pure emotion and storytelling.",
      timestamp: "2h ago",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
      likes: 234567,
      comments: 12890,
    },
    {
      id: 2,
      type: "tour",
      title: "It's All A Blur Tour - New Dates Added",
      content: "Due to popular demand, we've added 10 more cities to the tour. Presale starts tomorrow!",
      timestamp: "1d ago",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
      likes: 189234,
      comments: 8765,
    },
    {
      id: 3,
      type: "collaboration",
      title: "Studio Session with J. Cole",
      content: "Working on something special with one of the greatest. Can't wait for you to hear it.",
      timestamp: "3d ago",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      likes: 345678,
      comments: 15432,
    },
  ];

  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Sarah M.",
        username: "@sarah_ovo",
        avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
      },
      content: "Just saw Drake live in Toronto! Best concert of my life 🔥",
      timestamp: "2h ago",
      likes: 1234,
      replies: 89,
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
    },
    {
      id: 2,
      user: {
        name: "Mike Johnson",
        username: "@mike_6god",
        avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      },
      content: "The new album hits different. Every track is a masterpiece 🎵",
      timestamp: "4h ago",
      likes: 892,
      replies: 45,
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        username: "@emma_views",
        avatar: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      },
      content: "Been a fan since 2009. Drake's evolution as an artist is incredible 🙌",
      timestamp: "6h ago",
      likes: 567,
      replies: 23,
    },
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(
      isFollowing ? "Unfollowed" : "Following",
      isFollowing ? `You unfollowed ${artist.name}` : `You're now following ${artist.name}!`
    );
  };

  const handleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    Alert.alert(
      "Notifications",
      isNotificationsEnabled 
        ? "You'll no longer receive notifications from this artist"
        : "You'll now receive notifications about new releases and updates"
    );
  };

  const handlePlayTrack = (trackId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [trackId]: !prev[trackId]
    }));
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    setNewComment('');
    setShowComments(false);
    Alert.alert('Comment Posted', 'Your comment has been added!');
  };

  const renderRegionModal = () => (
    <Modal
      visible={showRegionModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowRegionModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowRegionModal(false)}
      >
        <View style={styles.regionModalContent}>
          <View style={styles.regionModalHeader}>
            <Text style={styles.regionModalTitle}>Select Region</Text>
          </View>
          
          <ScrollView style={styles.regionList} showsVerticalScrollIndicator={false}>
            {regions.map((region) => (
              <TouchableOpacity
                key={region.code}
                style={[
                  styles.regionItem,
                  selectedRegion === region.code && styles.selectedRegionItem
                ]}
                onPress={() => {
                  setSelectedRegion(region.code);
                  setShowRegionModal(false);
                }}
              >
                <View style={styles.regionInfo}>
                  <Text style={styles.regionFlag}>{region.flag}</Text>
                  <View style={styles.regionDetails}>
                    <Text style={styles.regionName}>{region.name}</Text>
                    <Text style={styles.regionCurrency}>Currency: {region.currency}</Text>
                  </View>
                </View>
                {selectedRegion === region.code && (
                  <Check size={20} color="#8B5CF6" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowLanguageModal(false)}
      >
        <View style={styles.languageModalContent}>
          <View style={styles.languageModalHeader}>
            <Text style={styles.languageModalTitle}>Select Language</Text>
          </View>
          
          <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  selectedLanguage === language.code && styles.selectedLanguageItem
                ]}
                onPress={() => {
                  setSelectedLanguage(language.code);
                  setShowLanguageModal(false);
                }}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                </View>
                {selectedLanguage === language.code && (
                  <Check size={20} color="#8B5CF6" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderCommentsModal = () => (
    <Modal
      visible={showComments}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowComments(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.commentsModal}>
          <View style={styles.commentsHeader}>
            <TouchableOpacity onPress={() => setShowComments(false)}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.commentsTitle}>Comments</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.commentsList}>
            {communityPosts.slice(0, 3).map((post) => (
              <View key={post.id} style={styles.commentItem}>
                <Image source={{ uri: post.user.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUser}>{post.user.username}</Text>
                  <Text style={styles.commentText}>{post.content}</Text>
                  <Text style={styles.commentTime}>{post.timestamp}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleComment}
            >
              <Send size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderMusicTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Tracks</Text>
        <TouchableOpacity style={styles.playAllButton}>
          <Play size={16} color="#fff" fill="#fff" />
          <Text style={styles.playAllText}>Play All</Text>
        </TouchableOpacity>
      </View>

      {topTracks.map((track, index) => (
        <TouchableOpacity key={track.id} style={styles.trackItem}>
          <View style={styles.trackLeft}>
            <Text style={styles.trackNumber}>{index + 1}</Text>
            <Image source={{ uri: track.image }} style={styles.trackImage} />
            <View style={styles.trackInfo}>
              <View style={styles.trackTitleRow}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                {track.isExplicit && (
                  <View style={styles.explicitBadge}>
                    <Text style={styles.explicitText}>E</Text>
                  </View>
                )}
              </View>
              <Text style={styles.trackAlbum}>{track.album}</Text>
              <Text style={styles.trackStreams}>{track.streams} streams</Text>
            </View>
          </View>
          <View style={styles.trackRight}>
            <Text style={styles.trackDuration}>{track.duration}</Text>
            <TouchableOpacity 
              style={styles.trackPlayButton}
              onPress={() => handlePlayTrack(track.id.toString())}
            >
              {isPlaying[track.id.toString()] ? (
                <Pause size={16} color="#8B5CF6" fill="#8B5CF6" />
              ) : (
                <Play size={16} color="#8B5CF6" fill="#8B5CF6" />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.albumsSection}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map((album) => (
            <TouchableOpacity key={album} style={styles.albumCard}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' }} 
                style={styles.albumImage} 
              />
              <Text style={styles.albumTitle}>Album {album}</Text>
              <Text style={styles.albumYear}>2023</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderMerchTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Official Merchandise</Text>
        <View style={styles.regionCurrencyInfo}>
          <Text style={styles.currencyText}>Prices in {currentRegion.currency}</Text>
        </View>
      </View>

      <View style={styles.merchGrid}>
        {merchandise.map((item) => (
          <TouchableOpacity key={item.id} style={styles.merchCard}>
            {item.featured && (
              <View style={styles.featuredBadge}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
            <Image source={{ uri: item.image }} style={styles.merchImage} />
            <View style={styles.merchInfo}>
              <Text style={styles.merchName}>{item.name}</Text>
              <Text style={styles.merchCategory}>{item.category}</Text>
              <Text style={styles.merchPrice}>{item.price}</Text>
              <TouchableOpacity 
                style={[
                  styles.addToCartButton,
                  !item.inStock && styles.outOfStockButton
                ]}
                disabled={!item.inStock}
              >
                <ShoppingBag size={16} color="#fff" />
                <Text style={styles.addToCartText}>
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderToursTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Tours</Text>
        <Text style={styles.sectionSubtitle}>It's All A Blur Tour 2024</Text>
      </View>

      {tourDates.map((tour) => (
        <TouchableOpacity key={tour.id} style={styles.tourCard}>
          <Image source={{ uri: tour.image }} style={styles.tourImage} />
          <View style={styles.tourInfo}>
            <View style={styles.tourHeader}>
              <Text style={styles.tourDate}>
                {new Date(tour.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
              <View style={[
                styles.tourStatus,
                tour.status === 'Sold Out' && styles.soldOutStatus,
                tour.status === 'Presale' && styles.presaleStatus
              ]}>
                <Text style={[
                  styles.tourStatusText,
                  tour.status === 'Sold Out' && styles.soldOutText,
                  tour.status === 'Presale' && styles.presaleText
                ]}>
                  {tour.status}
                </Text>
              </View>
            </View>
            <Text style={styles.tourVenue}>{tour.venue}</Text>
            <View style={styles.tourLocation}>
              <MapPin size={14} color="#8B5CF6" />
              <Text style={styles.tourCity}>{tour.city}, {tour.country}</Text>
            </View>
            <View style={styles.tourFooter}>
              <Text style={styles.tourPrice}>{tour.price}</Text>
              <TouchableOpacity 
                style={[
                  styles.ticketsButton,
                  tour.status === 'Sold Out' && styles.disabledButton
                ]}
                disabled={tour.status === 'Sold Out'}
              >
                <Text style={styles.ticketsButtonText}>
                  {tour.status === 'Sold Out' ? 'Sold Out' : 'Get Tickets'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderUpdatesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={handleNotifications}
        >
          {isNotificationsEnabled ? (
            <Bell size={20} color="#8B5CF6" fill="#8B5CF6" />
          ) : (
            <BellOff size={20} color="#999" />
          )}
        </TouchableOpacity>
      </View>

      {updates.map((update) => (
        <View key={update.id} style={styles.updateCard}>
          <View style={styles.updateHeader}>
            <View style={styles.updateTypeIcon}>
              {update.type === 'announcement' && <Mic size={16} color="#8B5CF6" />}
              {update.type === 'tour' && <Calendar size={16} color="#10B981" />}
              {update.type === 'collaboration' && <Users size={16} color="#F59E0B" />}
            </View>
            <Text style={styles.updateTimestamp}>{update.timestamp}</Text>
          </View>
          
          <Text style={styles.updateTitle}>{update.title}</Text>
          <Text style={styles.updateContent}>{update.content}</Text>
          
          {update.image && (
            <Image source={{ uri: update.image }} style={styles.updateImage} />
          )}
          
          <View style={styles.updateActions}>
            <TouchableOpacity style={styles.updateAction}>
              <Heart size={16} color="#999" />
              <Text style={styles.updateActionText}>{update.likes.toLocaleString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.updateAction}
              onPress={() => setShowComments(true)}
            >
              <MessageCircle size={16} color="#999" />
              <Text style={styles.updateActionText}>{update.comments.toLocaleString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateAction}>
              <Share size={16} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCommunityTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Fan Community</Text>
        <Text style={styles.sectionSubtitle}>Connect with other fans</Text>
      </View>

      {communityPosts.map((post) => (
        <View key={post.id} style={styles.communityCard}>
          <View style={styles.communityHeader}>
            <Image source={{ uri: post.user.avatar }} style={styles.communityAvatar} />
            <View style={styles.communityUserInfo}>
              <Text style={styles.communityUserName}>{post.user.name}</Text>
              <Text style={styles.communityUserHandle}>{post.user.username}</Text>
            </View>
            <Text style={styles.communityTimestamp}>{post.timestamp}</Text>
          </View>
          
          <Text style={styles.communityContent}>{post.content}</Text>
          
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.communityImage} />
          )}
          
          <View style={styles.communityActions}>
            <TouchableOpacity style={styles.communityAction}>
              <Heart size={16} color="#999" />
              <Text style={styles.communityActionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.communityAction}>
              <MessageCircle size={16} color="#999" />
              <Text style={styles.communityActionText}>{post.replies}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.communityAction}>
              <Share size={16} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.regionSelector}
              onPress={() => setShowRegionModal(true)}
            >
              <Globe size={16} color="#fff" />
              <Text style={styles.regionFlag}>{currentRegion.flag}</Text>
              <Text style={styles.regionCode}>{currentRegion.code}</Text>
              <ChevronDown size={14} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.languageSelector}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={styles.languageFlag}>{currentLanguage.flag}</Text>
              <Text style={styles.languageCode}>{currentLanguage.code.toUpperCase()}</Text>
              <ChevronDown size={14} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton}>
              <Share size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Artist Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: artist.coverImage }} style={styles.coverImage} />
          <LinearGradient
            colors={['transparent', 'rgba(26,26,26,0.9)', '#1a1a1a']}
            style={styles.heroGradient}
          >
            <View style={styles.artistInfo}>
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <View style={styles.artistDetails}>
                <View style={styles.artistNameRow}>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  {artist.verified && (
                    <View style={styles.verifiedBadge}>
                      <Crown size={16} color="#F59E0B" />
                    </View>
                  )}
                </View>
                <Text style={styles.artistBio}>{artist.bio}</Text>
                <View style={styles.artistStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{artist.followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{artist.monthlyListeners}</Text>
                    <Text style={styles.statLabel}>Monthly Listeners</Text>
                  </View>
                </View>
                <View style={styles.genreTags}>
                  {artist.genres.map((genre, index) => (
                    <View key={index} style={styles.genreTag}>
                      <Text style={styles.genreText}>{genre}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.followButton, isFollowing && styles.followingButton]}
                onPress={handleFollow}
              >
                <Text style={[styles.followText, isFollowing && styles.followingText]}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.notificationButton}
                onPress={handleNotifications}
              >
                {isNotificationsEnabled ? (
                  <Bell size={20} color="#8B5CF6" fill="#8B5CF6" />
                ) : (
                  <BellOff size={20} color="#999" />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.heartButton}>
                <Heart size={20} color="#999" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    selectedTab === tab.id && styles.activeTab
                  ]}
                  onPress={() => setSelectedTab(tab.id as any)}
                >
                  <IconComponent 
                    size={18} 
                    color={selectedTab === tab.id ? "#8B5CF6" : "#999"} 
                  />
                  <Text style={[
                    styles.tabText,
                    selectedTab === tab.id && styles.activeTabText
                  ]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {selectedTab === 'music' && renderMusicTab()}
        {selectedTab === 'merch' && renderMerchTab()}
        {selectedTab === 'tours' && renderToursTab()}
        {selectedTab === 'updates' && renderUpdatesTab()}
        {selectedTab === 'community' && renderCommunityTab()}
      </ScrollView>

      {renderRegionModal()}
      {renderLanguageModal()}
      {renderCommentsModal()}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  languageFlag: {
    fontSize: 14,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: height * 0.6,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginRight: 16,
  },
  artistDetails: {
    flex: 1,
  },
  artistNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistBio: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 22,
  },
  artistStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  genreTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  followButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  followText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  followingText: {
    color: '#8B5CF6',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    marginRight: 12,
    gap: 6,
  },
  activeTab: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  playAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  playAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trackNumber: {
    fontSize: 16,
    color: '#999',
    width: 24,
    textAlign: 'center',
    marginRight: 12,
  },
  trackImage: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  explicitBadge: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explicitText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  trackAlbum: {
    fontSize: 14,
    color: '#999',
    marginBottom: 2,
  },
  trackStreams: {
    fontSize: 12,
    color: '#666',
  },
  trackRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trackDuration: {
    fontSize: 14,
    color: '#999',
  },
  trackPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumsSection: {
    marginTop: 32,
  },
  albumCard: {
    marginRight: 16,
    width: 140,
  },
  albumImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  albumYear: {
    fontSize: 12,
    color: '#999',
  },
  regionCurrencyInfo: {
    alignItems: 'flex-end',
  },
  currencyText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  merchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  merchCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
    zIndex: 1,
  },
  featuredText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  merchImage: {
    width: '100%',
    height: 120,
  },
  merchInfo: {
    padding: 12,
  },
  merchName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  merchCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  merchPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  outOfStockButton: {
    backgroundColor: '#666',
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  tourCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tourImage: {
    width: 80,
    height: 80,
  },
  tourInfo: {
    flex: 1,
    padding: 12,
  },
  tourHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tourDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  tourStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#10B981',
  },
  soldOutStatus: {
    backgroundColor: '#EF4444',
  },
  presaleStatus: {
    backgroundColor: '#F59E0B',
  },
  tourStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  soldOutText: {
    color: '#fff',
  },
  presaleText: {
    color: '#fff',
  },
  tourVenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  tourLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  tourCity: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  tourFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tourPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  ticketsButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  ticketsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  updateCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  updateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  updateContent: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  updateImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  updateActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  updateAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  updateActionText: {
    fontSize: 14,
    color: '#999',
  },
  communityCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  communityUserInfo: {
    flex: 1,
  },
  communityUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  communityUserHandle: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 2,
  },
  communityTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  communityContent: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  communityImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  communityActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  communityAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  communityActionText: {
    fontSize: 14,
    color: '#999',
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
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  regionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  regionDetails: {
    marginLeft: 12,
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  regionCurrency: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  languageModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '85%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  languageModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  languageModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  languageList: {
    maxHeight: 400,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  commentsModal: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelText: {
    fontSize: 16,
    color: '#8B5CF6',
  },
  placeholder: {
    width: 60,
  },
  commentsList: {
    flex: 1,
    padding: 20,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});