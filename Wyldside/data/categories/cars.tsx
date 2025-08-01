import { Users, TrendingUp, Zap, Crown, Award, Flame, Battery, ShoppingCart } from 'lucide-react-native';

export const carsData = {
  posts: [
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
      car: {
        make: 'McLaren',
        model: '720S',
        year: 2023,
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
      car: {
        make: 'Lamborghini',
        model: 'Huracán STO',
        year: 2024,
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
      car: {
        make: 'Shelby',
        model: 'GT500',
        year: 1967,
        price: '$185,000',
        specs: ['428 HP', 'Manual', 'Fully Restored'],
        forSale: false,
        seller: null,
      },
      tags: ['#shelby', '#classic', '#restoration', '#mustang'],
    },
    {
      id: 4,
      type: 'video',
      user: {
        name: 'Street Racing King',
        username: '@street_racing_king',
        avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
        verified: true,
        followers: 156000,
        isFollowing: false,
      },
      content: 'Nissan GT-R R35 vs Porsche 911 Turbo S drag race! 🏁⚡',
      location: 'Las Vegas, NV',
      timestamp: '8h ago',
      likes: 12340,
      comments: 567,
      shares: 189,
      views: 67800,
      isLiked: true,
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
        duration: '1:23',
      },
      car: {
        make: 'Nissan',
        model: 'GT-R R35',
        year: 2022,
        price: '$115,000',
        specs: ['565 HP', '0-60: 2.9s', 'AWD'],
        forSale: false,
        seller: null,
      },
      tags: ['#gtr', '#porsche', '#dragrace', '#vegas'],
    },
    {
      id: 5,
      type: 'photo',
      user: {
        name: 'Euro Car Enthusiast',
        username: '@euro_car_fan',
        avatar: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
        verified: false,
        followers: 78900,
        isFollowing: true,
      },
      content: 'BMW M4 Competition in Alpine White. Perfect spec! 🤍',
      location: 'Munich, Germany',
      timestamp: '12h ago',
      likes: 7890,
      comments: 234,
      shares: 67,
      views: 34500,
      isLiked: false,
      media: {
        type: 'photo',
        url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
      },
      car: {
        make: 'BMW',
        model: 'M4 Competition',
        year: 2023,
        price: '$78,000',
        specs: ['503 HP', '0-60: 3.8s', 'RWD'],
        forSale: true,
        seller: '@euro_car_fan',
      },
      tags: ['#bmw', '#m4', '#competition', '#germany'],
    },
  ],
  marketplaceItems: [
    {
      id: 1,
      make: 'Ferrari',
      model: '488 GTB',
      year: 2022,
      price: '$280,000',
      mileage: '2,500 miles',
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
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: '$230,000',
      mileage: '1,200 miles',
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
      make: 'Aston Martin',
      model: 'DB11',
      year: 2021,
      price: '$195,000',
      mileage: '8,900 miles',
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
    {
      id: 4,
      make: 'Lamborghini',
      model: 'Aventador SVJ',
      year: 2020,
      price: '$450,000',
      mileage: '3,800 miles',
      location: 'Beverly Hills, CA',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
      seller: {
        name: 'Luxury Auto Gallery',
        rating: 4.9,
        verified: true,
      },
      specs: ['759 HP', '0-60: 2.8s', 'V12 Naturally Aspirated'],
      featured: true,
    },
    {
      id: 5,
      make: 'McLaren',
      model: '765LT',
      year: 2021,
      price: '$385,000',
      mileage: '1,500 miles',
      location: 'Dallas, TX',
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
      seller: {
        name: 'McLaren Dallas',
        rating: 4.8,
        verified: true,
      },
      specs: ['755 HP', '0-60: 2.7s', 'V8 Twin-Turbo'],
      featured: false,
    },
    {
      id: 6,
      make: 'Bugatti',
      model: 'Chiron',
      year: 2019,
      price: '$2,800,000',
      mileage: '1,200 miles',
      location: 'Monaco',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg',
      seller: {
        name: 'Monaco Luxury Cars',
        rating: 5.0,
        verified: true,
      },
      specs: ['1479 HP', '0-60: 2.4s', 'W16 Quad-Turbo'],
      featured: true,
    },
  ],
  filters: [
    { id: 'all', name: 'All', icon: Users },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'supercars', name: 'Supercars', icon: Zap },
    { id: 'luxury', name: 'Luxury', icon: Crown },
    { id: 'classics', name: 'Classics', icon: Award },
    { id: 'tuned', name: 'Tuned', icon: Flame },
    { id: 'electric', name: 'Electric', icon: Battery },
    { id: 'forsale', name: 'For Sale', icon: ShoppingCart },
  ],
};