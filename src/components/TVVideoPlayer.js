import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  TVFocusGuideView,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const TVVideoPlayer = ({ 
  visible, 
  content, 
  onClose, 
  initialScreenMode = 'fit' 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [screenMode, setScreenMode] = useState(initialScreenMode);
  const [focusedControl, setFocusedControl] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const screenModes = [
    { key: 'fit', name: 'Fit Screen', resizeMode: 'contain' },
    { key: 'fill', name: 'Fill Screen', resizeMode: 'cover' },
    { key: 'stretch', name: 'Stretch', resizeMode: 'stretch' },
    { key: 'original', name: 'Original', resizeMode: 'center' },
  ];

  useEffect(() => {
    if (visible) {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
      setIsPlaying(true);
      
      // Handle back button on Android TV
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backHandler.remove();
    } else {
      Orientation.unlockAllOrientations();
      StatusBar.setHidden(false);
    }
  }, [visible]);

  useEffect(() => {
    if (showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls]);

  const handleBackPress = () => {
    if (showSettings) {
      setShowSettings(false);
      return true;
    }
    onClose?.();
    return true;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (seconds) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    videoRef.current?.seek(newTime);
    setShowControls(true);
  };

  const handleLoad = (data) => {
    setDuration(data.duration);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentScreenMode = () => {
    return screenModes.find(mode => mode.key === screenMode) || screenModes[0];
  };

  const cycleScreenMode = () => {
    const currentIndex = screenModes.findIndex(mode => mode.key === screenMode);
    const nextIndex = (currentIndex + 1) % screenModes.length;
    setScreenMode(screenModes[nextIndex].key);
    setShowControls(true);
  };

  const adjustVolume = (delta) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    setShowControls(true);
  };

  if (!visible || !content) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      supportedOrientations={['landscape']}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: content.video_url || content.stream_url }}
          style={styles.video}
          resizeMode={getCurrentScreenMode().resizeMode}
          paused={!isPlaying}
          volume={volume}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={() => setIsPlaying(false)}
          repeat={false}
        />

        {/* Video Controls Overlay */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>
                  {content.title || content.name}
                </Text>
                <Text style={styles.contentMeta}>
                  {content.genre || content.category} • {content.year || 'Live'}
                </Text>
              </View>
              <View style={styles.screenModeIndicator}>
                <Text style={styles.screenModeText}>
                  📺 {getCurrentScreenMode().name}
                </Text>
              </View>
            </View>

            {/* Center Play/Pause Button */}
            {!isPlaying && (
              <View style={styles.centerControls}>
                <TouchableOpacity
                  style={[styles.centerPlayButton, focusedControl === 0 && styles.controlFocused]}
                  onPress={togglePlayPause}
                  onFocus={() => setFocusedControl(0)}
                  hasTVPreferredFocus={true}
                >
                  <Text style={styles.centerPlayText}>▶</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(currentTime / duration) * 100}%` }
                    ]} 
                  />
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
              </View>

              {/* Control Buttons */}
              <TVFocusGuideView style={styles.controlButtons}>
                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 1 && styles.controlFocused]}
                  onPress={togglePlayPause}
                  onFocus={() => setFocusedControl(1)}
                >
                  <Text style={styles.controlButtonText}>
                    {isPlaying ? '⏸' : '▶'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 2 && styles.controlFocused]}
                  onPress={() => handleSeek(-10)}
                  onFocus={() => setFocusedControl(2)}
                >
                  <Text style={styles.controlButtonText}>⏪</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 3 && styles.controlFocused]}
                  onPress={() => handleSeek(10)}
                  onFocus={() => setFocusedControl(3)}
                >
                  <Text style={styles.controlButtonText}>⏩</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 4 && styles.controlFocused]}
                  onPress={cycleScreenMode}
                  onFocus={() => setFocusedControl(4)}
                >
                  <Text style={styles.controlButtonText}>📺</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 5 && styles.controlFocused]}
                  onPress={() => adjustVolume(-0.1)}
                  onFocus={() => setFocusedControl(5)}
                >
                  <Text style={styles.controlButtonText}>🔉</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 6 && styles.controlFocused]}
                  onPress={() => adjustVolume(0.1)}
                  onFocus={() => setFocusedControl(6)}
                >
                  <Text style={styles.controlButtonText}>🔊</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, focusedControl === 7 && styles.controlFocused]}
                  onPress={onClose}
                  onFocus={() => setFocusedControl(7)}
                >
                  <Text style={styles.controlButtonText}>✕</Text>
                </TouchableOpacity>
              </TVFocusGuideView>

              {/* Volume Indicator */}
              <View style={styles.volumeIndicator}>
                <Text style={styles.volumeText}>🔊 {Math.round(volume * 100)}%</Text>
              </View>
            </View>
          </View>
        )}

        {/* Tap to show controls */}
        <TouchableOpacity
          style={styles.tapToShowControls}
          onPress={() => setShowControls(true)}
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 40,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  contentMeta: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  screenModeIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  screenModeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerControls: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  centerPlayText: {
    fontSize: 40,
    color: '#000000',
    marginLeft: 8,
  },
  bottomControls: {
    padding: 40,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E50914',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  controlFocused: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ scale: 1.1 }],
  },
  controlButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  volumeIndicator: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  volumeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  tapToShowControls: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default TVVideoPlayer;