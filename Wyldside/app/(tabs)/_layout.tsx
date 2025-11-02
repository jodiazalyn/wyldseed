import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Music, ShoppingBag, User, Users, Grid3x3 as Grid3X3, Search, Menu, X } from 'lucide-react-native';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useRegion } from '@/hooks/useRegionContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FloatingNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getUIText } = useRegion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const uiText = getUIText();
  
  const navItems = [
    { name: 'index', title: uiText.home, icon: Home, route: '/' },
    { name: 'music', title: uiText.music, icon: Music, route: '/music' },
    { name: 'categories', title: uiText.categories, icon: Grid3X3, route: '/categories' },
    { name: 'social', title: uiText.social, icon: Users, route: '/social' },
    { name: 'search', title: uiText.search, icon: Search, route: '/search' },
    { name: 'shop', title: uiText.shop, icon: ShoppingBag, route: '/shop' },
    { name: 'profile', title: uiText.profile, icon: User, route: '/profile' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsMenuOpen(!isMenuOpen)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#8B5CF6', '#6D28D9']}
          style={styles.fabGradient}
        >
          {isMenuOpen ? (
            <X size={24} color="#fff" />
          ) : (
            <Menu size={24} color="#fff" />
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Navigation Menu - Absolutely positioned, not a Modal */}
      {isMenuOpen && (
        <View style={styles.menuContainer} pointerEvents="box-none">
          <View style={styles.menuContent}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.route || pathname.startsWith(`/${item.name}`);
              
              return (
                <TouchableOpacity
                  key={item.name}
                  style={[
                    styles.menuItem,
                    isActive && styles.menuItemActive
                  ]}
                  onPress={() => handleNavigation(item.route)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.menuIconContainer, isActive && styles.menuIconContainerActive]}>
                    <IconComponent 
                      size={20} 
                      color={isActive ? '#fff' : '#999'} 
                    />
                  </View>
                  <Text style={[styles.menuItemTitle, isActive && styles.menuItemTitleActive]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
};

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none', // Hide the bottom tab bar
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: 'Music',
            tabBarIcon: ({ size, color }) => (
              <Music size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarIcon: ({ size, color }) => (
              <Grid3X3 size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: 'Shop',
            tabBarIcon: ({ size, color }) => (
              <ShoppingBag size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  // Floating Action Button
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 120, // Above the music player
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999, // Below music player but above content
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Menu Container
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
    paddingBottom: 120, // Space for music player
    zIndex: 998, // Below FAB but above content
  },
  menuContent: {
    alignItems: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    minWidth: 200,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderColor: '#8B5CF6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginLeft: 12,
    minWidth: 80,
  },
  menuItemTitleActive: {
    color: '#fff',
  },
}); 