import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Dimensions, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { MapPin, Heart, MessageCircle, Share, Camera, Video, Plus, Flame, ThumbsUp, ThumbsDown, Trophy, Users, Clock, TrendingUp, Filter, Search, X, Send, MoveHorizontal as MoreHorizontal, Globe, ChevronDown, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicPlayer } from '@/components/MusicPlayer';

const { width, height } = Dimensions.get('window');

export default function SocialFeedScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [postType, setPostType] = useState<'text' | 'photo' | 'video' | 'poll' | 'debate'>('text');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [debateTopic, setDebateTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filters = [
    { 
      id: 'all', 
      name: 'All', 
      icon: Users, 
      colors: ['#8B5CF6', '#A855F7'],
      backgroundColor: '#8B5CF6'
    },
    { 
      id: 'trending', 
      name: 'Trending', 
      icon: TrendingUp, 
      colors: ['#F59E0B', '#F97316'],
      backgroundColor: '#F59E0B'
    },
    { 
      id: 'polls', 
      name: 'Polls', 
      icon: ThumbsUp, 
      colors: ['#10B981', '#059669'],
      backgroundColor: '#10B981'
    },
    { 
      id: 'debates', 
      name: 'Debates', 
      icon: MessageCircle, 
      colors: ['#EF4444', '#DC2626'],
      backgroundColor: '#EF4444'
    },
    { 
      id: 'sports', 
      name: 'Sports', 
      icon: Trophy, 
      colors: ['#3B82F6', '#2563EB'],
      backgroundColor: '#3B82F6'
    },
    { 
      id: 'nearby', 
      name: 'Nearby', 
      icon: MapPin, 
      colors: ['#EC4899', '#DB2777'],
      backgroundColor: '#EC4899'
    },
  ];

  const postTypes = [
    { id: 'text', name: 'Text', icon: MessageCircle, color: '#8B5CF6' },
    { id: 'photo', name: 'Photo', icon: Camera, color: '#10B981' },
    { id: 'video', name: 'Video', icon: Video, color: '#F59E0B' },
    { id: 'poll', name: 'Poll', icon: ThumbsUp, color: '#EF4444' },
    { id: 'debate', name: 'Debate', icon: Trophy, color: '#8B5CF6' },
  ];

  const [following, setFollowing] = useState<number[]>([2]); // IDs of users being followed
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  
  // Instagram-style Stories
  const stories = [
    {
      id: 1,
      user: {
        name: 'You',
        username: '@you',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
      },
      hasStory: false,
      isYour: true,
    },
    {
      id: 2,
      user: {
        name: 'Alex Chen',
        username: '@alexc_style',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
      },
      hasStory: true,
      isYour: false,
    },
    {
      id: 3,
      user: {
        name: 'DJ Pulse',
        username: '@djpulse_official',
        avatar: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      },
      hasStory: true,
      isYour: false,
    },
    {
      id: 4,
      user: {
        name: 'Sophia',
        username: '@luxury_life',
        avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      },
      hasStory: true,
      isYour: false,
    },
  ];

  // Suggested users to follow
  const suggestedUsers = [
    {
      id: 5,
      name: 'Fashion Nova',
      username: '@fashion_nova',
      avatar: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
      verified: true,
      followers: '2.1M',
      mutualFollowers: 3,
    },
    {
      id: 6,
      name: 'Street Culture',
      username: '@street_culture',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      verified: false,
      followers: '156K',
      mutualFollowers: 7,
    },
  ];

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'poll',
      user: {
        id: 1,
        name: 'Alex Chen',
        username: '@alexc_style',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
        verified: true,
        followers: '89.2K',
      },
      content: 'Which fit goes harder? 🔥',
      location: 'Brooklyn, NY',
      timestamp: '2h ago',
      likes: 1247,
      comments: 89,
      shares: 34,
      isLiked: false,
      poll: {
        question: 'Which fit goes harder?',
        options: [
          { id: 1, text: 'Jordan 1s + Hoodie', votes: 847, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
          { id: 2, text: 'Yeezys + Tracksuit', votes: 623, image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg' }
        ],
        totalVotes: 1470,
        userVoted: 1,
      },
      tags: ['#streetwear', '#fashion', '#brooklyn'],
    },
    {
      id: 2,
      type: 'debate',
      user: {
        id: 2,
        name: 'Marcus Johnson',
        username: '@hoops_king',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
        verified: false,
        followers: '245K',
      },
      content: 'LeBron vs MJ debate will never end, but who had the better sneaker game? 👑',
      location: 'Los Angeles, CA',
      timestamp: '4h ago',
      likes: 2156,
      comments: 342,
      shares: 78,
      isLiked: true,
      debate: {
        topic: 'LeBron vs MJ: Better Sneaker Game?',
        sides: [
          { id: 1, position: 'LeBron', supporters: 1834, color: '#8B5CF6' },
          { id: 2, position: 'Michael Jordan', supporters: 2187, color: '#EF4444' }
        ],
        userSide: 1,
      },
      tags: ['#basketball', '#sneakers', '#goat'],
    },
    {
      id: 3,
      type: 'photo',
      user: {
        id: 3,
        name: 'Sophia Martinez',
        username: '@luxury_life',
        avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
        verified: true,
        followers: '1.2M',
      },
      content: 'New McLaren just dropped 🏎️💨 The sound is unreal!',
      location: 'Miami, FL',
      timestamp: '6h ago',
      likes: 3421,
      comments: 156,
      shares: 89,
      isLiked: false,
      media: {
        type: 'photo',
        url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
      },
      tags: ['#mclaren', '#supercar', '#miami'],
    },
    {
      id: 4,
      type: 'video',
      user: {
        id: 4,
        name: 'DJ Pulse',
        username: '@djpulse_official',
        avatar: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
        verified: true,
        followers: '567K',
      },
      content: 'Studio session vibes 🎵 New track dropping soon!',
      location: 'Atlanta, GA',
      timestamp: '8h ago',
      likes: 5678,
      comments: 234,
      shares: 123,
      isLiked: true,
      media: {
        type: 'video',
        url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
        duration: '0:45',
      },
      tags: ['#studio', '#newmusic', '#atlanta'],
    },
    {
      id: 5,
      type: 'poll',
      user: {
        id: 5,
        name: 'Fashion Forward',
        username: '@fashion_fwd',
        avatar: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
        verified: false,
        followers: '78K',
      },
      content: 'Rate this Gucci x Adidas collab 👕',
      location: 'Paris, France',
      timestamp: '12h ago',
      likes: 892,
      comments: 67,
      shares: 23,
      isLiked: false,
      poll: {
        question: 'Rate this Gucci x Adidas collab',
        options: [
          { id: 1, text: '🔥 Fire', votes: 567 },
          { id: 2, text: '👍 Good', votes: 234 },
          { id: 3, text: '👎 Not it', votes: 91 }
        ],
        totalVotes: 892,
        userVoted: null,
      },
      tags: ['#gucci', '#adidas', '#collab'],
    },
  ]);

  // Instagram-inspired Follow functionality
  const handleFollow = (userId: number) => {
    setFollowing(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;
    Alert.alert('Comment Added', 'Your comment has been posted!');
    setNewComment('');
    setShowComments(null);
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleVote = (postId: number, optionId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.poll) {
        const updatedOptions = post.poll.options.map(option => 
          option.id === optionId 
            ? { ...option, votes: option.votes + 1 }
            : option
        );
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: post.poll.totalVotes + 1,
            userVoted: optionId,
          }
        };
      }
      return post;
    }));
  };

  const handleDebateJoin = (postId: number, sideId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.debate) {
        const updatedSides = post.debate.sides.map(side => 
          side.id === sideId 
            ? { ...side, supporters: side.supporters + 1 }
            : side
        );
        return {
          ...post,
          debate: {
            ...post.debate,
            sides: updatedSides,
            userSide: sideId,
          }
        };
      }
      return post;
    }));
  };

  const createPost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: posts.length + 1,
      type: postType,
      user: {
        id: 0,
        name: 'You',
        username: '@you',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
        verified: false,
        followers: '0',
      },
      content: newPostText,
      location: selectedLocation || 'Your Location',
      timestamp: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      tags: [],
      ...(postType === 'poll' && {
        poll: {
          question: newPostText,
          options: pollOptions.filter(opt => opt.trim()).map((opt, idx) => ({
            id: idx + 1,
            text: opt,
            votes: 0,
          })),
          totalVotes: 0,
          userVoted: null,
        }
      }),
      ...(postType === 'debate' && {
        debate: {
          topic: debateTopic || newPostText,
          sides: [
            { id: 1, position: 'For', supporters: 0, color: '#10B981' },
            { id: 2, position: 'Against', supporters: 0, color: '#EF4444' }
          ],
          userSide: null,
        }
      }),
    };

    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
    setNewPostText('');
    setSelectedLocation('');
    setPollOptions(['', '']);
    setDebateTopic('');
    setPostType('text');
  };

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

  const renderCreatePostModal = () => (
    <Modal
      visible={showCreatePost}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCreatePost(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.createPostModal}>
          <View style={styles.createPostHeader}>
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.createPostTitle}>Create Post</Text>
            <TouchableOpacity 
              style={styles.postButton}
              onPress={createPost}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.createPostContent}>
            <View style={styles.postTypeSelector}>
              {postTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.postTypeButton,
                      { backgroundColor: type.color },
                      postType === type.id && styles.selectedPostType
                    ]}
                    onPress={() => setPostType(type.id as any)}
                  >
                    <IconComponent size={20} color="#fff" />
                    <Text style={styles.postTypeText}>{type.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              style={styles.postInput}
              placeholder="What's happening?"
              placeholderTextColor="#999"
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />

            <TextInput
              style={styles.locationInput}
              placeholder="Add location..."
              placeholderTextColor="#999"
              value={selectedLocation}
              onChangeText={setSelectedLocation}
            />

            {postType === 'poll' && (
              <View style={styles.pollCreator}>
                <Text style={styles.pollCreatorTitle}>Poll Options:</Text>
                {pollOptions.map((option, index) => (
                  <TextInput
                    key={index}
                    style={styles.pollOptionInput}
                    placeholder={`Option ${index + 1}`}
                    placeholderTextColor="#999"
                    value={option}
                    onChangeText={(text) => {
                      const newOptions = [...pollOptions];
                      newOptions[index] = text;
                      setPollOptions(newOptions);
                    }}
                  />
                ))}
                <TouchableOpacity
                  style={styles.addOptionButton}
                  onPress={() => setPollOptions([...pollOptions, ''])}
                >
                  <Plus size={16} color="#8B5CF6" />
                  <Text style={styles.addOptionText}>Add Option</Text>
                </TouchableOpacity>
              </View>
            )}

            {postType === 'debate' && (
              <View style={styles.debateCreator}>
                <Text style={styles.debateCreatorTitle}>Debate Topic:</Text>
                <TextInput
                  style={styles.debateTopicInput}
                  placeholder="What's the debate about?"
                  placeholderTextColor="#999"
                  value={debateTopic}
                  onChangeText={setDebateTopic}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Mock comments data for each post
  const getCommentsForPost = (postId: number) => {
    const commentsData = {
      1: [
        {
          id: 1,
          user: { name: 'Sarah K', username: '@sarah_style', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' },
          text: 'Those Jordan 1s are straight fire! 🔥',
          time: '2h ago',
          likes: 12
        },
        {
          id: 2,
          user: { name: 'Mike Chen', username: '@mike_fashion', avatar: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg' },
          text: 'Tracksuit gang all day! Yeezys hit different 💯',
          time: '1h ago',
          likes: 8
        },
        {
          id: 3,
          user: { name: 'Style Queen', username: '@style_queen', avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
          text: 'Both fits are clean but that hoodie combo is unmatched',
          time: '45m ago',
          likes: 5
        }
      ],
      2: [
        {
          id: 1,
          user: { name: 'Basketball Fan', username: '@hoops_life', avatar: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg' },
          text: 'MJ all day! Those Chicago 1s changed the game forever',
          time: '3h ago',
          likes: 23
        },
        {
          id: 2,
          user: { name: 'Sneaker Head', username: '@kicks_daily', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' },
          text: 'LeBron got variety but MJ got that timeless style 👑',
          time: '2h ago',
          likes: 18
        }
      ],
      3: [
        {
          id: 1,
          user: { name: 'Car Enthusiast', username: '@speed_demon', avatar: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg' },
          text: 'That McLaren sound is pure music! 🎵',
          time: '4h ago',
          likes: 31
        },
        {
          id: 2,
          user: { name: 'Luxury Lover', username: '@luxury_life', avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
          text: 'Miami vibes with that beauty! Where did you see it?',
          time: '3h ago',
          likes: 15
        }
      ],
      4: [
        {
          id: 1,
          user: { name: 'Music Producer', username: '@beats_maker', avatar: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg' },
          text: 'Studio sessions always hit different! 🔥🎵',
          time: '6h ago',
          likes: 42
        }
      ],
      5: [
        {
          id: 1,
          user: { name: 'Fashion Critic', username: '@fashion_review', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' },
          text: 'Gucci x Adidas is bold but not sure it works...',
          time: '10h ago',
          likes: 7
        }
      ]
    };
    return commentsData[postId as keyof typeof commentsData] || [];
  };

  const renderCommentsModal = () => {
    const currentPost = posts.find(p => p.id === showComments);
    const comments = showComments ? getCommentsForPost(showComments) : [];
    
    return (
      <Modal
        visible={showComments !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowComments(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentsModal}>
            <View style={styles.commentsHeader}>
              <TouchableOpacity onPress={() => setShowComments(null)}>
                <X size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.commentsTitle}>Comments</Text>
              <Text style={styles.commentsCount}>{comments.length}</Text>
            </View>

            <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
              {currentPost && (
                <View style={styles.originalPost}>
                  <View style={styles.originalPostHeader}>
                    <Image source={{ uri: currentPost.user.avatar }} style={styles.commentAvatar} />
                    <View style={styles.originalPostInfo}>
                      <Text style={styles.originalPostUser}>{currentPost.user.name}</Text>
                      <Text style={styles.originalPostText}>{currentPost.content}</Text>
                    </View>
                  </View>
                </View>
              )}
              
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>{comment.user.username}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <View style={styles.commentActions}>
                      <TouchableOpacity style={styles.commentLike}>
                        <Heart size={14} color="#999" />
                        <Text style={styles.commentLikeCount}>{comment.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.commentReply}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg' }} 
                style={styles.commentInputAvatar} 
              />
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="#999"
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity 
                style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
                onPress={() => handleComment(showComments!)}
                disabled={!newComment.trim()}
              >
                <Send size={20} color={!newComment.trim() ? "#666" : "#8B5CF6"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.userHandle}>{post.user.username}</Text>
          <View style={styles.postMeta}>
            <MapPin size={12} color="#8B5CF6" />
            <Text style={styles.location}>{post.location}</Text>
            <Text style={styles.timestamp}>• {post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.tags && post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag: string, index: number) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {post.media && (
        <View style={styles.mediaContainer}>
          <Image source={{ uri: post.media.url }} style={styles.postMedia} />
          {post.media.type === 'video' && (
            <View style={styles.videoOverlay}>
              <TouchableOpacity style={styles.playButton}>
                <Video size={24} color="#fff" fill="#fff" />
              </TouchableOpacity>
              <View style={styles.videoDuration}>
                <Text style={styles.videoDurationText}>{post.media.duration}</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {post.poll && (
        <View style={styles.pollContainer}>
          <Text style={styles.pollQuestion}>{post.poll.question}</Text>
          {post.poll.options.map((option: any) => {
            const percentage = post.poll.totalVotes > 0 
              ? Math.round((option.votes / post.poll.totalVotes) * 100) 
              : 0;
            const isVoted = post.poll.userVoted === option.id;
            
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.pollOption,
                  isVoted && styles.votedPollOption
                ]}
                onPress={() => !post.poll.userVoted && handleVote(post.id, option.id)}
                disabled={!!post.poll.userVoted}
              >
                {option.image && (
                  <Image source={{ uri: option.image }} style={styles.pollOptionImage} />
                )}
                <View style={styles.pollOptionContent}>
                  <Text style={[styles.pollOptionText, isVoted && styles.votedPollOptionText]}>
                    {option.text}
                  </Text>
                  {post.poll.userVoted && (
                    <Text style={styles.pollPercentage}>{percentage}%</Text>
                  )}
                </View>
                {post.poll.userVoted && (
                  <View style={[styles.pollProgress, { width: `${percentage}%` }]} />
                )}
              </TouchableOpacity>
            );
          })}
          <Text style={styles.pollVotes}>{post.poll.totalVotes} votes</Text>
        </View>
      )}

      {post.debate && (
        <View style={styles.debateContainer}>
          <Text style={styles.debateTopic}>{post.debate.topic}</Text>
          <View style={styles.debateSides}>
            {post.debate.sides.map((side: any) => {
              const total = post.debate.sides.reduce((sum: number, s: any) => sum + s.supporters, 0);
              const percentage = total > 0 ? Math.round((side.supporters / total) * 100) : 50;
              const isJoined = post.debate.userSide === side.id;
              
              return (
                <TouchableOpacity
                  key={side.id}
                  style={[
                    styles.debateSide,
                    { borderColor: side.color },
                    isJoined && { backgroundColor: side.color + '20' }
                  ]}
                  onPress={() => !post.debate.userSide && handleDebateJoin(post.id, side.id)}
                  disabled={!!post.debate.userSide}
                >
                  <Text style={[styles.debatePosition, { color: side.color }]}>
                    {side.position}
                  </Text>
                  <Text style={styles.debateSupporters}>
                    {side.supporters} supporters
                  </Text>
                  {post.debate.userSide && (
                    <Text style={styles.debatePercentage}>{percentage}%</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Heart 
            size={20} 
            color={post.isLiked ? "#EF4444" : "#999"} 
            fill={post.isLiked ? "#EF4444" : "none"}
          />
          <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowComments(post.id)}
        >
          <MessageCircle size={20} color="#999" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#999" />
          <Text style={styles.actionText}>{post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'polls') return post.type === 'poll';
    if (activeFilter === 'debates') return post.type === 'debate';
    if (activeFilter === 'trending') return post.likes > 1000;
    if (activeFilter === 'sports') return post.tags?.some(tag => 
      tag.includes('basketball') || tag.includes('sports') || tag.includes('goat')
    );
    if (activeFilter === 'nearby') return post.location.includes('NY') || post.location.includes('Brooklyn');
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Social Feed</Text>
          <Text style={styles.subtitle}>Connect with {currentRegion.name}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.regionSelector}
            onPress={() => setShowRegionModal(true)}
          >
            <Globe size={16} color="#fff" />
            <Text style={styles.regionFlag}>{currentRegion.flag}</Text>
            <Text style={styles.regionCode}>{currentRegion.code}</Text>
            <ChevronDown size={14} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setShowCreatePost(true)}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.appIconsContainer}>
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={styles.appIconWrapper}
                onPress={() => setActiveFilter(filter.id)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={isActive ? ['#fff', '#f0f0f0'] : filter.colors as [string, string]}
                  style={[
                    styles.appIcon,
                    isActive && styles.activeAppIcon
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconComponent 
                    size={20} 
                    color={isActive ? filter.backgroundColor : "#fff"} 
                  />
                </LinearGradient>
                <Text style={[
                  styles.appIconLabel,
                  isActive && styles.activeAppIconLabel
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredPosts.map(renderPost)}
      </ScrollView>

      {renderCreatePostModal()}
      {renderCommentsModal()}
      {renderRegionModal()}
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  regionFlag: {
    fontSize: 14,
  },
  regionCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    marginRight: 12,
    gap: 6,
  },
  activeFilterButton: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  location: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  mediaContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postMedia: {
    width: '100%',
    height: 200,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  videoDurationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  pollContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  votedPollOption: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  pollOptionImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  pollOptionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pollOptionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  votedPollOptionText: {
    fontWeight: '600',
  },
  pollPercentage: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  pollProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 8,
  },
  pollVotes: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  debateContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  debateTopic: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  debateSides: {
    flexDirection: 'row',
    gap: 12,
  },
  debateSide: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  debatePosition: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  debateSupporters: {
    fontSize: 12,
    color: '#999',
  },
  debatePercentage: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  likedText: {
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  createPostModal: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
  },
  createPostHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  createPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  createPostContent: {
    padding: 20,
  },
  postTypeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  postTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  selectedPostType: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  postTypeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  postInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  locationInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#fff',
    marginBottom: 16,
  },
  pollCreator: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  pollCreatorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  pollOptionInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 8,
    borderStyle: 'dashed',
    gap: 6,
  },
  addOptionText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  debateCreator: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  debateCreatorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  debateTopicInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#fff',
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
  // Comments Modal Styles
  commentsModal: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.8,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  commentsCount: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  commentsList: {
    flex: 1,
    padding: 20,
  },
  originalPost: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#8B5CF6',
  },
  originalPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPostInfo: {
    marginLeft: 12,
    flex: 1,
  },
  originalPostUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  originalPostText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 18,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentLikeCount: {
    fontSize: 12,
    color: '#999',
  },
  commentReply: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
    maxHeight: 80,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#222',
  },
  // App Icon Styles
  appIconsContainer: {
    paddingHorizontal: 12,
  },
  appIconWrapper: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  activeAppIcon: {
    elevation: 6,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  appIconLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeAppIconLabel: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});