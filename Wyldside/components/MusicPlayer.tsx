import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Heart, Share } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export function MusicPlayer() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentTrack = {
    title: "God's Plan",
    artist: "Drake",
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    duration: "3:18",
    currentTime: "1:23",
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
      
      <View style={styles.content}>
        <Image source={{ uri: currentTrack.image }} style={styles.albumArt} />
        
        <TouchableOpacity 
          style={styles.trackInfo}
          onPress={() => router.push('/artist/drake')}
        >
          <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
        </TouchableOpacity>

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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#333',
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
});