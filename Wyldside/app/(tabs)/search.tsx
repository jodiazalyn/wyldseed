import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Play, Heart, MessageCircle, Share, Volume2, VolumeX, Globe, ChevronDown, Check, Languages } from 'lucide-react-native';
import { MusicPlayer } from '@/components/MusicPlayer';
import { RegionLanguageSelector } from '@/components/RegionLanguageSelector';
import { useRegion } from '@/hooks/useRegionContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const { 
    selectedGeography, 
    selectedLanguage, 
    currentGeography, 
    languageOptions, 
    geographies, 
    setSelectedGeography, 
    setSelectedLanguage, 
    getUIText, 
    getSearchPlaceholder 
  } = useRegion();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const getTrendingByGeography = () => {
    const trendingByRegion = {
      US: {
        english: ["Travis Scott", "Off-White", "Lamborghini", "Drake", "Jordan 1", "Versace", "Future", "Supreme"],
        native: ["Travis Scott", "Off-White", "Lamborghini", "Drake", "Jordan 1", "Versace", "Future", "Supreme"]
      },
      ZA: {
        english: ["Amapiano", "Kabza De Small", "Nike Air Max", "Adidas Originals", "DJ Maphorisa", "Focalistic", "BMW", "Gucci"],
        native: ["Amapiano", "Kabza De Small", "Nike Air Max", "Adidas Originals", "DJ Maphorisa", "Focalistic", "BMW", "Gucci"]
      },
      SA: {
        english: ["Bad Bunny", "J Balvin", "Nike Dunk", "Balenciaga", "Anuel AA", "Ozuna", "Mercedes", "Louis Vuitton"],
        native: ["Bad Bunny", "J Balvin", "Nike Dunk", "Balenciaga", "Anuel AA", "Ozuna", "Mercedes", "Louis Vuitton"]
      },
      KR: {
        english: ["BTS", "Blackpink", "Nike x Peaceminusone", "Gentle Monster", "Stray Kids", "NewJeans", "Genesis", "Chanel"],
        native: ["방탄소년단", "블랙핑크", "Nike x Peaceminusone", "젠틀몬스터", "스트레이 키즈", "뉴진스", "제네시스", "샤넬"]
      },
      AE: {
        english: ["DIVINE", "Nucleya", "Jordan 1 High", "Sabyasachi", "Raftaar", "Badshah", "Lamborghini", "Cartier"],
        native: ["डिवाइन", "न्यूक्लिया", "जॉर्डन 1 हाई", "सब्यसाची", "रफ्तार", "बादशाह", "लैम्बोर्गिनी", "कार्टियर"]
      },
    };
    return trendingByRegion[selectedGeography]?.[selectedLanguage] || trendingByRegion.US.english;
  };

  const getCategoriesByGeography = () => {
    const categoriesByRegion = {
      US: {
        english: [
          { id: 1, name: "Hip Hop", color: "#8B5CF6", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 2, name: "Sneakers", color: "#F59E0B", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 3, name: "Luxury Cars", color: "#EF4444", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 4, name: "Designer Fashion", color: "#10B981", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 5, name: "R&B", color: "#F97316", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 6, name: "Watches", color: "#8B5CF6", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
        ],
        native: [
          { id: 1, name: "Hip Hop", color: "#8B5CF6", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 2, name: "Sneakers", color: "#F59E0B", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 3, name: "Luxury Cars", color: "#EF4444", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 4, name: "Designer Fashion", color: "#10B981", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 5, name: "R&B", color: "#F97316", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 6, name: "Watches", color: "#8B5CF6", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
        ]
      },
      ZA: {
        english: [
          { id: 1, name: "Amapiano", color: "#2E7D32", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "Afrobeats", color: "#F57C00", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 3, name: "Township Style", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "Local Brands", color: "#EF4444", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 5, name: "Gqom", color: "#7B1FA2", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
          { id: 6, name: "Street Culture", color: "#10B981", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
        ],
        native: [
          { id: 1, name: "Amapiano", color: "#2E7D32", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "Afrobeats", color: "#F57C00", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 3, name: "Township Style", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "Plaaslike Handelsmerke", color: "#EF4444", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 5, name: "Gqom", color: "#7B1FA2", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
          { id: 6, name: "Straat Kultuur", color: "#10B981", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
        ]
      },
      SA: {
        english: [
          { id: 1, name: "Reggaeton", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "Latin Trap", color: "#EF4444", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 3, name: "Cumbia", color: "#2E7D32", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
          { id: 4, name: "Street Fashion", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 5, name: "Luxury Brands", color: "#7B1FA2", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 6, name: "Football Culture", color: "#10B981", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
        ],
        native: [
          { id: 1, name: "Reggaetón", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "Trap Latino", color: "#EF4444", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 3, name: "Cumbia", color: "#2E7D32", image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg" },
          { id: 4, name: "Moda Urbana", color: "#8B5CF6", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 5, name: "Marcas de Lujo", color: "#7B1FA2", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 6, name: "Cultura Futbolística", color: "#10B981", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
        ]
      },
      KR: {
        english: [
          { id: 1, name: "K-Pop", color: "#E91E63", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 2, name: "K-Hip Hop", color: "#8B5CF6", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 3, name: "Korean Fashion", color: "#F57C00", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "Beauty", color: "#2E7D32", image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" },
          { id: 5, name: "Tech Style", color: "#1565C0", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 6, name: "Streetwear", color: "#7B1FA2", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
        ],
        native: [
          { id: 1, name: "케이팝", color: "#E91E63", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
          { id: 2, name: "케이힙합", color: "#8B5CF6", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 3, name: "한국 패션", color: "#F57C00", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "뷰티", color: "#2E7D32", image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" },
          { id: 5, name: "테크 스타일", color: "#1565C0", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
          { id: 6, name: "스트리트웨어", color: "#7B1FA2", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg" },
        ]
      },
      AE: {
        english: [
          { id: 1, name: "Bollywood Hip-Hop", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "Luxury Lifestyle", color: "#7B1FA2", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 3, name: "Traditional Fusion", color: "#2E7D32", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "Designer Wear", color: "#E91E63", image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" },
          { id: 5, name: "Supercars", color: "#EF4444", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 6, name: "High-End Jewelry", color: "#8B5CF6", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
        ],
        native: [
          { id: 1, name: "बॉलीवुड हिप-हॉप", color: "#F57C00", image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg" },
          { id: 2, name: "लक्जरी लाइफस्टाइल", color: "#7B1FA2", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 3, name: "पारंपरिक फ्यूजन", color: "#2E7D32", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg" },
          { id: 4, name: "डिजाइनर वियर", color: "#E91E63", image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" },
          { id: 5, name: "सुपरकार", color: "#EF4444", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
          { id: 6, name: "हाई-एंड ज्वेलरी", color: "#8B5CF6", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
        ]
      },
    };
    return categoriesByRegion[selectedGeography]?.[selectedLanguage] || categoriesByRegion.US.english;
  };

  const getViralStoriesByGeography = () => {
    const storiesByRegion = {
      US: {
        english: [
          {
            id: 1,
            creator: "@brooklyn_vibes",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
            title: "Jordan 1 Chicago Fit Check",
            description: "When you finally get the grails 🔥 #jordan1 #sneakerhead #ootd",
            likes: "127K",
            comments: "8.2K",
            shares: "15K",
            duration: "0:15",
            isVerified: true,
            tags: ["#jordan1", "#sneakerhead", "#ootd", "#chicago"],
            song: "God's Plan - Drake",
            location: "Brooklyn, NY"
          },
          {
            id: 2,
            creator: "@luxury_lifestyle",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
            title: "McLaren 720S Sound Check",
            description: "This sound never gets old 🏎️💨 #mclaren #supercar #luxury",
            likes: "89K",
            comments: "5.1K",
            shares: "12K",
            duration: "0:12",
            isVerified: true,
            tags: ["#mclaren", "#supercar", "#luxury", "#carsoftiktok"],
            song: "Sicko Mode - Travis Scott",
            location: "Los Angeles, CA"
          },
        ],
        native: [
          {
            id: 1,
            creator: "@brooklyn_vibes",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
            title: "Jordan 1 Chicago Fit Check",
            description: "When you finally get the grails 🔥 #jordan1 #sneakerhead #ootd",
            likes: "127K",
            comments: "8.2K",
            shares: "15K",
            duration: "0:15",
            isVerified: true,
            tags: ["#jordan1", "#sneakerhead", "#ootd", "#chicago"],
            song: "God's Plan - Drake",
            location: "Brooklyn, NY"
          },
          {
            id: 2,
            creator: "@luxury_lifestyle",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
            title: "McLaren 720S Sound Check",
            description: "This sound never gets old 🏎️💨 #mclaren #supercar #luxury",
            likes: "89K",
            comments: "5.1K",
            shares: "12K",
            duration: "0:12",
            isVerified: true,
            tags: ["#mclaren", "#supercar", "#luxury", "#carsoftiktok"],
            song: "Sicko Mode - Travis Scott",
            location: "Los Angeles, CA"
          },
        ]
      },
      ZA: {
        english: [
          {
            id: 1,
            creator: "@amapiano_king",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Amapiano Dance Challenge",
            description: "Teaching the latest moves from Joburg 🕺🇿🇦 #amapiano #dance #southafrica",
            likes: "234K",
            comments: "12.5K",
            shares: "28K",
            duration: "0:22",
            isVerified: true,
            tags: ["#amapiano", "#dance", "#southafrica", "#joburg"],
            song: "Ke Star - Focalistic ft. Davido",
            location: "Johannesburg, ZA"
          },
          {
            id: 2,
            creator: "@township_style",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
            title: "Township Fashion Week",
            description: "Local designers making waves 👗✨ #fashion #township #southafrica",
            likes: "156K",
            comments: "9.8K",
            shares: "22K",
            duration: "0:18",
            isVerified: false,
            tags: ["#fashion", "#township", "#southafrica", "#local"],
            song: "Jerusalema - Master KG",
            location: "Cape Town, ZA"
          },
        ],
        native: [
          {
            id: 1,
            creator: "@amapiano_king",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Amapiano Dans Uitdaging",
            description: "Leer die nuutste bewegings van Joburg 🕺🇿🇦 #amapiano #dans #suidafrika",
            likes: "234K",
            comments: "12.5K",
            shares: "28K",
            duration: "0:22",
            isVerified: true,
            tags: ["#amapiano", "#dans", "#suidafrika", "#joburg"],
            song: "Ke Star - Focalistic ft. Davido",
            location: "Johannesburg, ZA"
          },
          {
            id: 2,
            creator: "@township_style",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
            title: "Township Mode Week",
            description: "Plaaslike ontwerpers maak golwe 👗✨ #mode #township #suidafrika",
            likes: "156K",
            comments: "9.8K",
            shares: "22K",
            duration: "0:18",
            isVerified: false,
            tags: ["#mode", "#township", "#suidafrika", "#plaaslik"],
            song: "Jerusalema - Master KG",
            location: "Cape Town, ZA"
          },
        ]
      },
      SA: {
        english: [
          {
            id: 1,
            creator: "@reggaeton_vida",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Perreo en la Playa",
            description: "Summer vibes in Colombia 🌴🔥 #reggaeton #colombia #perreo",
            likes: "189K",
            comments: "11.2K",
            shares: "25K",
            duration: "0:20",
            isVerified: true,
            tags: ["#reggaeton", "#colombia", "#perreo", "#summer"],
            song: "Con Altura - Rosalía ft. J Balvin",
            location: "Medellín, CO"
          },
          {
            id: 2,
            creator: "@trap_latino",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            title: "Studio Session Buenos Aires",
            description: "Recording the next hit 🎤🇦🇷 #trap #argentina #studio",
            likes: "145K",
            comments: "8.7K",
            shares: "19K",
            duration: "0:25",
            isVerified: true,
            tags: ["#trap", "#argentina", "#studio", "#hiphop"],
            song: "Bzrp Music Sessions - Bizarrap",
            location: "Buenos Aires, AR"
          },
        ],
        native: [
          {
            id: 1,
            creator: "@reggaeton_vida",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Perreo en la Playa",
            description: "Vibes de verano en Colombia 🌴🔥 #reggaeton #colombia #perreo",
            likes: "189K",
            comments: "11.2K",
            shares: "25K",
            duration: "0:20",
            isVerified: true,
            tags: ["#reggaeton", "#colombia", "#perreo", "#verano"],
            song: "Con Altura - Rosalía ft. J Balvin",
            location: "Medellín, CO"
          },
          {
            id: 2,
            creator: "@trap_latino",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            title: "Sesión de Estudio Buenos Aires",
            description: "Grabando el próximo hit 🎤🇦🇷 #trap #argentina #estudio",
            likes: "145K",
            comments: "8.7K",
            shares: "19K",
            duration: "0:25",
            isVerified: true,
            tags: ["#trap", "#argentina", "#estudio", "#hiphop"],
            song: "Bzrp Music Sessions - Bizarrap",
            location: "Buenos Aires, AR"
          },
        ]
      },
      KR: {
        english: [
          {
            id: 1,
            creator: "@seoul_fashion",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
            title: "Hongdae Street Style",
            description: "Korean fashion hits different 🇰🇷✨ #koreanfashion #hongdae #seoul",
            likes: "312K",
            comments: "18.9K",
            shares: "45K",
            duration: "0:16",
            isVerified: true,
            tags: ["#koreanfashion", "#hongdae", "#seoul", "#kfashion"],
            song: "Dynamite - BTS",
            location: "Seoul, KR"
          },
          {
            id: 2,
            creator: "@khiphop_scene",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Show Me The Money Vibes",
            description: "Korean hip-hop culture 🎤🔥 #khiphop #showmethemoney #korea",
            likes: "267K",
            comments: "15.4K",
            shares: "38K",
            duration: "0:24",
            isVerified: true,
            tags: ["#khiphop", "#showmethemoney", "#korea", "#rap"],
            song: "Daechwita - Agust D",
            location: "Gangnam, KR"
          },
        ],
        native: [
          {
            id: 1,
            creator: "@seoul_fashion",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
            title: "홍대 스트리트 스타일",
            description: "한국 패션은 다르다 🇰🇷✨ #한국패션 #홍대 #서울",
            likes: "312K",
            comments: "18.9K",
            shares: "45K",
            duration: "0:16",
            isVerified: true,
            tags: ["#한국패션", "#홍대", "#서울", "#케이패션"],
            song: "Dynamite - BTS",
            location: "Seoul, KR"
          },
          {
            id: 2,
            creator: "@khiphop_scene",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "쇼미더머니 바이브",
            description: "한국 힙합 문화 🎤🔥 #케이힙합 #쇼미더머니 #한국",
            likes: "267K",
            comments: "15.4K",
            shares: "38K",
            duration: "0:24",
            isVerified: true,
            tags: ["#케이힙합", "#쇼미더머니", "#한국", "#랩"],
            song: "대취타 - Agust D",
            location: "Gangnam, KR"
          },
        ]
      },
      AE: {
        english: [
          {
            id: 1,
            creator: "@mumbai_hip_hop",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "Gully Boy Vibes",
            description: "Mumbai rap scene going global 🇮🇳🎤 #gullyboy #mumbai #indianhiphop",
            likes: "445K",
            comments: "28.7K",
            shares: "67K",
            duration: "0:28",
            isVerified: true,
            tags: ["#gullyboy", "#mumbai", "#indianhiphop", "#divine"],
            song: "Apna Time Aayega - DIVINE",
            location: "Mumbai, IN"
          },
          {
            id: 2,
            creator: "@dubai_luxury",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
            title: "Dubai Lifestyle",
            description: "Living the dream in the UAE 🏙️💎 #dubai #luxury #uae",
            likes: "356K",
            comments: "21.3K",
            shares: "52K",
            duration: "0:19",
            isVerified: true,
            tags: ["#dubai", "#luxury", "#uae", "#lifestyle"],
            song: "Millionaire - Yo Yo Honey Singh",
            location: "Dubai, AE"
          },
        ],
        native: [
          {
            id: 1,
            creator: "@mumbai_hip_hop",
            avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
            video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            title: "गली बॉय वाइब्स",
            description: "मुंबई रैप सीन ग्लोबल हो रहा है 🇮🇳🎤 #गलीबॉय #मुंबई #इंडियनहिपहॉप",
            likes: "445K",
            comments: "28.7K",
            shares: "67K",
            duration: "0:28",
            isVerified: true,
            tags: ["#गलीबॉय", "#मुंबई", "#इंडियनहिपहॉप", "#डिवाइन"],
            song: "अपना टाइम आएगा - DIVINE",
            location: "Mumbai, IN"
          },
          {
            id: 2,
            creator: "@dubai_luxury",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
            title: "दुबई लाइफस्टाइल",
            description: "यूएई में सपने जी रहे हैं 🏙️💎 #दुबई #लक्जरी #यूएई",
            likes: "356K",
            comments: "21.3K",
            shares: "52K",
            duration: "0:19",
            isVerified: true,
            tags: ["#दुबई", "#लक्जरी", "#यूएई", "#लाइफस्टाइल"],
            song: "मिलियनेयर - Yo Yo Honey Singh",
            location: "Dubai, AE"
          },
        ]
      }
    };
    return storiesByRegion[selectedGeography]?.[selectedLanguage] || storiesByRegion.US.english;
  };

  const trendingSearches = getTrendingByGeography();
  const categories = getCategoriesByGeography();
  const viralStories = getViralStoriesByGeography();

  // Modal functions removed - now using global RegionLanguageSelector component

  const renderStoryCard = (story: any, index: number) => (
    <TouchableOpacity
      key={story.id}
      style={[
        styles.storyCard,
        index === activeStoryIndex && styles.activeStoryCard
      ]}
      onPress={() => setActiveStoryIndex(index)}
    >
      <Image source={{ uri: story.video }} style={styles.storyThumbnail} />
      
      {/* Play button overlay */}
      <View style={styles.storyOverlay}>
        <Play size={24} color="#fff" fill="#fff" />
      </View>

      {/* Duration badge */}
      <View style={styles.storyDuration}>
        <Text style={styles.storyDurationText}>{story.duration}</Text>
      </View>

      {/* Creator info */}
      <View style={styles.storyCreatorInfo}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
        <Text style={styles.storyCreatorName} numberOfLines={1}>{story.creator}</Text>
        {story.isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>✓</Text>
          </View>
        )}
      </View>

      {/* Location badge */}
      <View style={styles.locationBadge}>
        <Text style={styles.locationText}>{story.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderActiveStory = () => {
    const story = viralStories[activeStoryIndex];
    
    return (
      <View style={styles.activeStoryContainer}>
        <Image source={{ uri: story.video }} style={styles.activeStoryVideo} />
        
        {/* Video controls overlay */}
        <View style={styles.videoControlsOverlay}>
          <TouchableOpacity style={styles.playButtonLarge}>
            <Play size={32} color="#fff" fill="#fff" />
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
        </View>

        {/* Story info overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.storyInfoOverlay}
        >
          <View style={styles.storyHeader}>
            <View style={styles.creatorSection}>
              <Image source={{ uri: story.avatar }} style={styles.activeStoryAvatar} />
              <View style={styles.creatorDetails}>
                <View style={styles.creatorNameRow}>
                  <Text style={styles.activeStoryCreator}>{story.creator}</Text>
                  {story.isVerified && (
                    <View style={styles.verifiedBadgeLarge}>
                      <Text style={styles.verifiedIconLarge}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyLocation}>📍 {story.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.storyContent}>
            <Text style={styles.storyDescription}>{story.description}</Text>
            
            <View style={styles.storyTags}>
              {story.tags.map((tag, index) => (
                <TouchableOpacity key={index} style={styles.tagButton}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.songInfo}>
              <Text style={styles.songText}>🎵 {story.song}</Text>
            </View>
          </View>

          <View style={styles.storyActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart size={28} color="#fff" />
              <Text style={styles.actionText}>{story.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={28} color="#fff" />
              <Text style={styles.actionText}>{story.comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share size={28} color="#fff" />
              <Text style={styles.actionText}>{story.shares}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Progress indicators */}
        <View style={styles.progressContainer}>
          {viralStories.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                index === activeStoryIndex && styles.activeProgressBar
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  // Using global getUIText and getSearchPlaceholder from useRegion hook

  const uiText = getUIText();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{uiText.search}</Text>
          <RegionLanguageSelector />
        </View>
        
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={getSearchPlaceholder()}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {!searchQuery && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={20} color="#F59E0B" />
                <Text style={styles.sectionTitle}>{uiText.trending} {currentGeography.name}</Text>
              </View>
              <View style={styles.trendingContainer}>
                {trendingSearches.map((term, index) => (
                  <TouchableOpacity key={index} style={styles.trendingTag}>
                    <Text style={styles.trendingText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{uiText.viralCulture}</Text>
              <Text style={styles.sectionSubtitle}>{uiText.seeWhatsTrending} {currentGeography.name}</Text>
              
              {/* Stories carousel */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.storiesCarousel}
              >
                {viralStories.map((story, index) => renderStoryCard(story, index))}
              </ScrollView>

              {/* Active story display */}
              {renderActiveStory()}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{uiText.browseCategories}</Text>
              <Text style={styles.sectionSubtitle}>{uiText.popularIn} {currentGeography.name}</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.regionInfo}>
                <Text style={styles.regionInfoTitle}>🌍 {uiText.exploring} {currentGeography.name}</Text>
                <Text style={styles.regionInfoText}>{currentGeography.description}. {uiText.regionDescription} {currentGeography.name} {uiText.musicScene}</Text>
              </View>
            </View>
          </>
        )}

        {searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results in {currentGeography.name}</Text>
            <View style={styles.noResults}>
              <SearchIcon size={48} color="#666" />
              <Text style={styles.noResultsText}>Start typing to search for music and products in {currentGeography.name}</Text>
            </View>
          </View>
        )}
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  geographySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  geographyFlag: {
    fontSize: 16,
  },
  geographyCode: {
    fontSize: 14,
    fontWeight: '600',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 100, // Add padding for music player
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
    marginTop: -8,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendingTag: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  trendingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  storiesCarousel: {
    marginBottom: 20,
  },
  storyCard: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeStoryCard: {
    borderColor: '#8B5CF6',
    transform: [{ scale: 1.05 }],
  },
  storyThumbnail: {
    width: '100%',
    height: '100%',
  },
  storyOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyDuration: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  storyDurationText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  storyCreatorInfo: {
    position: 'absolute',
    bottom: 24,
    left: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  storyCreatorName: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
  verifiedBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  locationBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  locationText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeStoryContainer: {
    width: '100%',
    height: height * 0.6,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  activeStoryVideo: {
    width: '100%',
    height: '100%',
  },
  videoControlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  storyHeader: {
    marginBottom: 12,
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeStoryAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeStoryCreator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 6,
  },
  verifiedBadgeLarge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIconLarge: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  storyTitle: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 2,
  },
  storyLocation: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 2,
  },
  storyContent: {
    marginBottom: 16,
  },
  storyDescription: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 12,
  },
  storyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tagButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  songInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  songText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  storyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  progressContainer: {
    position: 'absolute',
    top: 12,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  activeProgressBar: {
    backgroundColor: '#8B5CF6',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryImage: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 60,
    height: 60,
    borderRadius: 8,
    opacity: 0.7,
  },
  regionInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#444',
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
    marginBottom: 16,
  },
  switchRegionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
  },
  switchRegionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
  // Geography Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  geographyList: {
    maxHeight: 400,
  },
  geographyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderLeftWidth: 4,
  },
  selectedGeographyItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  geographyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  geographyDetails: {
    marginLeft: 12,
    flex: 1,
  },
  geographyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  geographyDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
    marginBottom: 2,
  },
  geographyLanguage: {
    fontSize: 11,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  // Language Modal
  languageModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '80%',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  languageOptions: {
    padding: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  selectedLanguageOption: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});