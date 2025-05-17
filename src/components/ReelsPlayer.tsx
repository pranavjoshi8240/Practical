import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { VideoItem } from '../types/VideoItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const CDN_URL = 'https://cdn.sociocircle.org/';

interface Props {
    item: VideoItem;
    isActive: boolean;
}

const ReelsPlayer: React.FC<Props> = ({ item, isActive }) => {
    const [paused, setPaused] = useState(false);
    const [buffering, setBuffering] = useState(true);
    const [muted, setMuted] = useState(false);  // Start unmuted
    const videoRef = useRef<Video>(null);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const toggleDescription = () => setShowFullDesc(prev => !prev);
    const rawDescription = item.description?.trim();
    const descriptionText = rawDescription && rawDescription.length > 0
        ? rawDescription
        : 'This is a wonderful glimpse from the community.This is a wonderful glimpse from the community.'


    const getTruncatedDescription = (desc: string) => {
        if (desc.length <= 30) return desc;
        return showFullDesc ? desc : desc.slice(0, 30) + '...';
    };
    return (
        <Pressable
            style={styles.container}
            onPress={() => setPaused(!paused)}
        >

            <Video
                ref={videoRef}
                source={{ uri: item?.contentUrl ? CDN_URL + item.contentUrl : '' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                resizeMode="stretch"
                paused={!isActive || paused}
                muted={muted}
                repeat
            />

            <View style={styles.overlay}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: CDN_URL + item.orgImage }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>@{item.orgName}</Text>
                </View>

                <View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            {getTruncatedDescription(descriptionText)}
                        </Text>

                        {descriptionText.length > 30 && (
                            <TouchableOpacity onPress={toggleDescription}>
                                <Text style={styles.readMore}>
                                    {showFullDesc ? 'Show Less' : 'Read More'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.bottomRight}>
                        <View style={styles.iconRow}>
                            <FAIcon name="heart" size={24} color="red" />
                            <Text style={styles.stats}>{item.totalLikes}</Text>
                        </View>
                        <View style={styles.iconRow}>
                            <FAIcon name="comment" size={24} color="white" />
                            <Text style={styles.stats}>{item.totalComments}</Text>
                        </View>

                        <TouchableOpacity onPress={() => setMuted(!muted)} style={styles.iconRow}>
                            <Icon name={muted ? 'volume-mute' : 'volume-high'} size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            {/* </View> */}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    bottomRight: {
        position: 'absolute',
        right: 16,
        bottom: 50,
        alignItems: 'flex-end',
    },
    stats: {
        color: 'white',
        marginBottom: 8,
    },
    volumeButton: {
        marginTop: 10,
    },
    volumeText: {
        fontSize: 24,
        color: 'white',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        alignSelf: 'center',
    },
    iconRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 12,
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    description: {
        color: 'white',
        fontSize: 14,
    },
    readMore: {
        color: '#ccc',
        marginTop: 4,
        fontSize: 13,
    },
});

export default ReelsPlayer;
