// src/screens/ReelsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import ReelsPlayer from '../components/ReelsPlayer';
import { fetchVideos } from '../services/api'; // assumes this now supports cursor
import { VideoItem } from '../types/VideoItem';

const { height } = Dimensions.get('window');

const ReelsScreen = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true); 
  const loadVideos = async () => {
    if (loading || !hasNext) return;  // avoid duplicate calls & stop if no next page

    setLoading(true);
    const { videos: newVideos, nextCursor } = await fetchVideos(cursor);
    setVideos(prev => [...prev, ...newVideos]);
    setCursor(nextCursor);
    setHasNext(nextCursor !== null);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handlePageChange = (e: any) => {
    const index = e.nativeEvent.position;
    setCurrentIndex(index);
    if (index === videos.length - 1 && !loading && hasNext) {
      loadVideos();
    }
  };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pager} orientation="vertical" onPageSelected={handlePageChange}>
        {videos.map((item, index) => {
          if (
            index === currentIndex ||
            index === currentIndex + 1 ||
            index === currentIndex - 1
          ) {
            return (
              <View key={item.id} style={{ height }}>
                <ReelsPlayer item={item} isActive={index === currentIndex} />
              </View>
            );
          } else {
            return <View key={item.id} style={{ height, backgroundColor: 'black' }} />;
          }
        })}
      </PagerView>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  pager: { flex: 1 },
  loader: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});

export default ReelsScreen;
