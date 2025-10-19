import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Geography {
  code: string;
  name: string;
  flag: string;
  description: string;
  color: string;
  nativeLanguage: string;
  nativeCode: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  code: string;
}

interface RegionContextType {
  selectedGeography: string;
  selectedLanguage: string;
  currentGeography: Geography;
  languageOptions: Language[];
  geographies: Geography[];
  setSelectedGeography: (code: string) => void;
  setSelectedLanguage: (language: string) => void;
  getUIText: () => any;
  getSearchPlaceholder: () => string;
}

const geographies: Geography[] = [
  { 
    code: 'US', 
    name: 'United States', 
    flag: '🇺🇸', 
    description: 'Hip-hop, R&B, and street culture',
    color: '#1565C0',
    nativeLanguage: 'English',
    nativeCode: 'en'
  },
  { 
    code: 'ZA', 
    name: 'South Africa', 
    flag: '🇿🇦', 
    description: 'Amapiano, Afrobeats, and township culture',
    color: '#2E7D32',
    nativeLanguage: 'Afrikaans/Zulu',
    nativeCode: 'af'
  },
  { 
    code: 'SA', 
    name: 'South America', 
    flag: '🌎', 
    description: 'Reggaeton, Latin trap, and street fashion',
    color: '#F57C00',
    nativeLanguage: 'Español',
    nativeCode: 'es'
  },
  { 
    code: 'KR', 
    name: 'Korea (Asia)', 
    flag: '🇰🇷', 
    description: 'K-pop, K-hip hop, and Korean street style',
    color: '#E91E63',
    nativeLanguage: '한국어',
    nativeCode: 'ko'
  },
  { 
    code: 'AE', 
    name: 'India (Dubai)', 
    flag: '🇦🇪', 
    description: 'Bollywood hip-hop, luxury lifestyle',
    color: '#7B1FA2',
    nativeLanguage: 'हिन्दी',
    nativeCode: 'hi'
  },
];

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGeography, setSelectedGeography] = useState('US');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const currentGeography = geographies.find(g => g.code === selectedGeography) || geographies[0];

  const languageOptions: Language[] = [
    { id: 'english', name: 'English', flag: '🇺🇸', code: 'en' },
    { id: 'native', name: currentGeography.nativeLanguage, flag: currentGeography.flag, code: currentGeography.nativeCode }
  ];

  const getUIText = () => {
    if (selectedLanguage === 'native') {
      switch (selectedGeography) {
        case 'ZA':
          return {
            // Navigation
            search: 'Soek',
            home: 'Huis',
            music: 'Musiek',
            categories: 'Kategorieë',
            social: 'Sosiaal',
            shop: 'Winkel',
            profile: 'Profiel',
            menu: 'Menu',
            
            // Greetings
            goodEvening: 'Goeie aand',
            goodMorning: 'Goeie more',
            goodAfternoon: 'Goeie middag',
            whatsTheVibe: 'Wat is die vibe vandag?',
            
            // Main sections
            featuredTracks: 'Uitgestalde Liedjies',
            songsWithDrops: 'Liedjies met eksklusiewe vrystellings in',
            cultureSpotlight: 'Kultuur Kollig',
            seeTheCulture: 'Sien die kultuur van',
            inAction: 'in aksie',
            browseCategories: 'Blaai Kategorieë',
            popularIn: 'Gewild in',
            startBrowsing: 'Begin blaai',
            latestTracks: 'Nuutste liedjies',
            
            // Music categories
            hipHopCentral: 'Hip Hop Sentrum',
            luxuryLifestyle: 'Luukse Leefstyl',
            streetFashion: 'Straat Mode',
            cultureVibes: 'Kultuur Vibes',
            
            // Actions & buttons
            playNow: 'Speel nou',
            addToPlaylist: 'Voeg by speellys',
            buyNow: 'Koop nou',
            viewMore: 'Sien meer',
            discover: 'Ontdek',
            
            // Search & discovery
            trending: 'Trending in',
            viralCulture: 'Virale Kultuur',
            seeWhatsTrending: 'Sien wat trending is in',
            exploring: 'Verken',
            switchRegion: 'Verander Streek',
            discoverMusic: 'Ontdek musiek uit',
            
            // Product related
            exclusiveProduct: 'Eksklusiewe produk',
            limitedEdition: 'Beperkte uitgawe',
            newArrival: 'Nuwe aankoms',
            bestSeller: 'Topverkoper',
            
            // Time and stats
            views: 'kyke',
            plays: 'spele',
            likes: 'likes',
            shares: 'deel',
            followers: 'volgelinge',
            following: 'volg',
            
            // Region info
            regionDescription: 'Ontdek die warm liedjies, trending kunstenaars en eksklusiewe produkte van die',
            musicScene: 'musiek toneel.',
            
            // Music page specific
            recentlyPlayed: 'Onlangs gespeel',
            madeForYou: 'Gemaak vir jou',
            
            // Home page specific
            customPlaylist: 'Pasgemaakte Speellys',
            yourMix: 'Jou meng',
            sports: 'Sport',
            gameTime: 'Speltyd',
            sneakers: 'Tekkies',
            freshKicks: 'Vars skopskoen',
            cars: 'Motors',
            luxuryRides: 'Luukse ritte',
            yourPersonalizedFeed: 'Jou Persoonlike Voer',
            trendingInHipHop: 'Trending in Hip Hop',
            mostViralContent: 'Mees virale inhoud van',
          };
        case 'SA':
          return {
            // Navigation
            search: 'Buscar',
            home: 'Inicio',
            music: 'Música',
            categories: 'Categorías',
            social: 'Social',
            shop: 'Tienda',
            profile: 'Perfil',
            menu: 'Menú',
            
            // Greetings
            goodEvening: 'Buenas noches',
            goodMorning: 'Buenos días',
            goodAfternoon: 'Buenas tardes',
            whatsTheVibe: '¿Cuál es la vibra hoy?',
            
            // Main sections
            featuredTracks: 'Pistas Destacadas',
            songsWithDrops: 'Canciones con lanzamientos exclusivos en',
            cultureSpotlight: 'Cultura en Foco',
            seeTheCulture: 'Ve la cultura de',
            inAction: 'en acción',
            browseCategories: 'Explorar Categorías',
            popularIn: 'Popular en',
            startBrowsing: 'Empezar a explorar',
            latestTracks: 'Últimas pistas',
            
            // Music categories
            hipHopCentral: 'Hip Hop Central',
            luxuryLifestyle: 'Estilo de Vida Lujoso',
            streetFashion: 'Moda Urbana',
            cultureVibes: 'Vibras Culturales',
            
            // Actions & buttons
            playNow: 'Reproducir ahora',
            addToPlaylist: 'Añadir a playlist',
            buyNow: 'Comprar ahora',
            viewMore: 'Ver más',
            discover: 'Descubrir',
            
            // Search & discovery
            trending: 'Tendencias en',
            viralCulture: 'Cultura Viral',
            seeWhatsTrending: 'Ve lo que está en tendencia en',
            exploring: 'Explorando',
            switchRegion: 'Cambiar Región',
            discoverMusic: 'Descubre música de',
            
            // Product related
            exclusiveProduct: 'Producto exclusivo',
            limitedEdition: 'Edición limitada',
            newArrival: 'Nueva llegada',
            bestSeller: 'Más vendido',
            
            // Time and stats
            views: 'vistas',
            plays: 'reproducciones',
            likes: 'me gusta',
            shares: 'compartir',
            followers: 'seguidores',
            following: 'siguiendo',
            
            // Region info
            regionDescription: 'Descubre las pistas más calientes, artistas en tendencia y productos exclusivos de la escena musical de',
            musicScene: '.',
            
            // Music page specific
            recentlyPlayed: 'Reproducido recientemente',
            madeForYou: 'Hecho para ti',
            
            // Home page specific
            customPlaylist: 'Lista Personalizada',
            yourMix: 'Tu mezcla',
            sports: 'Deportes',
            gameTime: 'Hora del juego',
            sneakers: 'Zapatillas',
            freshKicks: 'Kicks frescos',
            cars: 'Autos',
            luxuryRides: 'Autos de lujo',
            yourPersonalizedFeed: 'Tu Feed Personalizado',
            trendingInHipHop: 'Tendencias en Hip Hop',
            mostViralContent: 'Contenido más viral de',
          };
        case 'KR':
          return {
            // Navigation
            search: '검색',
            home: '홈',
            music: '음악',
            categories: '카테고리',
            social: '소셜',
            shop: '쇼핑',
            profile: '프로필',
            menu: '메뉴',
            
            // Greetings
            goodEvening: '좋은 저녁',
            goodMorning: '좋은 아침',
            goodAfternoon: '좋은 오후',
            whatsTheVibe: '오늘의 분위기는?',
            
            // Main sections
            featuredTracks: '추천 트랙',
            songsWithDrops: '독점 발매 곡들',
            cultureSpotlight: '문화 스포트라이트',
            seeTheCulture: '문화를 보세요',
            inAction: '실제로',
            browseCategories: '카테고리 탐색',
            popularIn: '인기',
            startBrowsing: '탐색 시작',
            latestTracks: '최신 트랙',
            
            // Music categories
            hipHopCentral: '힙합 센터',
            luxuryLifestyle: '럭셔리 라이프스타일',
            streetFashion: '스트릿 패션',
            cultureVibes: '문화 바이브',
            
            // Actions & buttons
            playNow: '지금 재생',
            addToPlaylist: '플레이리스트에 추가',
            buyNow: '지금 구매',
            viewMore: '더 보기',
            discover: '발견',
            
            // Search & discovery
            trending: '트렌딩',
            viralCulture: '바이럴 문화',
            seeWhatsTrending: '트렌딩 보기',
            exploring: '탐색 중',
            switchRegion: '지역 변경',
            discoverMusic: '음악 발견',
            
            // Product related
            exclusiveProduct: '독점 제품',
            limitedEdition: '한정판',
            newArrival: '신상품',
            bestSeller: '베스트셀러',
            
            // Time and stats
            views: '조회수',
            plays: '재생수',
            likes: '좋아요',
            shares: '공유',
            followers: '팔로워',
            following: '팔로잉',
            
            // Region info
            regionDescription: '가장 핫한 트랙, 트렌딩 아티스트, 그리고 독점 제품들을 발견하세요',
            musicScene: '음악 씬에서.',
            
            // Music page specific
            recentlyPlayed: '최근 재생됨',
            madeForYou: '당신을 위한 추천',
            
            // Home page specific
            customPlaylist: '맞춤 플레이리스트',
            yourMix: '당신의 믹스',
            sports: '스포츠',
            gameTime: '게임 타임',
            sneakers: '스니커즈',
            freshKicks: '새로운 킥스',
            cars: '자동차',
            luxuryRides: '럭셔리 라이드',
            yourPersonalizedFeed: '맞춤 피드',
            trendingInHipHop: '힙합 트렌딩',
            mostViralContent: '가장 바이럴한 콘텐츠',
          };
        case 'AE':
          return {
            // Navigation
            search: 'खोज',
            home: 'होम',
            music: 'संगीत',
            categories: 'श्रेणियां',
            social: 'सामाजिक',
            shop: 'दुकान',
            profile: 'प्रोफाइल',
            menu: 'मेनू',
            
            // Greetings
            goodEvening: 'शुभ संध्या',
            goodMorning: 'शुभ प्रभात',
            goodAfternoon: 'शुभ दोपहर',
            whatsTheVibe: 'आज का मूड क्या है?',
            
            // Main sections
            featuredTracks: 'फ़ीचर्ड ट्रैक',
            songsWithDrops: 'एक्सक्लूसिव रिलीज़ के साथ गाने',
            cultureSpotlight: 'कल्चर स्पॉटलाइट',
            seeTheCulture: 'संस्कृति देखें',
            inAction: 'एक्शन में',
            browseCategories: 'श्रेणियां ब्राउज़ करें',
            popularIn: 'लोकप्रिय',
            startBrowsing: 'ब्राउज़िंग शुरू करें',
            latestTracks: 'नवीनतम ट्रैक',
            
            // Music categories
            hipHopCentral: 'हिप हॉप सेंट्रल',
            luxuryLifestyle: 'लक्जरी लाइफस्टाइल',
            streetFashion: 'स्ट्रीट फ़ैशन',
            cultureVibes: 'कल्चर वाइब्स',
            
            // Actions & buttons
            playNow: 'अभी प्ले करें',
            addToPlaylist: 'प्लेलिस्ट में जोड़ें',
            buyNow: 'अभी खरीदें',
            viewMore: 'और देखें',
            discover: 'खोजें',
            
            // Search & discovery
            trending: 'ट्रेंडिंग',
            viralCulture: 'वायरल संस्कृति',
            seeWhatsTrending: 'ट्रेंडिंग देखें',
            exploring: 'खोज रहे हैं',
            switchRegion: 'क्षेत्र बदलें',
            discoverMusic: 'संगीत खोजें',
            
            // Product related
            exclusiveProduct: 'एक्सक्लूसिव प्रोडक्ट',
            limitedEdition: 'लिमिटेड एडिशन',
            newArrival: 'नया आगमन',
            bestSeller: 'बेस्ट सेलर',
            
            // Time and stats
            views: 'व्यूज़',
            plays: 'प्लेज़',
            likes: 'लाइक्स',
            shares: 'शेयर',
            followers: 'फॉलोअर्स',
            following: 'फॉलोइंग',
            
            // Region info
            regionDescription: 'सबसे हॉट ट्रैक्स, ट्रेंडिंग आर्टिस्ट्स और एक्सक्लूसिव प्रोडक्ट्स खोजें',
            musicScene: 'संगीत दृश्य से।',
            
            // Music page specific
            recentlyPlayed: 'हाल ही में प्ले किया गया',
            madeForYou: 'आपके लिए बनाया गया',
            
            // Home page specific
            customPlaylist: 'कस्टम प्लेलिस्ट',
            yourMix: 'आपका मिक्स',
            sports: 'खेल',
            gameTime: 'गेम टाइम',
            sneakers: 'स्नीकर्स',
            freshKicks: 'फ्रेश किक्स',
            cars: 'कारें',
            luxuryRides: 'लक्जरी राइड्स',
            yourPersonalizedFeed: 'आपका पर्सनलाइज्ड फीड',
            trendingInHipHop: 'हिप हॉप में ट्रेंडिंग',
            mostViralContent: 'सबसे वायरल कंटेंट',
          };
        default:
          return {
            // Navigation
            search: 'Search',
            home: 'Home',
            music: 'Music',
            categories: 'Categories',
            social: 'Social',
            shop: 'Shop',
            profile: 'Profile',
            menu: 'Menu',
            
            // Greetings
            goodEvening: 'Good evening',
            goodMorning: 'Good morning',
            goodAfternoon: 'Good afternoon',
            whatsTheVibe: 'What\'s the vibe today?',
            
            // Main sections
            featuredTracks: 'Featured Tracks',
            songsWithDrops: 'Songs with exclusive drops in',
            cultureSpotlight: 'Culture Spotlight',
            seeTheCulture: 'See the culture of',
            inAction: 'in action',
            browseCategories: 'Browse Categories',
            popularIn: 'Popular in',
            startBrowsing: 'Start browsing',
            latestTracks: 'Latest tracks',
            
            // Music categories
            hipHopCentral: 'Hip Hop Central',
            luxuryLifestyle: 'Luxury Lifestyle',
            streetFashion: 'Street Fashion',
            cultureVibes: 'Culture Vibes',
            
            // Actions & buttons
            playNow: 'Play now',
            addToPlaylist: 'Add to playlist',
            buyNow: 'Buy now',
            viewMore: 'View more',
            discover: 'Discover',
            
            // Search & discovery
            trending: 'Trending in',
            viralCulture: 'Viral Culture',
            seeWhatsTrending: 'See what\'s trending in',
            exploring: 'Exploring',
            switchRegion: 'Switch Region',
            discoverMusic: 'Discover music from',
            
            // Product related
            exclusiveProduct: 'Exclusive product',
            limitedEdition: 'Limited edition',
            newArrival: 'New arrival',
            bestSeller: 'Best seller',
            
            // Time and stats
            views: 'views',
            plays: 'plays',
            likes: 'likes',
            shares: 'shares',
            followers: 'followers',
            following: 'following',
            
            // Region info
            regionDescription: 'Discover the hottest tracks, trending artists, and exclusive products from the',
            musicScene: 'music scene.',
            
            // Music page specific
            recentlyPlayed: 'Recently played',
            madeForYou: 'Made for you',
            
            // Home page specific
            customPlaylist: 'Custom Playlist',
            yourMix: 'Your mix',
            sports: 'Sports',
            gameTime: 'Game time',
            sneakers: 'Sneakers',
            freshKicks: 'Fresh kicks',
            cars: 'Cars',
            luxuryRides: 'Luxury rides',
            yourPersonalizedFeed: 'Your Personalized Feed',
            trendingInHipHop: 'Trending in Hip Hop',
            mostViralContent: 'Most viral and influential content from',
          };
      }
    }
    return {
      // Navigation
      search: 'Search',
      home: 'Home',
      music: 'Music',
      categories: 'Categories',
      social: 'Social',
      shop: 'Shop',
      profile: 'Profile',
      menu: 'Menu',
      
      // Greetings
      goodEvening: 'Good evening',
      goodMorning: 'Good morning',
      goodAfternoon: 'Good afternoon',
      whatsTheVibe: 'What\'s the vibe today?',
      
      // Main sections
      featuredTracks: 'Featured Tracks',
      songsWithDrops: 'Songs with exclusive drops in',
      cultureSpotlight: 'Culture Spotlight',
      seeTheCulture: 'See the culture of',
      inAction: 'in action',
      browseCategories: 'Browse Categories',
      popularIn: 'Popular in',
      startBrowsing: 'Start browsing',
      latestTracks: 'Latest tracks',
      
      // Music categories
      hipHopCentral: 'Hip Hop Central',
      luxuryLifestyle: 'Luxury Lifestyle',
      streetFashion: 'Street Fashion',
      cultureVibes: 'Culture Vibes',
      
      // Actions & buttons
      playNow: 'Play now',
      addToPlaylist: 'Add to playlist',
      buyNow: 'Buy now',
      viewMore: 'View more',
      discover: 'Discover',
      
      // Search & discovery
      trending: 'Trending in',
      viralCulture: 'Viral Culture',
      seeWhatsTrending: 'See what\'s trending in',
      exploring: 'Exploring',
      switchRegion: 'Switch Region',
      discoverMusic: 'Discover music from',
      
      // Product related
      exclusiveProduct: 'Exclusive product',
      limitedEdition: 'Limited edition',
      newArrival: 'New arrival',
      bestSeller: 'Best seller',
      
      // Time and stats
      views: 'views',
      plays: 'plays',
      likes: 'likes',
      shares: 'shares',
      followers: 'followers',
      following: 'following',
      
      // Region info
      regionDescription: 'Discover the hottest tracks, trending artists, and exclusive products from the',
      musicScene: 'music scene.',
      
      // Music page specific
      recentlyPlayed: 'Recently played',
      madeForYou: 'Made for you',
      
      // Home page specific
      customPlaylist: 'Custom Playlist',
      yourMix: 'Your mix',
      sports: 'Sports',
      gameTime: 'Game time',
      sneakers: 'Sneakers',
      freshKicks: 'Fresh kicks',
      cars: 'Cars',
      luxuryRides: 'Luxury rides',
      yourPersonalizedFeed: 'Your Personalized Feed',
      trendingInHipHop: 'Trending in Hip Hop',
      mostViralContent: 'Most viral and influential content from',
    };
  };

  const getSearchPlaceholder = () => {
    if (selectedLanguage === 'native') {
      switch (selectedGeography) {
        case 'ZA': return `Soek in ${currentGeography.name}...`;
        case 'SA': return `Buscar en ${currentGeography.name}...`;
        case 'KR': return `${currentGeography.name}에서 검색...`;
        case 'AE': return `${currentGeography.name} में खोजें...`;
        default: return `Search in ${currentGeography.name}...`;
      }
    }
    return `Search in ${currentGeography.name}...`;
  };

  const handleSetSelectedGeography = (code: string) => {
    setSelectedGeography(code);
    setSelectedLanguage('english'); // Reset to English when changing geography
  };

  return (
    <RegionContext.Provider value={{
      selectedGeography,
      selectedLanguage,
      currentGeography,
      languageOptions,
      geographies,
      setSelectedGeography: handleSetSelectedGeography,
      setSelectedLanguage,
      getUIText,
      getSearchPlaceholder
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}; 