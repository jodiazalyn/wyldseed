import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Dimensions, Modal } from 'react-native';
import { Heart, Star, Play, ChevronLeft, ChevronRight, Clock, Flame, Users, ShoppingCart, Globe, ChevronDown, Check } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';

const { width } = Dimensions.get('window');

export default function ShopScreen() {
  const [purchasingItem, setPurchasingItem] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [showRegionModal, setShowRegionModal] = useState(false);

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

  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];

  // Countdown timer for exclusive drop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const exclusiveDrops = [
    {
      id: 'travis-jordan-1',
      brand: 'Jordan',
      artist: 'Travis Scott',
      collaboration: 'Jordan x Travis Scott',
      name: 'Air Jordan 1 Low OG SP "Travis Scott"',
      subtitle: 'Reverse Mocha',
      price: '$2,500',
      originalPrice: '$150',
      priceValue: 2500,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      category: "Exclusive Sneakers",
      rating: 4.9,
      featuredIn: "FE!N - Travis Scott",
      releaseDate: "Limited Release",
      stockCount: 47,
      totalStock: 500,
      isLimitedEdition: true,
      exclusiveFeatures: [
        "Reverse swoosh design",
        "Cactus Jack branding",
        "Premium suede construction",
        "Special packaging",
        "Certificate of authenticity"
      ],
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Travis Scott Wearing Them",
          duration: "0:32",
          creator: "@travisscott",
          isVerified: true,
          views: "2.1M"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          title: "Astroworld Concert Fit",
          duration: "1:05",
          creator: "@cactus_jack_fan",
          isVerified: false,
          views: "890K"
        },
        {
          id: 3,
          thumbnail: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
          title: "Unboxing Experience",
          duration: "2:18",
          creator: "@sneaker_unboxer",
          isVerified: true,
          views: "1.3M"
        },
        {
          id: 4,
          thumbnail: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
          title: "On-Feet Review",
          duration: "1:47",
          creator: "@kicks_on_fire",
          isVerified: true,
          views: "756K"
        }
      ]
    },
    {
      id: 'travis-jordan-4',
      brand: 'Jordan',
      artist: 'Travis Scott',
      collaboration: 'Jordan x Travis Scott',
      name: 'Air Jordan 4 Retro "Cactus Jack"',
      subtitle: 'Blue/University Red',
      price: '$1,800',
      originalPrice: '$190',
      priceValue: 1800,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      category: "Exclusive Sneakers",
      rating: 4.8,
      featuredIn: "SICKO MODE - Travis Scott",
      releaseDate: "Sold Out",
      stockCount: 0,
      totalStock: 300,
      isLimitedEdition: true,
      isSoldOut: true,
      exclusiveFeatures: [
        "Blue suede upper",
        "Red accents",
        "Cactus Jack heel tab",
        "Special lace locks",
        "Exclusive box design"
      ],
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Studio Session Flex",
          duration: "0:28",
          creator: "@travisscott",
          isVerified: true,
          views: "3.2M"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          title: "Resale Market Analysis",
          duration: "3:15",
          creator: "@sneaker_economics",
          isVerified: true,
          views: "567K"
        }
      ]
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High",
      price: "$170",
      priceValue: 170,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      category: "Sneakers",
      rating: 4.8,
      featuredIn: "God's Plan - Drake",
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Street Style Showcase",
          duration: "0:45",
          creator: "@sneakerhead_mike"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          title: "Basketball Court Action",
          duration: "1:12",
          creator: "@hoops_daily"
        },
        {
          id: 3,
          thumbnail: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg",
          title: "Urban Fashion Look",
          duration: "0:38",
          creator: "@style_maven"
        },
        {
          id: 4,
          thumbnail: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
          title: "Unboxing & Review",
          duration: "2:15",
          creator: "@kicks_review"
        }
      ]
    },
    {
      id: 2,
      name: "McLaren 720S",
      price: "$299,000",
      priceValue: 299000,
      image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
      category: "Luxury Cars",
      rating: 4.9,
      featuredIn: "Sicko Mode - Travis Scott",
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg",
          title: "Track Day Performance",
          duration: "3:22",
          creator: "@supercar_life"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
          title: "City Cruising",
          duration: "2:45",
          creator: "@luxury_rides"
        },
        {
          id: 3,
          thumbnail: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
          title: "Interior Tour",
          duration: "1:58",
          creator: "@car_details"
        },
        {
          id: 4,
          thumbnail: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
          title: "Sound Check",
          duration: "1:33",
          creator: "@engine_sounds"
        }
      ]
    },
    {
      id: 3,
      name: "Gucci Hoodie",
      price: "$980",
      priceValue: 980,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      category: "Designer Fashion",
      rating: 4.7,
      featuredIn: "Money Trees - Kendrick Lamar",
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          title: "Styling Tips",
          duration: "1:25",
          creator: "@fashion_guru"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          title: "Outfit Coordination",
          duration: "2:10",
          creator: "@style_inspo"
        },
        {
          id: 3,
          thumbnail: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          title: "Quality Review",
          duration: "1:47",
          creator: "@luxury_reviews"
        },
        {
          id: 4,
          thumbnail: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          title: "Casual vs Formal",
          duration: "1:55",
          creator: "@wardrobe_tips"
        }
      ]
    },
  ];

  const categories = [
    { name: "Sneakers", icon: "👟", count: 156 },
    { name: "Cars", icon: "🏎️", count: 24 },
    { name: "Fashion", icon: "👕", count: 89 },
    { name: "Jewelry", icon: "💎", count: 67 },
    { name: "Watches", icon: "⌚", count: 45 },
    { name: "Accessories", icon: "🎒", count: 112 },
  ];

  const trendingProducts = [
    {
      id: 4,
      name: "Nike Dunk Low",
      price: "$110",
      priceValue: 110,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Daily Wear",
          duration: "0:32",
          creator: "@everyday_style"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          title: "Skate Session",
          duration: "1:05",
          creator: "@skate_life"
        }
      ]
    },
    {
      id: 5,
      name: "Rolex Submariner",
      price: "$8,100",
      priceValue: 8100,
      image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      videos: [
        {
          id: 1,
          thumbnail: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
          title: "Luxury Lifestyle",
          duration: "1:18",
          creator: "@watch_collector"
        },
        {
          id: 2,
          thumbnail: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
          title: "Diving Test",
          duration: "2:33",
          creator: "@dive_watches"
        }
      ]
    },
  ];

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', color: '#0070BA', icon: '💙' },
    { id: 'cashapp', name: 'Cash App', color: '#00D632', icon: '💚' },
    { id: 'coinbase', name: 'Coinbase', color: '#0052FF', icon: '🔵' },
    { id: 'applepay', name: 'Apple Pay', color: '#000000', icon: 'logo' },
    { id: 'googlepay', name: 'Google Pay', color: '#4285F4', icon: '🔴' },
    { id: 'klarna', name: 'Klarna', color: '#FFB3C7', icon: '🌸' },
    { id: 'zelle', name: 'Zelle', color: '#6C1D5F', icon: '💜' },
  ];

  const handlePurchase = async (product: any, paymentMethodId: string) => {
    const paymentMethod = paymentMethods.find(pm => pm.id === paymentMethodId);
    setPurchasingItem(product.id);
    setSelectedPayment(paymentMethodId);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        "Purchase Successful! 🎉",
        `${product.name} has been purchased for ${product.price} using ${paymentMethod?.name}.`,
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Purchase Failed",
        "There was an issue processing your payment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setPurchasingItem(null);
      setSelectedPayment(null);
    }
  };

  const handleVideoNavigation = (productId: number | string, direction: 'prev' | 'next', videosLength: number) => {
    setActiveVideoIndex(prev => {
      const currentIndex = prev[productId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = currentIndex + 1 >= videosLength ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex - 1 < 0 ? videosLength - 1 : currentIndex - 1;
      }
      
      return { ...prev, [productId]: newIndex };
    });
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
                  <Check size={20} color="#10B981" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderPaymentIcon = (method: any, isCompact: boolean) => {
    if (method.id === 'applepay') {
      return (
        <View style={[styles.applePayContainer, isCompact && styles.compactApplePayContainer]}>
          <Image 
            source={require('@/assets/images/image copy.png')} 
            style={[styles.applePayLogo, isCompact && styles.compactApplePayLogo]}
            resizeMode="contain"
          />
        </View>
      );
    }
    return <Text style={styles.paymentIcon}>{method.icon}</Text>;
  };

  const renderPaymentGrid = (product: any, isCompact = false) => (
    <View style={[styles.paymentGrid, isCompact && styles.compactPaymentGrid]}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentButton,
            { backgroundColor: method.color },
            isCompact && styles.compactPaymentButton,
            purchasingItem === product.id && selectedPayment === method.id && styles.processingButton,
            product.isSoldOut && styles.disabledButton
          ]}
          onPress={() => !product.isSoldOut && handlePurchase(product, method.id)}
          disabled={purchasingItem === product.id || product.isSoldOut}
        >
          {purchasingItem === product.id && selectedPayment === method.id ? (
            <Text style={styles.processingText}>...</Text>
          ) : (
            <>
              {renderPaymentIcon(method, isCompact)}
              {!isCompact && method.id !== 'applepay' && <Text style={styles.paymentText}>{method.name}</Text>}
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderVideoCarousel = (product: any, isCompact = false) => {
    const currentVideoIndex = activeVideoIndex[product.id] || 0;
    const currentVideo = product.videos[currentVideoIndex];
    
    return (
      <View style={[styles.videoSection, isCompact && styles.compactVideoSection]}>
        <Text style={[styles.videoSectionTitle, isCompact && styles.compactVideoSectionTitle]}>
          See it in action
        </Text>
        
        <View style={[styles.videoCarousel, isCompact && styles.compactVideoCarousel]}>
          <TouchableOpacity
            style={[styles.videoNavButton, styles.videoNavLeft]}
            onPress={() => handleVideoNavigation(product.id, 'prev', product.videos.length)}
          >
            <ChevronLeft size={isCompact ? 16 : 20} color="#fff" />
          </TouchableOpacity>
          
          <View style={[styles.videoContainer, isCompact && styles.compactVideoContainer]}>
            <Image 
              source={{ uri: currentVideo.thumbnail }} 
              style={[styles.videoThumbnail, isCompact && styles.compactVideoThumbnail]} 
            />
            <View style={styles.videoOverlay}>
              <TouchableOpacity style={[styles.playButton, isCompact && styles.compactPlayButton]}>
                <Play size={isCompact ? 16 : 24} color="#fff" fill="#fff" />
              </TouchableOpacity>
            </View>
            <View style={[styles.videoDuration, isCompact && styles.compactVideoDuration]}>
              <Text style={[styles.videoDurationText, isCompact && styles.compactVideoDurationText]}>
                {currentVideo.duration}
              </Text>
            </View>
            {currentVideo.isVerified && (
              <View style={[styles.verifiedBadge, isCompact && styles.compactVerifiedBadge]}>
                <Text style={[styles.verifiedText, isCompact && styles.compactVerifiedText]}>✓</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.videoNavButton, styles.videoNavRight]}
            onPress={() => handleVideoNavigation(product.id, 'next', product.videos.length)}
          >
            <ChevronRight size={isCompact ? 16 : 20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.videoInfo, isCompact && styles.compactVideoInfo]}>
          <Text style={[styles.videoTitle, isCompact && styles.compactVideoTitle]}>
            {currentVideo.title}
          </Text>
          <View style={styles.videoCreatorRow}>
            <Text style={[styles.videoCreator, isCompact && styles.compactVideoCreator]}>
              by {currentVideo.creator}
            </Text>
            {currentVideo.views && (
              <Text style={[styles.videoViews, isCompact && styles.compactVideoViews]}>
                {currentVideo.views} views
              </Text>
            )}
          </View>
        </View>
        
        <View style={[styles.videoIndicators, isCompact && styles.compactVideoIndicators]}>
          {product.videos.map((_: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.videoIndicator,
                isCompact && styles.compactVideoIndicator,
                index === currentVideoIndex && styles.activeVideoIndicator
              ]}
              onPress={() => setActiveVideoIndex(prev => ({ ...prev, [product.id]: index }))}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderExclusiveDropCard = (drop: any) => (
    <View key={drop.id} style={styles.exclusiveDropCard}>
      {/* Header with collaboration info */}
      <View style={styles.exclusiveHeader}>
        <View style={styles.collaborationBadge}>
          <Flame size={16} color="#FF6B35" />
          <Text style={styles.collaborationText}>{drop.collaboration}</Text>
        </View>
        <View style={styles.limitedBadge}>
          <Text style={styles.limitedText}>LIMITED EDITION</Text>
        </View>
      </View>

      {/* Product image with overlay info */}
      <View style={styles.exclusiveImageContainer}>
        <Image source={{ uri: drop.image }} style={styles.exclusiveImage} />
        
        {/* Stock indicator overlay */}
        <View style={styles.stockOverlay}>
          <View style={styles.stockInfo}>
            <Users size={14} color="#fff" />
            <Text style={styles.stockText}>
              {drop.isSoldOut ? 'SOLD OUT' : `${drop.stockCount}/${drop.totalStock} left`}
            </Text>
          </View>
          {!drop.isSoldOut && (
            <View style={styles.stockBar}>
              <View 
                style={[
                  styles.stockProgress, 
                  { width: `${(drop.stockCount / drop.totalStock) * 100}%` }
                ]} 
              />
            </View>
          )}
        </View>

        {/* Price comparison overlay */}
        <View style={styles.priceOverlay}>
          <Text style={styles.originalPrice}>{drop.originalPrice}</Text>
          <Text style={styles.currentPrice}>{drop.price}</Text>
        </View>
      </View>

      {/* Product details */}
      <View style={styles.exclusiveInfo}>
        <View style={styles.exclusiveProductHeader}>
          <View style={styles.brandArtistInfo}>
            <Text style={styles.brandName}>{drop.brand}</Text>
            <Text style={styles.artistName}>x {drop.artist}</Text>
          </View>
          <TouchableOpacity style={styles.exclusiveHeartButton}>
            <Heart size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <Text style={styles.exclusiveProductName}>{drop.name}</Text>
        <Text style={styles.exclusiveSubtitle}>{drop.subtitle}</Text>

        <View style={styles.exclusiveRatingContainer}>
          <Star size={16} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.exclusiveRating}>{drop.rating}</Text>
          <Text style={styles.releaseDate}>{drop.releaseDate}</Text>
        </View>

        <View style={styles.featuredTrack}>
          <Text style={styles.featuredText}>🎵 Featured in: {drop.featuredIn}</Text>
        </View>

        {/* Exclusive features */}
        <View style={styles.exclusiveFeaturesSection}>
          <Text style={styles.exclusiveFeaturesTitle}>Exclusive Features:</Text>
          <View style={styles.exclusiveFeaturesList}>
            {drop.exclusiveFeatures.slice(0, 3).map((feature: string, index: number) => (
              <View key={index} style={styles.exclusiveFeatureItem}>
                <Text style={styles.exclusiveFeatureBullet}>•</Text>
                <Text style={styles.exclusiveFeatureText}>{feature}</Text>
              </View>
            ))}
            {drop.exclusiveFeatures.length > 3 && (
              <Text style={styles.moreFeatures}>{`+${drop.exclusiveFeatures.length - 3} more`}</Text>
            )}
          </View>
        </View>

        {/* Video carousel */}
        {renderVideoCarousel(drop)}

        {/* Purchase section */}
        <View style={styles.exclusivePurchaseSection}>
          {drop.isSoldOut ? (
            <View style={styles.soldOutContainer}>
              <Text style={styles.soldOutText}>SOLD OUT</Text>
              <TouchableOpacity style={styles.notifyButton}>
                <Text style={styles.notifyButtonText}>Notify for Restock</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.exclusivePriceSection}>
                <Text style={styles.exclusiveCurrentPrice}>{drop.price}</Text>
                <Text style={styles.exclusiveOriginalPrice}>{drop.originalPrice}</Text>
                <View style={styles.urgencyIndicator}>
                  <Clock size={14} color="#FF6B35" />
                  <Text style={styles.urgencyText}>Limited time</Text>
                </View>
              </View>
              <Text style={styles.exclusivePaymentLabel}>Secure checkout:</Text>
              {renderPaymentGrid(drop)}
            </>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Culture Shop</Text>
          <Text style={styles.subtitle}>Shop culture from {currentRegion.name}</Text>
        </View>
        <TouchableOpacity 
          style={styles.regionSelector}
          onPress={() => setShowRegionModal(true)}
        >
          <Globe size={16} color="#fff" />
          <Text style={styles.regionFlag}>{currentRegion.flag}</Text>
          <Text style={styles.regionCode}>{currentRegion.code}</Text>
          <ChevronDown size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exclusive Drops Section */}
        <View style={styles.section}>
          <View style={styles.exclusiveSectionHeader}>
            <View style={styles.exclusiveTitleContainer}>
              <Flame size={24} color="#FF6B35" />
              <Text style={styles.exclusiveSectionTitle}>Exclusive Drops</Text>
            </View>
            <View style={styles.countdownContainer}>
              <Clock size={16} color="#FF6B35" />
              <Text style={styles.countdownText}>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </Text>
            </View>
          </View>
          <Text style={styles.exclusiveSectionSubtitle}>
            Limited edition collaborations between top artists and premium brands
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exclusiveDropsContainer}>
            {exclusiveDrops.map(renderExclusiveDropCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured in Songs</Text>
          <Text style={styles.sectionSubtitle}>Products mentioned by your favorite artists</Text>
          {featuredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <TouchableOpacity style={styles.heartButton}>
                    <Heart size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
                <View style={styles.featuredTrack}>
                  <Text style={styles.featuredText}>🎵 Featured in: {product.featuredIn}</Text>
                </View>
                
                {renderVideoCarousel(product)}
                
                <View style={styles.productFooter}>
                  <Text style={styles.price}>{product.price}</Text>
                </View>
                <Text style={styles.paymentLabel}>Choose your payment method:</Text>
                {renderPaymentGrid(product)}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingGrid}>
            {trendingProducts.map((product) => (
              <View key={product.id} style={styles.trendingCard}>
                <Image source={{ uri: product.image }} style={styles.trendingImage} />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingName}>{product.name}</Text>
                  <Text style={styles.trendingPrice}>{product.price}</Text>
                  
                  {renderVideoCarousel(product, true)}
                  
                  {renderPaymentGrid(product, true)}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentInfoTitle}>Secure One-Click Payments</Text>
            <Text style={styles.paymentInfoText}>
              Shop instantly with your preferred payment method. All transactions are secure and encrypted.
            </Text>
            <View style={styles.supportedMethods}>
              <Text style={styles.supportedMethodsTitle}>Supported Payment Methods:</Text>
              <View style={styles.methodsList}>
                {paymentMethods.map((method) => (
                  <View key={method.id} style={styles.methodItem}>
                    {method.id === 'applepay' ? (
                      <Image 
                        source={require('@/assets/images/image copy.png')} 
                        style={styles.methodApplePayLogo}
                        resizeMode="contain"
                      />
                    ) : (
                      <>
                        <Text style={styles.methodIcon}>{method.icon}</Text>
                        <Text style={styles.methodName}>{method.name}</Text>
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {renderRegionModal()}
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    marginTop: 8,
  },
  regionFlag: {
    fontSize: 14,
  },
  regionCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#999',
  },
  // Exclusive Drops Styles
  exclusiveSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exclusiveTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exclusiveSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countdownText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 4,
  },
  exclusiveSectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  exclusiveDropsContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  exclusiveDropCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    width: width * 0.85,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  exclusiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  collaborationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  collaborationText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  limitedBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  limitedText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  exclusiveImageContainer: {
    position: 'relative',
    height: 250,
  },
  exclusiveImage: {
    width: '100%',
    height: '100%',
  },
  stockOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  stockText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  stockBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginTop: 6,
  },
  stockProgress: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  priceOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    textAlign: 'center',
  },
  currentPrice: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exclusiveInfo: {
    padding: 16,
  },
  exclusiveProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandArtistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  exclusiveHeartButton: {
    padding: 4,
  },
  exclusiveProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  exclusiveSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  exclusiveRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exclusiveRating: {
    fontSize: 14,
    color: '#F59E0B',
    marginLeft: 4,
    fontWeight: '600',
    marginRight: 12,
  },
  releaseDate: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  exclusiveFeaturesSection: {
    marginBottom: 16,
  },
  exclusiveFeaturesTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  exclusiveFeaturesList: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  exclusiveFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  exclusiveFeatureBullet: {
    fontSize: 12,
    color: '#FF6B35',
    marginRight: 6,
  },
  exclusiveFeatureText: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
  },
  moreFeatures: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 4,
  },
  exclusivePurchaseSection: {
    marginTop: 16,
  },
  soldOutContainer: {
    alignItems: 'center',
    padding: 20,
  },
  soldOutText: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notifyButton: {
    backgroundColor: '#444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  notifyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  exclusivePriceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exclusiveCurrentPrice: {
    fontSize: 24,
    fontWeight:  'bold',
    color: '#10B981',
    marginRight: 8,
  },
  exclusiveOriginalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  urgencyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgencyText: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 2,
  },
  exclusivePaymentLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  productCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heartButton: {
    padding: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    marginLeft: 4,
    fontWeight: '600',
  },
  featuredTrack: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  featuredText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  videoSection: {
    marginBottom: 16,
  },
  compactVideoSection: {
    marginBottom: 12,
  },
  videoSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  compactVideoSectionTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  videoCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  compactVideoCarousel: {
    marginBottom: 6,
  },
  videoNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  videoNavLeft: {
    marginRight: -16,
  },
  videoNavRight: {
    marginLeft: -16,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  compactVideoContainer: {
    borderRadius: 8,
  },
  videoThumbnail: {
    width: '100%',
    height: 120,
  },
  compactVideoThumbnail: {
    height: 80,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactPlayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  compactVideoDuration: {
    bottom: 4,
    right: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  videoDurationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  compactVideoDurationText: {
    fontSize: 10,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactVerifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  verifiedText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  compactVerifiedText: {
    fontSize: 10,
  },
  videoInfo: {
    marginBottom: 8,
  },
  compactVideoInfo: {
    marginBottom: 6,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  compactVideoTitle: {
    fontSize: 12,
  },
  videoCreatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  videoCreator: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  compactVideoCreator: {
    fontSize: 10,
  },
  videoViews: {
    fontSize: 11,
    color: '#666',
  },
  compactVideoViews: {
    fontSize: 9,
  },
  videoIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  compactVideoIndicators: {
    gap: 4,
  },
  videoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  compactVideoIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeVideoIndicator: {
    backgroundColor: '#8B5CF6',
  },
  productFooter: {
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  compactPaymentGrid: {
    justifyContent: 'center',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
    gap: 6,
  },
  compactPaymentButton: {
    width: 36,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minWidth: 36,
  },
  processingButton: {
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.5,
  },
  paymentIcon: {
    fontSize: 16,
  },
  paymentText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  processingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  applePayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactApplePayContainer: {
    width: '100%',
    height: '100%',
  },
  applePayLogo: {
    width: 50,
    height: 20,
  },
  compactApplePayLogo: {
    width: 24,
    height: 12,
  },
  trendingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: 120,
  },
  trendingInfo: {
    padding: 12,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 12,
  },
  paymentInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  paymentInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  paymentInfoText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  supportedMethods: {
    alignItems: 'center',
  },
  supportedMethodsTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  methodsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  methodItem: {
    alignItems: 'center',
    gap: 4,
  },
  methodIcon: {
    fontSize: 20,
  },
  methodName: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  methodApplePayLogo: {
    width: 40,
    height: 16,
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
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
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
});