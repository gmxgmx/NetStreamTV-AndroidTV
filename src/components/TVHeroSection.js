import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TVFocusGuideView,
} from 'react-native';

const TVHeroSection = ({ content, onPlay, onAddToList }) => {
  const [focusedButton, setFocusedButton] = useState(0);

  if (!content) return null;

  return (
    <ImageBackground
      source={{ uri: content.backdrop }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {content.type === 'series' ? 'SERIES' : 'MOVIE'}
            </Text>
          </View>
          
          <Text style={styles.title}>{content.title}</Text>
          
          <View style={styles.metadata}>
            <Text style={styles.metadataText}>{content.year}</Text>
            <Text style={styles.metadataText}>•</Text>
            <Text style={styles.metadataText}>{content.rating}</Text>
            <Text style={styles.metadataText}>•</Text>
            <Text style={styles.metadataText}>{content.genre}</Text>
            <Text style={styles.metadataText}>•</Text>
            <Text style={styles.metadataText}>{content.duration}</Text>
          </View>
          
          <Text style={styles.description} numberOfLines={3}>
            {content.description}
          </Text>
          
          <TVFocusGuideView style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.playButton,
                focusedButton === 0 && styles.buttonFocused
              ]}
              onPress={() => onPlay?.(content)}
              onFocus={() => setFocusedButton(0)}
              hasTVPreferredFocus={true}
            >
              <Text style={styles.playButtonText}>▶ Play</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.listButton,
                focusedButton === 1 && styles.buttonFocused
              ]}
              onPress={() => onAddToList?.(content)}
              onFocus={() => setFocusedButton(1)}
            >
              <Text style={styles.listButtonText}>+ My List</Text>
            </TouchableOpacity>
          </TVFocusGuideView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    paddingHorizontal: 60,
    paddingBottom: 80,
  },
  content: {
    maxWidth: 600,
  },
  badge: {
    backgroundColor: '#E50914',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metadataText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginHorizontal: 8,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  listButton: {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  buttonFocused: {
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.05 }],
  },
  playButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TVHeroSection;