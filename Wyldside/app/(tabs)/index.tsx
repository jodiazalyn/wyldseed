import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus, Heart, Globe, ChevronDown, Check, Volume2, VolumeX } from 'lucide-react-native';
import { MusicPlayer } from '@/components/MusicPlayer';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showCountryModal, setShowCountryModal] = useState(false);
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

  const countries = [
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

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  // Featured music tile
  const featuredMusicTile = {
    id: 'music',
    title: 'Music',
    image: 'https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif', // Animated music visualizer GIF
    color: '#8B5CF6',
  };

  // Spotify-style browse tiles
  const browseTiles = [
    {
      id: 1,
      title: 'Hip Hop Central',
      color: '#E91E63',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    },
    {
      id: 2,
      title: 'Luxury Lifestyle',
      color: '#2E7D32',
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
    },
    {
      id: 3,
      title: 'Street Fashion',
      color: '#1565C0',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    },
    {
      id: 4,
      title: 'Culture Vibes',
      color: '#7B1FA2',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    },
  ];

  // Culture videos by country
  const getCultureVideos = () => {
    const videosByCountry = {
      US: [
        {
          id: 1,
          creator: "@brooklyn_vibes",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "NYC Street Culture",
          description: "Walking through Brooklyn with the freshest fits 🗽",
          location: "Brooklyn, NY",
          views: "2.1M",
          duration: "0:24"
        },
        {
          id: 2,
          creator: "@la_lifestyle",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          title: "LA Car Culture",
          description: "Sunset strip vibes with the McLaren 🌅",
          location: "Los Angeles, CA",
          views: "1.8M",
          duration: "0:18"
        },
        {
          id: 3,
          creator: "@atlanta_trap",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "ATL Studio Session",
          description: "Behind the scenes in the trap capital 🎤",
          location: "Atlanta, GA",
          views: "3.2M",
          duration: "0:31"
        }
      ],
      UK: [
        {
          id: 1,
          creator: "@london_grime",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "East London Vibes",
          description: "Grime scene in Hackney 🇬🇧",
          location: "London, UK",
          views: "890K",
          duration: "0:22"
        },
        {
          id: 2,
          creator: "@manchester_scene",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Northern Quarter",
          description: "Manchester's music heritage 🎵",
          location: "Manchester, UK",
          views: "567K",
          duration: "0:19"
        },
        {
          id: 3,
          creator: "@birmingham_drill",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          title: "Birmingham Drill",
          description: "UK drill scene representation 🔥",
          location: "Birmingham, UK",
          views: "1.2M",
          duration: "0:27"
        }
      ],
      CA: [
        {
          id: 1,
          creator: "@toronto_6ix",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "The 6ix Culture",
          description: "Toronto's hip-hop scene 🍁",
          location: "Toronto, ON",
          views: "1.5M",
          duration: "0:26"
        },
        {
          id: 2,
          creator: "@vancouver_vibes",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "West Coast Canada",
          description: "Vancouver street style 🏔️",
          location: "Vancouver, BC",
          views: "723K",
          duration: "0:20"
        },
        {
          id: 3,
          creator: "@montreal_scene",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          title: "Montreal Hip-Hop",
          description: "French-Canadian rap culture 🎤",
          location: "Montreal, QC",
          views: "456K",
          duration: "0:23"
        }
      ],
      AU: [
        {
          id: 1,
          creator: "@sydney_surf",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
          title: "Bondi Beach Culture",
          description: "Surf meets street style 🏄‍♂️",
          location: "Sydney, AU",
          views: "1.1M",
          duration: "0:21"
        },
        {
          id: 2,
          creator: "@melbourne_lanes",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Melbourne Street Art",
          description: "Laneway culture and music 🎨",
          location: "Melbourne, AU",
          views: "834K",
          duration: "0:25"
        },
        {
          id: 3,
          creator: "@brisbane_beats",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "Queensland Vibes",
          description: "Brisbane's emerging scene 🌴",
          location: "Brisbane, AU",
          views: "512K",
          duration: "0:18"
        }
      ],
      DE: [
        {
          id: 1,
          creator: "@berlin_techno",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Berlin Underground",
          description: "Techno meets hip-hop culture 🎧",
          location: "Berlin, DE",
          views: "967K",
          duration: "0:29"
        },
        {
          id: 2,
          creator: "@hamburg_harbor",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
          title: "Hamburg Street Style",
          description: "Northern German fashion 🧥",
          location: "Hamburg, DE",
          views: "645K",
          duration: "0:22"
        },
        {
          id: 3,
          creator: "@munich_luxury",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
          title: "Munich Lifestyle",
          description: "Bavarian luxury culture 🏰",
          location: "Munich, DE",
          views: "789K",
          duration: "0:24"
        }
      ],
      FR: [
        {
          id: 1,
          creator: "@paris_fashion",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          title: "Parisian Elegance",
          description: "Fashion week street style 👗",
          location: "Paris, FR",
          views: "1.8M",
          duration: "0:26"
        },
        {
          id: 2,
          creator: "@marseille_rap",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Marseille Hip-Hop",
          description: "Southern French rap scene 🎤",
          location: "Marseille, FR",
          views: "1.2M",
          duration: "0:23"
        },
        {
          id: 3,
          creator: "@lyon_culture",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "Lyon Underground",
          description: "French alternative culture 🎨",
          location: "Lyon, FR",
          views: "567K",
          duration: "0:20"
        }
      ],
      JP: [
        {
          id: 1,
          creator: "@tokyo_harajuku",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
          title: "Harajuku Fashion",
          description: "Tokyo street fashion culture 🌈",
          location: "Tokyo, JP",
          views: "2.3M",
          duration: "0:28"
        },
        {
          id: 2,
          creator: "@osaka_street",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Osaka Vibes",
          description: "Kansai region culture 🏮",
          location: "Osaka, JP",
          views: "1.1M",
          duration: "0:22"
        },
        {
          id: 3,
          creator: "@kyoto_traditional",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "Modern Kyoto",
          description: "Traditional meets contemporary 🏯",
          location: "Kyoto, JP",
          views: "876K",
          duration: "0:25"
        }
      ],
      BR: [
        {
          id: 1,
          creator: "@rio_favela",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Rio Funk Culture",
          description: "Favela funk movement 🇧🇷",
          location: "Rio de Janeiro, BR",
          views: "3.1M",
          duration: "0:30"
        },
        {
          id: 2,
          creator: "@sao_paulo_trap",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "São Paulo Streets",
          description: "Brazilian trap scene 🏙️",
          location: "São Paulo, BR",
          views: "2.4M",
          duration: "0:27"
        },
        {
          id: 3,
          creator: "@salvador_axe",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          title: "Salvador Carnival",
          description: "Bahian music culture 🎭",
          location: "Salvador, BR",
          views: "1.7M",
          duration: "0:24"
        }
      ],
      MX: [
        {
          id: 1,
          creator: "@mexico_city_trap",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "CDMX Trap Scene",
          description: "Mexico City urban culture 🇲🇽",
          location: "Mexico City, MX",
          views: "1.9M",
          duration: "0:26"
        },
        {
          id: 2,
          creator: "@guadalajara_mariachi",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "Modern Mariachi",
          description: "Traditional meets urban 🎺",
          location: "Guadalajara, MX",
          views: "1.3M",
          duration: "0:23"
        },
        {
          id: 3,
          creator: "@tijuana_border",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          title: "Border Culture",
          description: "Tijuana's unique vibe 🌮",
          location: "Tijuana, MX",
          views: "987K",
          duration: "0:21"
        }
      ],
      IN: [
        {
          id: 1,
          creator: "@mumbai_bollywood",
          avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
          video: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          title: "Mumbai Hip-Hop",
          description: "Bollywood meets rap culture 🎬",
          location: "Mumbai, IN",
          views: "2.8M",
          duration: "0:29"
        },
        {
          id: 2,
          creator: "@delhi_street",
          avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
          video: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          title: "Delhi Street Style",
          description: "Capital city fashion 🏛️",
          location: "New Delhi, IN",
          views: "1.6M",
          duration: "0:24"
        },
        {
          id: 3,
          creator: "@bangalore_tech",
          avatar: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
          video: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
          title: "Bangalore Beats",
          description: "Tech city music scene 💻",
          location: "Bangalore, IN",
          views: "1.1M",
          duration: "0:22"
        }
      ]
    };

    return videosByCountry[selectedCountry as keyof typeof videosByCountry] || videosByCountry.US;
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
          {
            id: 3,
            title: "Money Trees",
            artist: "Kendrick Lamar ft. Jay Rock",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Louis Vuitton Hoodie",
            price: "$980",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Life Is Good",
            artist: "Future ft. Drake",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Sicko Mode",
            artist: "Travis Scott",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      UK: {
        greeting: "Good evening",
        subtitle: "What's the mood tonight?",
        featuredSongs: [
          {
            id: 1,
            title: "Shut Up",
            artist: "Stormzy",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Stone Island Jacket",
            price: "£450",
          },
          {
            id: 2,
            title: "Ladbroke Grove",
            artist: "AJ Tracey",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Nike Air Max 95",
            price: "£140",
          },
          {
            id: 3,
            title: "Thiago Silva",
            artist: "Dave ft. AJ Tracey",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Trapstar Tracksuit",
            price: "£180",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Location",
            artist: "Dave ft. Burna Boy",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Funky Friday",
            artist: "Dave ft. Fredo",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      CA: {
        greeting: "Good evening",
        subtitle: "What's the vibe, eh?",
        featuredSongs: [
          {
            id: 1,
            title: "Started From The Bottom",
            artist: "Drake",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Canada Goose Parka",
            price: "C$1,200",
          },
          {
            id: 2,
            title: "The Hills",
            artist: "The Weeknd",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "OVO Hoodie",
            price: "C$150",
          },
          {
            id: 3,
            title: "Blinding Lights",
            artist: "The Weeknd",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Roots Sweatpants",
            price: "C$80",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Hotline Bling",
            artist: "Drake",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Can't Feel My Face",
            artist: "The Weeknd",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      AU: {
        greeting: "G'day",
        subtitle: "What's the vibe today, mate?",
        featuredSongs: [
          {
            id: 1,
            title: "The Kids",
            artist: "Eminem",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Billabong Board Shorts",
            price: "A$89",
          },
          {
            id: 2,
            title: "Papercuts",
            artist: "Illy",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Quiksilver Wetsuit",
            price: "A$320",
          },
          {
            id: 3,
            title: "1955",
            artist: "Hilltop Hoods",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Rip Curl Snapback",
            price: "A$45",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Cosby Sweater",
            artist: "Hilltop Hoods",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Dumb Things",
            artist: "Paul Kelly",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      DE: {
        greeting: "Guten Abend",
        subtitle: "Was ist heute die Stimmung?",
        featuredSongs: [
          {
            id: 1,
            title: "Ohne mein Team",
            artist: "Bonez MC & RAF Camora",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Adidas Originals Tracksuit",
            price: "€120",
          },
          {
            id: 2,
            title: "Standard",
            artist: "KitschKrieg ft. Trettmann",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Stone Island Beanie",
            price: "€85",
          },
          {
            id: 3,
            title: "Palmen aus Plastik",
            artist: "Bonez MC & RAF Camora",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Hugo Boss Sneakers",
            price: "€180",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "500 PS",
            artist: "Bonez MC & RAF Camora",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Kokain",
            artist: "Bonez MC & RAF Camora",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      FR: {
        greeting: "Bonsoir",
        subtitle: "Quelle est l'ambiance aujourd'hui?",
        featuredSongs: [
          {
            id: 1,
            title: "Djadja",
            artist: "Aya Nakamura",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Lacoste Polo",
            price: "€95",
          },
          {
            id: 2,
            title: "Bande Organisée",
            artist: "13 Organisé",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Kenzo Sweatshirt",
            price: "€180",
          },
          {
            id: 3,
            title: "La Puissance",
            artist: "Nekfeu",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "AMI Paris Jacket",
            price: "€320",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Copines",
            artist: "Aya Nakamura",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Tout va bien",
            artist: "Orelsan",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      JP: {
        greeting: "こんばんは",
        subtitle: "今日の気分は？",
        featuredSongs: [
          {
            id: 1,
            title: "Pretender",
            artist: "Official HIGE DANdism",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "BAPE Hoodie",
            price: "¥28,000",
          },
          {
            id: 2,
            title: "Lemon",
            artist: "Kenshi Yonezu",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Comme des Garçons Shirt",
            price: "¥15,000",
          },
          {
            id: 3,
            title: "Make Me Happy",
            artist: "NiziU",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Uniqlo x Kaws Tee",
            price: "¥2,990",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Dynamite",
            artist: "BTS",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Flamingo",
            artist: "Kenshi Yonezu",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      BR: {
        greeting: "Boa noite",
        subtitle: "Qual é a vibe hoje?",
        featuredSongs: [
          {
            id: 1,
            title: "Baile de Favela",
            artist: "MC João",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Havaianas Flip Flops",
            price: "R$45",
          },
          {
            id: 2,
            title: "Deixa Fluir",
            artist: "Anitta",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Osklen T-Shirt",
            price: "R$180",
          },
          {
            id: 3,
            title: "Envolvimento",
            artist: "MC Loma",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Farm Rio Dress",
            price: "R$320",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Vai Malandra",
            artist: "Anitta",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Paradinha",
            artist: "Anitta",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      MX: {
        greeting: "Buenas noches",
        subtitle: "¿Cuál es la vibra hoy?",
        featuredSongs: [
          {
            id: 1,
            title: "Ella Quiere Beber",
            artist: "Anuel AA",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Guess Jeans",
            price: "$1,200",
          },
          {
            id: 2,
            title: "Baila Baila Baila",
            artist: "Ozuna",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Tommy Hilfiger Polo",
            price: "$800",
          },
          {
            id: 3,
            title: "Con Altura",
            artist: "Rosalía ft. J Balvin",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Zara Crop Top",
            price: "$450",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Taki Taki",
            artist: "DJ Snake ft. Selena Gomez",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Mi Gente",
            artist: "J Balvin",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      },
      IN: {
        greeting: "शुभ संध्या",
        subtitle: "आज का मूड क्या है?",
        featuredSongs: [
          {
            id: 1,
            title: "Apna Time Aayega",
            artist: "DIVINE",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
            featuredProduct: "Fabindia Kurta",
            price: "₹2,500",
          },
          {
            id: 2,
            title: "Gully Boy",
            artist: "Ranveer Singh",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
            featuredProduct: "Nike Air Jordan",
            price: "₹12,000",
          },
          {
            id: 3,
            title: "Mere Gully Mein",
            artist: "DIVINE ft. Naezy",
            image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
            featuredProduct: "Adidas Originals Tee",
            price: "₹1,800",
          },
        ],
        recentlyPlayed: [
          {
            id: 1,
            title: "Bombay",
            artist: "DIVINE",
            image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
          },
          {
            id: 2,
            title: "Farak",
            artist: "DIVINE",
            image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          },
        ]
      }
    };

    return contentByCountry[selectedCountry as keyof typeof contentByCountry] || contentByCountry.US;
  };

  const content = getLocalizedContent();
  const cultureVideos = getCultureVideos();

  const renderCountryModal = () => (
    <Modal
      visible={showCountryModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowCountryModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowCountryModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country/Region</Text>
          </View>
          
          <ScrollView style={styles.countryList} showsVerticalScrollIndicator={false}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryItem,
                  selectedCountry === country.code && styles.selectedCountryItem
                ]}
                onPress={() => {
                  setSelectedCountry(country.code);
                  setShowCountryModal(false);
                  setActiveCultureVideo(0); // Reset to first video when country changes
                }}
              >
                <View style={styles.countryInfo}>
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <View style={styles.countryDetails}>
                    <Text style={styles.countryName}>{country.name}</Text>
                    <Text style={styles.countryCurrency}>Currency: {country.currency}</Text>
                  </View>
                </View>
                {selectedCountry === country.code && (
                  <Check size={20} color="#8B5CF6" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderCultureVideoCard = (video: any, index: number) => (
    <TouchableOpacity
      key={video.id}
      style={[
        styles.cultureVideoCard,
        index === activeCultureVideo && styles.activeCultureVideoCard
      ]}
      onPress={() => setActiveCultureVideo(index)}
    >
      <Image source={{ uri: video.video }} style={styles.cultureVideoThumbnail} />
      
      {/* Play button overlay */}
      <View style={styles.cultureVideoOverlay}>
        <Play size={20} color="#fff" fill="#fff" />
      </View>

      {/* Duration badge */}
      <View style={styles.cultureVideoDuration}>
        <Text style={styles.cultureVideoDurationText}>{video.duration}</Text>
      </View>

      {/* Creator info */}
      <View style={styles.cultureVideoCreatorInfo}>
        <Image source={{ uri: video.avatar }} style={styles.cultureVideoAvatar} />
        <Text style={styles.cultureVideoCreatorName} numberOfLines={1}>
          {video.creator}
        </Text>
      </View>

      {/* Location badge */}
      <View style={styles.locationBadge}>
        <Text style={styles.locationText}>{video.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderActiveCultureVideo = () => {
    const video = cultureVideos[activeCultureVideo];
    
    return (
      <View style={styles.activeCultureVideoContainer}>
        <Image source={{ uri: video.video }} style={styles.activeCultureVideoImage} />
        
        {/* Video controls overlay */}
        <View style={styles.cultureVideoControlsOverlay}>
          <TouchableOpacity style={styles.culturePlayButtonLarge}>
            <Play size={28} color="#fff" fill="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cultureMuteButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX size={20} color="#fff" />
            ) : (
              <Volume2 size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Video info overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.cultureVideoInfoOverlay}
        >
          <View style={styles.cultureVideoHeader}>
            <View style={styles.cultureCreatorSection}>
              <Image source={{ uri: video.avatar }} style={styles.activeCultureVideoAvatar} />
              <View style={styles.cultureCreatorDetails}>
                <Text style={styles.activeCultureVideoCreator}>{video.creator}</Text>
                <Text style={styles.cultureVideoTitle}>{video.title}</Text>
                <Text style={styles.cultureVideoLocation}>📍 {video.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cultureVideoContent}>
            <Text style={styles.cultureVideoDescription}>{video.description}</Text>
            
            <View style={styles.cultureVideoStats}>
              <Text style={styles.cultureVideoViews}>👁️ {video.views} views</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Progress indicators */}
        <View style={styles.cultureProgressContainer}>
          {cultureVideos.map((_, index) => (
            <View
              key={index}
              style={[
                styles.cultureProgressBar,
                index === activeCultureVideo && styles.activeCultureProgressBar
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#1a1a1a']}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{content.greeting}</Text>
            <Text style={styles.title}>{content.subtitle}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.countrySelector}
            onPress={() => setShowCountryModal(true)}
          >
            <Globe size={20} color="#fff" />
            <Text style={styles.countryFlag}>{currentCountry.flag}</Text>
            <Text style={styles.countryCode}>{currentCountry.code}</Text>
            <ChevronDown size={16} color="#fff" />
          </TouchableOpacity>
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
            <Image source={{ uri: featuredMusicTile.image }} style={styles.featuredMusicBackground} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.featuredMusicGradient}
            />
            <View style={styles.featuredMusicContent}>
              <Text style={styles.featuredMusicTitle}>{featuredMusicTile.title}</Text>
              <TouchableOpacity style={styles.featuredPlayButton}>
                <Play size={28} color="#fff" fill="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* Spotify-style Browse Tiles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start browsing</Text>
          <View style={styles.browseTilesGrid}>
            {browseTiles.map((tile, index) => (
              <TouchableOpacity
                key={tile.id}
                style={[styles.browseTile, { backgroundColor: tile.color }]}
                onPress={() => {
                  handleTilePress(index);
                  // Navigate to a specific tile detail page if needed
                  // router.push(`/browse/${tile.id}`);
                }}
                activeOpacity={0.8}
              >
                <Image source={{ uri: tile.image }} style={styles.browseTileBackgroundImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                  style={styles.browseTileGradient}
                />
                <View style={styles.browseTileContent}>
                  <Text style={styles.browseTileTitle}>{tile.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Tracks</Text>
          <Text style={styles.sectionSubtitle}>Songs with exclusive drops in {currentCountry.name}</Text>
          {content.featuredSongs.map((song) => (
            <TouchableOpacity 
              key={song.id} 
              style={styles.featuredCard}
              onPress={() => router.push('/artist/drake')}
            >
              <Image source={{ uri: song.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{song.title}</Text>
                <Text style={styles.featuredArtist}>{song.artist}</Text>
                <View style={styles.productTag}>
                  <Text style={styles.productTagText}>🔥 {song.featuredProduct}</Text>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>{song.price}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#fff" fill="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Culture Spotlight</Text>
          <Text style={styles.sectionSubtitle}>See the culture of {currentCountry.name} in action</Text>
          
          {/* Culture videos carousel */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.cultureVideosCarousel}
          >
            {cultureVideos.map((video, index) => renderCultureVideoCard(video, index))}
          </ScrollView>

          {/* Active culture video display */}
          {renderActiveCultureVideo()}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <Text style={styles.sectionSubtitle}>Popular in {currentCountry.name}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {content.recentlyPlayed.map((song) => (
              <TouchableOpacity 
                key={song.id} 
                style={styles.recentCard}
                onPress={() => router.push('/artist/drake')}
              >
                <Image source={{ uri: song.image }} style={styles.recentImage} />
                <Text style={styles.recentTitle}>{song.title}</Text>
                <Text style={styles.recentArtist}>{song.artist}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Heart size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Liked Songs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Plus size={24} color="#10B981" />
              <Text style={styles.actionText}>Create Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.regionInfo}>
            <Text style={styles.regionInfoTitle}>🌍 Exploring {currentCountry.name}</Text>
            <Text style={styles.regionInfoText}>
              Discover the hottest tracks, trending artists, and exclusive products from the {currentCountry.name} music scene. 
              Switch regions to explore different cultures and sounds from around the world.
            </Text>
          </View>
        </View>
      </ScrollView>

      {renderCountryModal()}
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
  featuredContent: {
    flex: 1,
    marginLeft: 12,
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
  productTag: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  productTagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  priceTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  priceText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  playButton: {
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
  cultureVideoCard: {
    width: 110,
    height: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeCultureVideoCard: {
    borderColor: '#8B5CF6',
    transform: [{ scale: 1.05 }],
  },
  cultureVideoThumbnail: {
    width: '100%',
    height: '100%',
  },
  cultureVideoOverlay: {
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
  cultureVideoDuration: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cultureVideoDurationText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
  },
  cultureVideoCreatorInfo: {
    position: 'absolute',
    bottom: 24,
    left: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cultureVideoAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  cultureVideoCreatorName: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
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
    height: 140,
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
  featuredMusicBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredMusicGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  featuredMusicContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  featuredMusicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  featuredPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});