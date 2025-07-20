import { Car, Users, TrendingUp, Flame, Crown, Zap, Award } from 'lucide-react-native';
import CategoryFeedScreen from '@/components/CategoryFeedScreen';

export default function CarsScreen() {
  const filters = [
    { id: 'all', name: 'All', icon: Users },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'supercars', name: 'Supercars', icon: Zap },
    { id: 'luxury', name: 'Luxury', icon: Crown },
    { id: 'classics', name: 'Classics', icon: Award },
    { id: 'tuned', name: 'Tuned', icon: Flame },
  ];

  const initialPosts = [
    {
      id: 1,
      type: 'video',
      user: {
        name: 'SupercarSpotter',
        username: '@supercar_spotter',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
        verified: true,
        followers: 125000,
        isFollowing: false,
      },
      content: 'McLaren 720S hitting the streets of Monaco 🏎️💨',
      location: 'Monaco, Monte Carlo',
      timestamp: '2h ago',
      likes: 15420,
      comments: 892,
      shares: 234,
      views: 89500,
      isLiked: false,
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
        duration: '0:45',
      },
      item: {
        make: 'McLaren',
        model: '720S',
        year: 2023,
        name: '2023 McLaren 720S',
        price: '$315,000',
        specs: ['710 HP', '0-60: 2.8s', 'Top Speed: 212 mph'],
        forSale: true,
        seller: '@luxury_motors_monaco',
      },
      tags: ['#mclaren', '#supercar', '#monaco', '#luxury'],
    },
    {
      id: 2,
      type: 'photo',
      user: {
        name: 'Luxury Motors',
        username: '@luxury_motors',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
        verified: true,
        followers: 89000,
        isFollowing: true,
      },
      content: 'Just arrived: 2024 Lamborghini Huracán STO. This beast is ready for its new owner! 🔥',
      location: 'Beverly Hills, CA',
      timestamp: '4h ago',
      likes: 8934,
      comments: 456,
      shares: 123,
      views: 45600,
      isLiked: true,
      media: {
        type: 'photo',
        url: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
      },
      item: {
        make: 'Lamborghini',
        model: 'Huracán STO',
        year: 2024,
        name: '2024 Lamborghini Huracán STO',
        price: '$327,838',
        specs: ['630 HP', '0-60: 3.0s', 'Top Speed: 193 mph'],
        forSale: true,
        seller: '@luxury_motors',
      },
      tags: ['#lamborghini', '#huracan', '#forsale', '#supercar'],
    },
    {
      id: 3,
      type: 'photo',
      user: {
        name: 'Classic Car Collector',
        username: '@classic_collector',
        avatar: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
        verified: false,
        followers: 23400,
        isFollowing: false,
      },
      content: 'Restored 1967 Shelby GT500. 2 years of work finally paid off! 🏁',
      location: 'Detroit, MI',
      timestamp: '6h ago',
      likes: 5678,
      comments: 234,
      shares: 89,
      views: 28900,
      isLiked: false,
      media: {
        type: 'photo',
        url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      },
      item: {
        make: 'Shelby',
        model: 'GT500',
        year: 1967,
        name: '1967 Shelby GT500',
        price: '$185,000',
        specs: ['428 HP', 'Manual', 'Fully Restored'],
        forSale: false,
        seller: null,
      },
      tags: ['#shelby', '#classic', '#restoration', '#mustang'],
    },
  ];

  const initialMarketplaceItems = [
    {
      id: 1,
      name: '2022 Ferrari 488 GTB',
      price: '$280,000',
      description: '2,500 miles',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
      seller: {
        name: 'Elite Motors',
        rating: 4.9,
        verified: true,
      },
      specs: ['661 HP', '0-60: 3.0s', 'V8 Twin-Turbo'],
      featured: true,
    },
    {
      id: 2,
      name: '2023 Porsche 911 Turbo S',
      price: '$230,000',
      description: '1,200 miles',
      location: 'Miami, FL',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      seller: {
        name: 'Porsche Miami',
        rating: 4.8,
        verified: true,
      },
      specs: ['640 HP', '0-60: 2.6s', 'AWD'],
      featured: false,
    },
    {
      id: 3,
      name: '2021 Aston Martin DB11',
      price: '$195,000',
      description: '8,900 miles',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
      seller: {
        name: 'Manhattan Motors',
        rating: 4.7,
        verified: true,
      },
      specs: ['630 HP', '0-60: 3.7s', 'V12'],
      featured: false,
    },
  ];

  return (
    <CategoryFeedScreen
      categoryName="Cars"
      categoryIcon={Car}
      initialPosts={initialPosts}
      initialMarketplaceItems={initialMarketplaceItems}
      filters={filters}
    />
  );
}