import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Music, ShoppingBag, User, Users, Grid3x3 as Grid3X3, Search } from 'lucide-react-native';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const { width, height } = Dimensions.get('window');

const FloatingNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { name: 'index', title: 'Home', icon: Home, route: '/' },
    { name: 'music', title: 'Music', icon: Music, route: '/music' },
    { name: 'categories', title: 'Categories', icon: Grid3X3, route: '/categories' },
    { name: 'social', title: 'Social', icon: Users, route: '/social' },
    { name: 'search', title: 'Search', icon: Search, route: '/search' },
    { name: 'shop', title: 'Shop', icon: ShoppingBag, route: '/shop' },
    { name: 'profile', title: 'Profile', icon: User, route: '/profile' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
    setIsExpanded(false);
  };

  return (
    <View style={styles.floatingNavContainer}>
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.route || pathname.startsWith(`/${item.name}`);
        
        return (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.floatingNavItem,
              isActive && styles.floatingNavItemActive,
              { 
                transform: [{ 
                  translateY: isExpanded ? 0 : (index * -60) 
                }],
                opacity: isExpanded ? 1 : (index === 0 ? 1 : 0),
              }
            ]}
            onPress={() => {
              if (index === 0) {
                setIsExpanded(!isExpanded);
              } else {
                handleNavigation(item.route);
              }
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
              <IconComponent 
                size={20} 
                color={isActive ? '#fff' : '#999'} 
              />
            </View>
            {(isExpanded || index === 0) && (
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.title}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
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
  floatingNavContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  floatingNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingNavItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderColor: '#8B5CF6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginLeft: 12,
    minWidth: 80,
  },
  navLabelActive: {
    color: '#fff',
  },
}); 