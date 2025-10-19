import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Globe, ChevronDown, Check, Languages } from 'lucide-react-native';
import { useRegion } from '@/hooks/useRegionContext';

interface RegionLanguageSelectorProps {
  style?: any;
}

export const RegionLanguageSelector: React.FC<RegionLanguageSelectorProps> = ({ style }) => {
  const {
    selectedGeography,
    selectedLanguage,
    currentGeography,
    languageOptions,
    geographies,
    setSelectedGeography,
    setSelectedLanguage,
    getUIText
  } = useRegion();

  const [showGeographyModal, setShowGeographyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const uiText = getUIText();

  const renderGeographyModal = () => (
    <Modal
      visible={showGeographyModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowGeographyModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowGeographyModal(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Explore Culture Worldwide</Text>
            <Text style={styles.modalSubtitle}>Discover music and trends from different regions</Text>
          </View>
          
          <ScrollView style={styles.geographyList} showsVerticalScrollIndicator={false}>
            {geographies.map((geography) => (
              <TouchableOpacity
                key={geography.code}
                style={[
                  styles.geographyItem,
                  selectedGeography === geography.code && styles.selectedGeographyItem,
                  { borderLeftColor: geography.color }
                ]}
                onPress={() => {
                  setSelectedGeography(geography.code);
                  setShowGeographyModal(false);
                }}
              >
                <View style={styles.geographyInfo}>
                  <Text style={styles.geographyFlag}>{geography.flag}</Text>
                  <View style={styles.geographyDetails}>
                    <Text style={styles.geographyName}>{geography.name}</Text>
                    <Text style={styles.geographyDescription}>{geography.description}</Text>
                    <Text style={styles.geographyLanguage}>Native: {geography.nativeLanguage}</Text>
                  </View>
                </View>
                {selectedGeography === geography.code && (
                  <Check size={20} color={geography.color} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowLanguageModal(false)}
      >
        <View style={styles.languageModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Language</Text>
            <Text style={styles.modalSubtitle}>Select your preferred language for {currentGeography.name}</Text>
          </View>
          
          <View style={styles.languageOptions}>
            {languageOptions.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageOption,
                  selectedLanguage === language.id && styles.selectedLanguageOption,
                  { borderColor: currentGeography.color }
                ]}
                onPress={() => {
                  setSelectedLanguage(language.id);
                  setShowLanguageModal(false);
                }}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                </View>
                {selectedLanguage === language.id && (
                  <Check size={20} color={currentGeography.color} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[
            styles.geographySelector,
            { borderColor: currentGeography.color }
          ]}
          onPress={() => setShowGeographyModal(true)}
        >
          <Text style={styles.geographyFlag}>{currentGeography.flag}</Text>
          <Text style={[styles.geographyCode, { color: currentGeography.color }]}>
            {selectedGeography}
          </Text>
          <ChevronDown size={14} color={currentGeography.color} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageSelector,
            { borderColor: currentGeography.color }
          ]}
          onPress={() => setShowLanguageModal(true)}
        >
          <Languages size={14} color={currentGeography.color} />
          <Text style={[styles.languageText, { color: currentGeography.color }]}>
            {selectedLanguage === 'english' ? 'EN' : languageOptions.find(l => l.id === 'native')?.code.toUpperCase()}
          </Text>
          <ChevronDown size={12} color={currentGeography.color} />
        </TouchableOpacity>
      </View>

      {renderGeographyModal()}
      {renderLanguageModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 0,
    maxHeight: '70%',
    width: '90%',
    borderWidth: 1,
    borderColor: '#333',
  },
  languageModalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 0,
    width: '80%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  },
  geographyList: {
    maxHeight: 400,
  },
  geographyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    borderLeftWidth: 4,
  },
  selectedGeographyItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  geographyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  geographyDetails: {
    marginLeft: 16,
    flex: 1,
  },
  geographyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  geographyDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 2,
  },
  geographyLanguage: {
    fontSize: 12,
    color: '#666',
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
    borderWidth: 1,
    marginBottom: 12,
  },
  selectedLanguageOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
}); 