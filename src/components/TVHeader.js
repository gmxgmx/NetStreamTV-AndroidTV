import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TVFocusGuideView,
} from 'react-native';

const TVHeader = ({ 
  activeCategory = 'all', 
  onCategorySelect, 
  categories = [] 
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleCategoryPress = (category, index) => {
    setFocusedIndex(index);
    onCategorySelect?.(category.key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>NETSTREAM</Text>
      </View>
      
      <TVFocusGuideView style={styles.navigation}>
        <View style={styles.navContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.navItem,
                activeCategory === category.key && styles.navItemActive,
                focusedIndex === index && styles.navItemFocused
              ]}
              onPress={() => handleCategoryPress(category, index)}
              onFocus={() => setFocusedIndex(index)}
              hasTVPreferredFocus={index === 0}
            >
              <Text
                style={[
                  styles.navText,
                  activeCategory === category.key && styles.navTextActive,
                  focusedIndex === index && styles.navTextFocused
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TVFocusGuideView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E50914',
    letterSpacing: 2,
  },
  navigation: {
    flex: 2,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: '#E50914',
  },
  navItemFocused: {
    borderColor: '#FFFFFF',
    backgroundColor: '#333',
  },
  navText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#CCCCCC',
    textAlign: 'center',
  },
  navTextActive: {
    color: '#FFFFFF',
  },
  navTextFocused: {
    color: '#FFFFFF',
  },
});

export default TVHeader;