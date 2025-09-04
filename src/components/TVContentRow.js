import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TVFocusGuideView,
} from 'react-native';

const TVContentRow = ({ 
  title, 
  items = [], 
  onItemPress, 
  onPlay, 
  onAddToList 
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleItemPress = (item, index) => {
    setFocusedIndex(index);
    onItemPress?.(item);
  };

  const handleItemFocus = (index) => {
    setFocusedIndex(index);
    
    // Auto-scroll to keep focused item visible
    if (scrollViewRef.current) {
      const itemWidth = 240;
      const spacing = 16;
      const totalItemWidth = itemWidth + spacing;
      const scrollPosition = index * totalItemWidth - totalItemWidth;
      
      scrollViewRef.current.scrollTo({
        x: Math.max(0, scrollPosition),
        animated: true,
      });
    }
  };

  const formatDuration = (item) => {
    if (item.type === 'live') return 'LIVE';
    if (item.duration) return item.duration;
    if (item.seasons) return `${item.seasons} Season${item.seasons > 1 ? 's' : ''}`;
    return '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <TVFocusGuideView style={styles.scrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemContainer,
                focusedIndex === index && styles.itemFocused
              ]}
              onPress={() => handleItemPress(item, index)}
              onFocus={() => handleItemFocus(index)}
              hasTVPreferredFocus={index === 0}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image || item.logo }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                
                {/* Live indicator */}
                {item.type === 'live' && (
                  <View style={styles.liveIndicator}>
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                )}
                
                {/* Channel number for live channels */}
                {item.number && (
                  <View style={styles.channelNumber}>
                    <Text style={styles.channelNumberText}>{item.number}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title || item.name}
                </Text>
                
                <View style={styles.itemMetadata}>
                  <Text style={styles.genreText}>
                    {item.genre || item.category}
                  </Text>
                  <Text style={styles.durationText}>
                    {formatDuration(item)}
                  </Text>
                </View>
                
                {item.rating && (
                  <Text style={styles.ratingText}>
                    ⭐ {typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}
                  </Text>
                )}
                
                {/* EPG info for live channels */}
                {item.epg && (
                  <View style={styles.epgInfo}>
                    <Text style={styles.epgCurrent} numberOfLines={1}>
                      {item.epg.current}
                    </Text>
                    <Text style={styles.epgNext} numberOfLines={1}>
                      Next: {item.epg.next}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </TVFocusGuideView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginLeft: 60,
  },
  scrollContainer: {
    paddingLeft: 60,
  },
  scrollContent: {
    paddingRight: 60,
  },
  itemContainer: {
    width: 240,
    marginRight: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  itemFocused: {
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.05 }],
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 135,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  liveIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  channelNumber: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  channelNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemInfo: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  durationText: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  ratingText: {
    fontSize: 12,
    color: '#00D4AA',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  epgInfo: {
    marginTop: 4,
  },
  epgCurrent: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  epgNext: {
    fontSize: 10,
    color: '#999999',
  },
});

export default TVContentRow;