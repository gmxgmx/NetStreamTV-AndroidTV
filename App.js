import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from 'react-native';

import TVHeader from './src/components/TVHeader';
import TVHeroSection from './src/components/TVHeroSection';
import TVContentRow from './src/components/TVContentRow';
import TVVideoPlayer from './src/components/TVVideoPlayer';

import {
  featuredContent,
  movies,
  tvShows,
  liveChannels,
  categories,
} from './src/data/mockData';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    StatusBar.setHidden(true);
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isPlayerVisible) {
        setIsPlayerVisible(false);
        setSelectedContent(null);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isPlayerVisible]);

  const handlePlay = (content) => {
    setSelectedContent(content);
    setIsPlayerVisible(true);
    ToastAndroid.show(`Playing: ${content.title || content.name}`, ToastAndroid.SHORT);
  };

  const handleAddToList = (content) => {
    const contentId = content.id;
    if (myList.includes(contentId)) {
      setMyList(myList.filter(id => id !== contentId));
      ToastAndroid.show(`Removed from My List: ${content.title || content.name}`, ToastAndroid.SHORT);
    } else {
      setMyList([...myList, contentId]);
      ToastAndroid.show(`Added to My List: ${content.title || content.name}`, ToastAndroid.SHORT);
    }
  };

  const handleItemPress = (content) => {
    // For TV, immediately play the content when selected
    handlePlay(content);
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
    setSelectedContent(null);
  };

  const getFilteredContent = () => {
    const allContent = [
      ...movies.map(item => ({ ...item, type: 'movie' })),
      ...tvShows.map(item => ({ ...item, type: 'series' })),
      ...liveChannels.map(channel => ({
        id: `live-${channel.id}`,
        title: channel.name,
        image: channel.logo,
        genre: channel.category,
        type: 'live',
        description: channel.epg.current,
        stream_url: channel.stream_url,
        epg: channel.epg,
        number: channel.number
      }))
    ];

    switch (activeCategory) {
      case 'movies':
        return allContent.filter(item => item.type === 'movie');
      case 'tvshows':
        return allContent.filter(item => item.type === 'series');
      case 'live':
        return allContent.filter(item => item.type === 'live');
      case 'news':
        return allContent.filter(item => 
          item.type === 'live' && item.genre?.toLowerCase().includes('news')
        );
      case 'sports':
        return allContent.filter(item => 
          item.type === 'live' && item.genre?.toLowerCase().includes('sports')
        );
      default:
        return allContent;
    }
  };

  const getMyListContent = () => {
    const allContent = [
      ...movies.map(item => ({ ...item, type: 'movie' })),
      ...tvShows.map(item => ({ ...item, type: 'series' })),
      ...liveChannels.map(channel => ({
        id: `live-${channel.id}`,
        title: channel.name,
        image: channel.logo,
        genre: channel.category,
        type: 'live',
        description: channel.epg.current,
        stream_url: channel.stream_url,
        epg: channel.epg,
        number: channel.number
      }))
    ];

    return allContent.filter(item => myList.includes(item.id));
  };

  const renderContent = () => {
    const filteredContent = getFilteredContent();
    const trendingContent = [...movies.slice(0, 3), ...tvShows.slice(0, 2), ...liveChannels.slice(0, 2)];

    switch (activeCategory) {
      case 'all':
        return (
          <>
            <TVHeroSection
              content={featuredContent}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
            <TVContentRow
              title="Trending Now"
              items={trendingContent}
              onItemPress={handleItemPress}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
            <TVContentRow
              title="Live Channels"
              items={liveChannels}
              onItemPress={handleItemPress}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
            <TVContentRow
              title="Popular Movies"
              items={movies}
              onItemPress={handleItemPress}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
            <TVContentRow
              title="TV Series"
              items={tvShows}
              onItemPress={handleItemPress}
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
            {myList.length > 0 && (
              <TVContentRow
                title="My List"
                items={getMyListContent()}
                onItemPress={handleItemPress}
                onPlay={handlePlay}
                onAddToList={handleAddToList}
              />
            )}
          </>
        );

      case 'movies':
        return (
          <TVContentRow
            title="Movies"
            items={movies}
            onItemPress={handleItemPress}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
          />
        );

      case 'tvshows':
        return (
          <TVContentRow
            title="TV Shows"
            items={tvShows}
            onItemPress={handleItemPress}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
          />
        );

      case 'live':
      case 'news':
      case 'sports':
        return (
          <TVContentRow
            title={activeCategory === 'live' ? 'Live TV' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            items={filteredContent}
            onItemPress={handleItemPress}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
          />
        );

      default:
        return (
          <TVContentRow
            title="All Content"
            items={filteredContent}
            onItemPress={handleItemPress}
            onPlay={handlePlay}
            onAddToList={handleAddToList}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      
      <TVHeader
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        categories={categories}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      <TVVideoPlayer
        visible={isPlayerVisible}
        content={selectedContent}
        onClose={handleClosePlayer}
        initialScreenMode="fit"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
});

export default App;