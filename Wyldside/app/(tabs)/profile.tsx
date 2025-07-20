import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Heart, Download, ShoppingBag, Music, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function ProfileScreen() {
  const stats = [
    { label: "Songs Played", value: "1,247", icon: Music },
    { label: "Items Bought", value: "23", icon: ShoppingBag },
    { label: "Liked Songs", value: "156", icon: Heart },
    { label: "Downloads", value: "89", icon: Download },
  ];

  const recentPurchases = [
    {
      id: 1,
      name: "Air Jordan 4 Retro",
      price: "$190",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Supreme Box Logo Hoodie",
      price: "$350",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      date: "1 week ago",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8B5CF6', '#1a1a1a']}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <View style={styles.premiumBadge}>
                <Crown size={16} color="#F59E0B" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
              <Text style={styles.username}>Alex Johnson</Text>
              <Text style={styles.memberSince}>Member since Jan 2023</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <View key={index} style={styles.statCard}>
                    <IconComponent size={24} color="#8B5CF6" />
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Purchases</Text>
            {recentPurchases.map((item) => (
              <TouchableOpacity key={item.id} style={styles.purchaseItem}>
                <Image source={{ uri: item.image }} style={styles.purchaseImage} />
                <View style={styles.purchaseInfo}>
                  <Text style={styles.purchaseName}>{item.name}</Text>
                  <Text style={styles.purchaseDate}>{item.date}</Text>
                </View>
                <Text style={styles.purchasePrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsList}>
              <TouchableOpacity style={styles.actionItem}>
                <Heart size={20} color="#F59E0B" />
                <Text style={styles.actionText}>Liked Songs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Download size={20} color="#10B981" />
                <Text style={styles.actionText}>Downloaded Music</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <ShoppingBag size={20} color="#8B5CF6" />
                <Text style={styles.actionText}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Settings size={20} color="#999" />
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  premiumText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  purchaseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  purchaseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  purchaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  purchaseDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  purchasePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  actionsList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
});