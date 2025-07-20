import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { ChevronDown, Car, Camera, Shirt, Dog, Plane, Music, Gamepad2, Chrome as Home, Dumbbell, Book, Search, Users, TrendingUp, Filter, Globe, Check } from 'lucide-react-native';
import CategoryFeedScreen from '@/components/CategoryFeedScreen';

// Import category data
import { carsData } from '@/data/categories/cars';
import { modelsData } from '@/data/categories/models';
import { dogsData } from '@/data/categories/dogs';

const categories = [
  {
    id: 'cars',
    name: 'Cars',
    icon: Car,
    color: '#EF4444',
    data: carsData,
  },
  {
    id: 'models',
    name: 'Models',
    icon: Camera,
    color: '#F59E0B',
    data: modelsData,
  },
  {
    id: 'dogs',
    name: 'Dogs',
    icon: Dog,
    color: '#F97316',
    data: dogsData,
  },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [showRegionModal, setShowRegionModal] = useState(false);

  const regions = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
  ];

  const currentRegion = regions.find(r => r.code === selectedRegion) || regions[0];

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const renderCategoryDropdown = () => (
    <Modal
      visible={showDropdown}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDropdown(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownHeader}>
            <Text style={styles.dropdownTitle}>Select Category</Text>
          </View>
          
          <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory.id === category.id && styles.selectedCategoryItem
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <View style={styles.categoryItemContent}>
                    <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                      <IconComponent size={24} color="#fff" />
                    </View>
                    <View style={styles.categoryItemInfo}>
                      <Text style={styles.categoryItemName}>{category.name}</Text>
                      <Text style={styles.categoryItemDescription}>
                        Explore {category.name.toLowerCase()} content and marketplace
                      </Text>
                    </View>
                  </View>
                  {selectedCategory.id === category.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedCheckmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderRegionModal = () => (
    <Modal
      visible={showRegionModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowRegionModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowRegionModal(false)}
      >
        <View style={styles.regionModalContent}>
          <View style={styles.regionModalHeader}>
            <Text style={styles.regionModalTitle}>Select Region</Text>
          </View>
          
          <ScrollView style={styles.regionList} showsVerticalScrollIndicator={false}>
            {regions.map((region) => (
              <TouchableOpacity
                key={region.code}
                style={[
                  styles.regionItem,
                  selectedRegion === region.code && styles.selectedRegionItem
                ]}
                onPress={() => {
                  setSelectedRegion(region.code);
                  setShowRegionModal(false);
                }}
              >
                <View style={styles.regionInfo}>
                  <Text style={styles.regionFlag}>{region.flag}</Text>
                  <Text style={styles.regionName}>{region.name}</Text>
                </View>
                {selectedRegion === region.code && (
                  <Check size={20} color="#8B5CF6" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const SelectedIcon = selectedCategory.icon;

  return (
    <View style={styles.container}>
      {/* Category Selector Header */}
      <View style={styles.categorySelector}>
        <TouchableOpacity 
          style={styles.selectorButton}
          onPress={() => setShowDropdown(true)}
        >
          <View style={styles.selectorContent}>
            <View style={[styles.selectorIcon, { backgroundColor: selectedCategory.color }]}>
              <SelectedIcon size={20} color="#fff" />
            </View>
            <View style={styles.selectorText}>
              <Text style={styles.selectorTitle}>{selectedCategory.name}</Text>
              <Text style={styles.selectorSubtitle}>Browse {selectedCategory.name.toLowerCase()} in {currentRegion.name}</Text>
            </View>
            <View style={styles.selectorActions}>
              <TouchableOpacity 
                style={styles.regionButton}
                onPress={() => setShowRegionModal(true)}
              >
                <Globe size={16} color="#999" />
                <Text style={styles.regionFlag}>{currentRegion.flag}</Text>
                <Text style={styles.regionCode}>{currentRegion.code}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.searchButton}
                onPress={() => setShowSearch(true)}
              >
                <Search size={20} color="#999" />
              </TouchableOpacity>
              <ChevronDown size={20} color="#999" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Feed */}
      <CategoryFeedScreen
        key={selectedCategory.id} // Force re-render when category changes
        categoryName={selectedCategory.name}
        categoryIcon={selectedCategory.icon}
        initialPosts={selectedCategory.data.posts}
        initialMarketplaceItems={selectedCategory.data.marketplaceItems}
        filters={selectedCategory.data.filters}
      />

      {renderCategoryDropdown()}
      {renderRegionModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  categorySelector: {
    backgroundColor: '#2a2a2a',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectorButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectorText: {
    flex: 1,
  },
  selectorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  regionFlag: {
    fontSize: 12,
  },
  regionCode: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  searchButton: {
    padding: 4,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectorSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  dropdownHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  categoriesList: {
    maxHeight: 500,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedCategoryItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  categoryItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryItemInfo: {
    flex: 1,
  },
  categoryItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  categoryItemDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckmark: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  regionModalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    width: '85%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  regionModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  regionModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  regionList: {
    maxHeight: 400,
  },
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectedRegionItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  regionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
});