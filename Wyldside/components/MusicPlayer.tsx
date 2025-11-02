import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Dimensions, TextInput, Switch } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Heart, Share, X, Music, Mic, Search, ShoppingBag, Globe, Brain, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export function MusicPlayer() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const currentTrack = {
    title: "God's Plan",
    artist: "Drake",
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    duration: "3:18",
    currentTime: "1:23",
  };

  // Enhanced lyrics structure with shopping integration and translations
  const trackLyrics = {
    title: "God's Plan",
    artist: "Drake",
    lyrics: [
      { 
        time: 0, 
        text: "[Verse 1]",
        translations: {
          fr: "[Couplet 1]",
          es: "[Verso 1]",
          de: "[Strophe 1]",
          ja: "[バース1]"
        },
        brands: []
      },
      { 
        time: 5, 
        text: "I only love my bed and my momma, I'm sorry",
        translations: {
          fr: "Je n'aime que mon lit et ma maman, je suis désolé",
          es: "Solo amo mi cama y mi mamá, lo siento",
          de: "Ich liebe nur mein Bett und meine Mama, tut mir leid",
          ja: "僕はベッドとママだけを愛してる、ごめん"
        },
        brands: []
      },
      { 
        time: 10, 
        text: "Fifty dub, I even got it tatted on me",
        translations: {
          fr: "Cinquante mille, je l'ai même tatoué sur moi",
          es: "Cincuenta mil, incluso me lo tatuaje",
          de: "Fünfzig Riesen, hab's mir sogar tätowieren lassen",
          ja: "5万ドル、タトゥーまで入れたよ"
        },
        brands: []
      },
      { 
        time: 15, 
        text: "81, they'll bring the crashers to the party",
        translations: {
          fr: "81, ils vont amener les intrus à la fête",
          es: "81, traerán a los que se cuelan a la fiesta",
          de: "81, sie bringen die Crasher zur Party",
          ja: "81、パーティーにクラッシャーを連れてくる"
        },
        brands: []
      },
      { 
        time: 20, 
        text: "And you know me",
        translations: {
          fr: "Et tu me connais",
          es: "Y tú me conoces",
          de: "Und du kennst mich",
          ja: "そして君は僕を知ってる"
        },
        brands: []
      },
      { 
        time: 25, 
        text: "[Chorus]",
        translations: {
          fr: "[Refrain]",
          es: "[Coro]",
          de: "[Refrain]",
          ja: "[コーラス]"
        },
        brands: []
      },
      { 
        time: 30, 
        text: "God's plan, God's plan",
        translations: {
          fr: "Le plan de Dieu, le plan de Dieu",
          es: "Plan de Dios, plan de Dios",
          de: "Gottes Plan, Gottes Plan",
          ja: "神の計画、神の計画"
        },
        brands: []
      },
      { 
        time: 35, 
        text: "I hold back, sometimes I won't, yeah",
        translations: {
          fr: "Je me retiens, parfois je ne le ferai pas, ouais",
          es: "Me contengo, a veces no lo haré, sí",
          de: "Ich halte mich zurück, manchmal tue ich's nicht, yeah",
          ja: "抑えてる、時々しないけど、イエー"
        },
        brands: []
      },
      { 
        time: 40, 
        text: "I feel good, sometimes I don't, ayy, don't",
        translations: {
          fr: "Je me sens bien, parfois non, ayy, non",
          es: "Me siento bien, a veces no, ayy, no",
          de: "Ich fühl mich gut, manchmal nicht, ayy, nicht",
          ja: "気分がいい、時々そうじゃない、エー、そうじゃない"
        },
        brands: []
      },
      { 
        time: 45, 
        text: "I finessed down Weston Road, ayy, 'nessed",
        translations: {
          fr: "J'ai réussi sur Weston Road, ayy, réussi",
          es: "Lo logré en Weston Road, ayy, logré",
          de: "Hab's geschafft auf der Weston Road, ayy, geschafft",
          ja: "ウェストン・ロードで成功した、エー、成功"
        },
        brands: []
      },
      { 
        time: 50, 
        text: "Might go down a G.O.D., yeah, wait",
        translations: {
          fr: "Je pourrais devenir un D.I.E.U., ouais, attends",
          es: "Podría convertirme en un D.I.O.S., sí, espera",
          de: "Könnte als G.O.T.T. eingehen, yeah, warte",
          ja: "神になるかも、イエー、待って"
        },
        brands: []
      },
      { 
        time: 55, 
        text: "I go hard on Southside G, yeah, wait",
        translations: {
          fr: "Je donne tout sur Southside G, ouais, attends",
          es: "Voy fuerte en Southside G, sí, espera",
          de: "Ich geb' alles auf Southside G, yeah, warte",
          ja: "サウスサイドGで頑張ってる、イエー、待って"
        },
        brands: []
      },
      { 
        time: 60, 
        text: "I make sure that north-side eat",
        translations: {
          fr: "Je m'assure que le côté nord mange",
          es: "Me aseguro de que el lado norte coma",
          de: "Ich sorge dafür, dass die Nordseite isst",
          ja: "北側がちゃんと食べられるようにする"
        },
        brands: []
      },
      { 
        time: 65, 
        text: "Wearing my Nike Air Force 1s",
        translations: {
          fr: "Portant mes Nike Air Force 1",
          es: "Usando mis Nike Air Force 1",
          de: "Trage meine Nike Air Force 1",
          ja: "ナイキエアフォース1を履いて"
        },
        brands: [
          {
            name: "Nike Air Force 1",
            brand: "Nike",
            price: "$90",
            image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
            rating: 4.8,
            aiReason: "Classic streetwear mentioned in Drake's lyrics - perfect for his authentic style"
          }
        ]
      },
      { 
        time: 70, 
        text: "OVO hoodie keeping me warm",
        translations: {
          fr: "Le hoodie OVO me garde au chaud",
          es: "La sudadera OVO me mantiene caliente",
          de: "OVO Hoodie hält mich warm",
          ja: "OVOのパーカーで暖かい"
        },
        brands: [
          {
            name: "OVO Essential Hoodie",
            brand: "October's Very Own",
            price: "$150",
            image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
            rating: 4.9,
            aiReason: "Drake's own brand mentioned - exclusive merch from the artist himself"
          }
        ]
      },
      { 
        time: 75, 
        text: "Rolex on my wrist, time is money",
        translations: {
          fr: "Rolex à mon poignet, le temps c'est de l'argent",
          es: "Rolex en mi muñeca, el tiempo es dinero",
          de: "Rolex am Handgelenk, Zeit ist Geld",
          ja: "手首にロレックス、時は金なり"
        },
        brands: [
          {
            name: "Rolex Submariner",
            brand: "Rolex",
            price: "$8,500",
            image: "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg",
            rating: 5.0,
            aiReason: "Luxury timepiece representing success and status - Drake's signature style"
          }
        ]
      }
    ],
    languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'ja', name: '日本語', flag: '🇯🇵' }
    ]
  };

  const filteredLyrics = trackLyrics.lyrics.filter(line => 
    line.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayLyrics = searchQuery ? filteredLyrics : trackLyrics.lyrics;

  const renderLyricsModal = () => (
    <Modal
      visible={showLyrics}
      transparent={false}
      animationType="slide"
      onRequestClose={() => setShowLyrics(false)}
    >
      <View style={styles.lyricsContainer}>
        {/* Spotify-style Header */}
        <View style={styles.lyricsHeader}>
          <TouchableOpacity 
            style={styles.closeLyricsButton}
            onPress={() => setShowLyrics(false)}
          >
            <X size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.lyricsHeaderCenter}>
            <Text style={styles.lyricsHeaderText}>Lyrics</Text>
          </View>
          <TouchableOpacity style={styles.lyricsShareButton}>
            <Share size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search lyrics..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Language Controls */}
        <View style={styles.languageControls}>
          <View style={styles.translationToggle}>
            <Globe size={16} color="#1DB954" />
            <Text style={styles.translationText}>Show Translation</Text>
            <Switch
              value={showTranslation}
              onValueChange={setShowTranslation}
              trackColor={{ false: '#333', true: '#1DB954' }}
              thumbColor="#fff"
            />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.languageSelector}>
            {trackLyrics.languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.code && styles.selectedLanguageButton
                ]}
                onPress={() => setSelectedLanguage(lang.code)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === lang.code && styles.selectedLanguageName
                ]}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Track Info */}
        <View style={styles.lyricsTrackInfo}>
          <Image source={{ uri: currentTrack.image }} style={styles.lyricsAlbumArt} />
          <View style={styles.lyricsTrackDetails}>
            <Text style={styles.lyricsTrackTitle}>{trackLyrics.title}</Text>
            <Text style={styles.lyricsTrackArtist}>{trackLyrics.artist}</Text>
          </View>
        </View>

        {/* Lyrics with AI Shopping Integration */}
        <ScrollView style={styles.lyricsScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.lyricsContent}>
            {displayLyrics.map((line, index) => (
              <View key={index} style={styles.lyricsLineContainer}>
                <View style={styles.lyricsLine}>
                  <Text style={[
                    styles.lyricsText,
                    line.text.startsWith('[') && styles.lyricsSection,
                    line.brands && line.brands.length > 0 && styles.lyricsWithBrands
                  ]}>
                    {showTranslation && selectedLanguage !== 'en' ? line.translations[selectedLanguage as keyof typeof line.translations] || line.text : line.text}
                  </Text>
                  
                  {/* AI Brand Highlights */}
                  {line.brands && line.brands.length > 0 && (
                    <View style={styles.brandHighlights}>
                      <View style={styles.aiDetectionBadge}>
                        <Brain size={12} color="#1DB954" />
                        <Text style={styles.aiDetectionText}>AI detected brands</Text>
                      </View>
                      
                      {line.brands.map((brand, brandIndex) => (
                        <TouchableOpacity key={brandIndex} style={styles.brandCard}>
                          <Image source={{ uri: brand.image }} style={styles.brandImage} />
                          <View style={styles.brandInfo}>
                            <Text style={styles.brandName}>{brand.name}</Text>
                            <Text style={styles.brandBrand}>{brand.brand}</Text>
                            <View style={styles.brandRating}>
                              <Star size={12} color="#F59E0B" fill="#F59E0B" />
                              <Text style={styles.brandRatingText}>{brand.rating}</Text>
                            </View>
                            <Text style={styles.brandPrice}>{brand.price}</Text>
                            <Text style={styles.aiReason}>{brand.aiReason}</Text>
                          </View>
                          <TouchableOpacity style={styles.brandShopButton}>
                            <ShoppingBag size={16} color="#fff" />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                
                {showTranslation && selectedLanguage !== 'en' && (
                  <Text style={styles.originalText}>{line.text}</Text>
                )}
              </View>
            ))}
          </View>
          
          {/* Enhanced Copyright Notice */}
          <View style={styles.lyricsCopyright}>
            <Text style={styles.copyrightText}>
              🎵 Lyrics • 🛍️ AI Shopping • 🌍 Multi-language • For demonstration purposes
            </Text>
            <Text style={styles.copyrightSubtext}>
              Integrate with licensed APIs: Musixmatch, Genius, Google Translate, Shopping APIs
            </Text>
          </View>
        </ScrollView>

        {/* Enhanced Mini Player Controls */}
        <View style={styles.lyricsPlayerControls}>
          <TouchableOpacity style={styles.lyricsControlButton}>
            <Heart size={20} color={isLiked ? "#1DB954" : "#fff"} fill={isLiked ? "#1DB954" : "none"} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.lyricsControlButton}>
            <SkipBack size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.lyricsPlayButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause size={24} color="#000" fill="#000" />
            ) : (
              <Play size={24} color="#000" fill="#000" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.lyricsControlButton}>
            <SkipForward size={20} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.lyricsControlButton}>
            <Share size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        
        <View style={styles.content}>
          <Image source={{ uri: currentTrack.image }} style={styles.albumArt} />
          
                  <View style={styles.trackInfo}>
          <TouchableOpacity onPress={() => setShowLyrics(true)}>
            <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/artist/drake')}>
            <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Heart 
                size={20} 
                color={isLiked ? "#F59E0B" : "#999"} 
                fill={isLiked ? "#F59E0B" : "none"} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <SkipBack size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={20} color="#fff" fill="#fff" />
              ) : (
                <Play size={20} color="#fff" fill="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <SkipForward size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton}>
              <Share size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {renderLyricsModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, // Position at the bottom of screen
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#444',
  },
  progress: {
    height: '100%',
    width: '42%',
    backgroundColor: '#8B5CF6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  artist: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  // Lyrics Modal Styles
  lyricsContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  lyricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  closeLyricsButton: {
    padding: 8,
  },
  lyricsHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lyricsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  lyricsTrackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  lyricsAlbumArt: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  lyricsTrackDetails: {
    flex: 1,
    marginLeft: 16,
  },
  lyricsTrackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  lyricsTrackArtist: {
    fontSize: 18,
    color: '#999',
  },
  lyricsScroll: {
    flex: 1,
  },
  lyricsContent: {
    padding: 20,
    paddingBottom: 40,
  },
  lyricsLine: {
    marginBottom: 16,
  },
  lyricsText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 28,
    textAlign: 'center',
  },
  lyricsSection: {
    fontSize: 16,
    color: '#1DB954',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  lyricsCopyright: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  copyrightSubtext: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
  lyricsPlayerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 20,
  },
  lyricsControlButton: {
    padding: 12,
  },
  lyricsPlayButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Enhanced Spotify-style Lyrics Styles
  lyricsHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  lyricsShareButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  languageControls: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  translationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  translationText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  languageSelector: {
    marginTop: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    gap: 6,
  },
  selectedLanguageButton: {
    backgroundColor: '#1DB954',
  },
  languageFlag: {
    fontSize: 16,
  },
  languageName: {
    fontSize: 14,
    color: '#fff',
  },
  selectedLanguageName: {
    color: '#000',
    fontWeight: '600',
  },
  lyricsLineContainer: {
    marginBottom: 20,
  },
  lyricsWithBrands: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1DB954',
  },
  brandHighlights: {
    marginTop: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  aiDetectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  aiDetectionText: {
    fontSize: 12,
    color: '#1DB954',
    fontWeight: '600',
  },
  brandCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  brandImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  brandInfo: {
    flex: 1,
    marginLeft: 12,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  brandBrand: {
    fontSize: 12,
    color: '#1DB954',
    marginBottom: 4,
  },
  brandRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  brandRatingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  brandPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  aiReason: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    lineHeight: 14,
  },
  brandShopButton: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  originalText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});