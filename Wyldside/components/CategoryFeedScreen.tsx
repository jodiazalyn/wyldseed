import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Dimensions, Alert, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera, Video, Heart, MessageCircle, Share, Plus, Search, Filter, TrendingUp, Users, Star, ShoppingCart, Send, MoveHorizontal as MoreHorizontal, Play, Pause, Volume2, VolumeX, MapPin, Clock, Eye, Flame, Crown, Zap, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface CategoryFeedScreenProps {
  categoryName: string;
  categoryIcon: any;
  initialPosts: any[];
  initialMarketplaceItems: any[];
  filters: any[];
}

export default function CategoryFeedScreen({ 
  categoryName, 
  categoryIcon, 
  initialPosts, 
  initialMarketplaceItems, 
  filters 
}: CategoryFeedScreenProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'upload' | 'profile'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [postType, setPostType] = useState<'photo' | 'video' | 'story'>('photo');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState<{ [key: number]: boolean }>({});
  const [isMuted, setIsMuted] = useState<{ [key: number]: boolean }>({});

  const [posts, setPosts] = useState(initialPosts);
  const [marketplaceItems, setMarketplaceItems] = useState(initialMarketplaceItems);

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

  const handleFollow = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            user: {
              ...post.user,
              isFollowing: !post.user.isFollowing
            }
          }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;
    
    setNewComment('');
    setShowComments(null);
    Alert.alert('Comment Added', 'Your comment has been posted!');
  };

  const toggleVideo = (postId: number) => {
    setIsVideoPlaying(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleMute = (postId: number) => {
    setIsMuted(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const createPost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: posts.length + 1,
      type: postType,
      user: {
        name: 'You',
        username: '@you',
        avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
        verified: false,
        followers: 1250,
        isFollowing: false,
      },
      content: newPostText,
      location: 'Your Location',
      timestamp: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      isLiked: false,
      media: {
        type: postType,
        url: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
        ...(postType === 'video' && { duration: '0:30' }),
      },
      tags: [`#${categoryName.toLowerCase()}`],
    };

    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
    setNewPostText('');
    setPostType('photo');
  };

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
              <Text style={styles.cancelText}>Cancel</Text>
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
              <TouchableOpacity
                style={[styles.postTypeButton, postType === 'photo' && styles.selectedPostType]}
                onPress={() => setPostType('photo')}
              >
                <Camera size={20} color="#fff" />
                <Text style={styles.postTypeText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postTypeButton, postType === 'video' && styles.selectedPostType]}
                onPress={() => setPostType('video')}
              >
                <Video size={20} color="#fff" />
                <Text style={styles.postTypeText}>Video</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.postInput}
              placeholder={`Share your ${categoryName} content...`}
              placeholderTextColor="#999"
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />

            <View style={styles.uploadArea}>
              <Camera size={48} color="#666" />
              <Text style={styles.uploadText}>Tap to add media</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderCommentsModal = () => (
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
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.commentsTitle}>Comments</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.commentsList}>
            <View style={styles.commentItem}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg' }} 
                style={styles.commentAvatar} 
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>@enthusiast</Text>
                <Text style={styles.commentText}>Amazing content! Love this {categoryName} post!</Text>
                <Text style={styles.commentTime}>2h ago</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={() => handleComment(showComments!)}
            >
              <Send size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.followButton, post.user.isFollowing && styles.followingButton]}
            onPress={() => handleFollow(post.id)}
          >
            <Text style={[styles.followText, post.user.isFollowing && styles.followingText]}>
              {post.user.isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={20} color="#999" />
          </TouchableOpacity>
        </View>
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

      <View style={styles.mediaContainer}>
        <Image source={{ uri: post.media.url }} style={styles.postMedia} />
        {post.media.type === 'video' && (
          <View style={styles.videoOverlay}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => toggleVideo(post.id)}
            >
              {isVideoPlaying[post.id] ? (
                <Pause size={24} color="#fff" fill="#fff" />
              ) : (
                <Play size={24} color="#fff" fill="#fff" />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.muteButton}
              onPress={() => toggleMute(post.id)}
            >
              {isMuted[post.id] ? (
                <VolumeX size={20} color="#fff" />
              ) : (
                <Volume2 size={20} color="#fff" />
              )}
            </TouchableOpacity>
            <View style={styles.videoDuration}>
              <Text style={styles.videoDurationText}>{post.media.duration}</Text>
            </View>
          </View>
        )}
        {post.views && (
          <View style={styles.viewsOverlay}>
            <Eye size={14} color="#fff" />
            <Text style={styles.viewsText}>{post.views.toLocaleString()}</Text>
          </View>
        )}
      </View>

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
            {post.likes.toLocaleString()}
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

  const renderMarketplaceItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.marketplaceCard}>
      <View style={styles.marketplaceImageContainer}>
        <Image source={{ uri: item.image }} style={styles.marketplaceImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      <View style={styles.marketplaceInfo}>
        <Text style={styles.marketplaceTitle}>{item.name}</Text>
        <Text style={styles.marketplacePrice}>{item.price}</Text>
        <Text style={styles.marketplaceMileage}>{item.mileage}</Text>
        
        <View style={styles.marketplaceSpecs}>
          {item.specs.slice(0, 2).map((spec: string, index: number) => (
            <View key={index} style={styles.marketplaceSpec}>
              <Text style={styles.marketplaceSpecText}>{spec}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.marketplaceSeller}>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{item.seller.name}</Text>
            {item.seller.verified && (
              <View style={styles.verifiedBadgeSmall}>
                <Text style={styles.verifiedIconSmall}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{item.seller.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.marketplaceLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFeedTab = () => (
    <>
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.activeFilterButton
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <IconComponent 
                  size={16} 
                  color={selectedFilter === filter.id ? "#fff" : "#999"} 
                />
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter.id && styles.activeFilterText
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.feedContent} showsVerticalScrollIndicator={false}>
        {posts.map(renderPost)}
      </ScrollView>
    </>
  );

  const renderMarketplaceTab = () => (
    <ScrollView style={styles.marketplaceContent} showsVerticalScrollIndicator={false}>
      <View style={styles.marketplaceHeader}>
        <Text style={styles.marketplaceTitle}>{categoryName} Marketplace</Text>
        <Text style={styles.marketplaceSubtitle}>Find premium {categoryName.toLowerCase()} items</Text>
      </View>
      
      <View style={styles.marketplaceGrid}>
        {marketplaceItems.map(renderMarketplaceItem)}
      </View>
    </ScrollView>
  );

  const renderUploadTab = () => (
    <View style={styles.uploadContainer}>
      <Text style={styles.uploadTitle}>Share Your {categoryName}</Text>
      <Text style={styles.uploadSubtitle}>Upload photos and videos of your {categoryName.toLowerCase()} content</Text>
      
      <View style={styles.uploadOptions}>
        <TouchableOpacity 
          style={styles.uploadOption}
          onPress={() => {
            setPostType('photo');
            setShowCreatePost(true);
          }}
        >
          <Camera size={48} color="#8B5CF6" />
          <Text style={styles.uploadOptionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.uploadOption}
          onPress={() => {
            setPostType('video');
            setShowCreatePost(true);
          }}
        >
          <Video size={48} color="#8B5CF6" />
          <Text style={styles.uploadOptionText}>Record Video</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.uploadTips}>
        <Text style={styles.tipsTitle}>Tips for great content:</Text>
        <Text style={styles.tipText}>• Use good lighting</Text>
        <Text style={styles.tipText}>• Show multiple angles</Text>
        <Text style={styles.tipText}>• Include detailed descriptions</Text>
        <Text style={styles.tipText}>• Use relevant hashtags</Text>
      </View>
    </View>
  );

  const renderProfileTab = () => (
    <ScrollView style={styles.profileContent} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg' }} 
          style={styles.profileAvatar} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Your Name</Text>
          <Text style={styles.profileHandle}>@your_username</Text>
          <Text style={styles.profileBio}>{categoryName} enthusiast • Sharing the passion</Text>
        </View>
      </View>
      
      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1.2K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>856</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
      </View>
      
      <View style={styles.profileActions}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareProfileButton}>
          <Share size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileGrid}>
        {posts.slice(0, 6).map((post) => (
          <TouchableOpacity key={post.id} style={styles.profileGridItem}>
            <Image source={{ uri: post.media.url }} style={styles.profileGridImage} />
            {post.media.type === 'video' && (
              <View style={styles.profileVideoIndicator}>
                <Play size={16} color="#fff" fill="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{categoryName}</Text>
        <View style={styles.headerActions}>
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

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Users size={20} color={activeTab === 'feed' ? '#8B5CF6' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'marketplace' && styles.activeTab]}
          onPress={() => setActiveTab('marketplace')}
        >
          <ShoppingCart size={20} color={activeTab === 'marketplace' ? '#8B5CF6' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'marketplace' && styles.activeTabText]}>
            Market
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upload' && styles.activeTab]}
          onPress={() => setActiveTab('upload')}
        >
          <Camera size={20} color={activeTab === 'upload' ? '#8B5CF6' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'upload' && styles.activeTabText]}>
            Upload
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Users size={20} color={activeTab === 'profile' ? '#8B5CF6' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'feed' && renderFeedTab()}
        {activeTab === 'marketplace' && renderMarketplaceTab()}
        {activeTab === 'upload' && renderUploadTab()}
        {activeTab === 'profile' && renderProfileTab()}
      </View>

      {renderCreatePostModal()}
      {renderCommentsModal()}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#282828',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#1a1a1a',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
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
  feedContent: {
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  followButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followingButton: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  followText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  followingText: {
    color: '#8B5CF6',
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
    height: 250,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
  viewsOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  viewsText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
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
  marketplaceContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  marketplaceHeader: {
    marginBottom: 20,
  },
  marketplaceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  marketplaceSubtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
  marketplaceGrid: {
    gap: 16,
  },
  marketplaceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  marketplaceImageContainer: {
    position: 'relative',
  },
  marketplaceImage: {
    width: '100%',
    height: 200,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  marketplaceInfo: {
    padding: 16,
  },
  marketplacePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
    marginTop: 4,
  },
  marketplaceMileage: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  marketplaceSpecs: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  marketplaceSpec: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  marketplaceSpecText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  marketplaceSeller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  verifiedBadgeSmall: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  verifiedIconSmall: {
    fontSize: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  marketplaceLocation: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 4,
  },
  uploadContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
  uploadOptions: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  uploadOption: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 120,
  },
  uploadOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 12,
  },
  uploadTips: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileHandle: {
    fontSize: 16,
    color: '#8B5CF6',
    marginTop: 2,
  },
  profileBio: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  shareProfileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  profileGridItem: {
    width: (width - 44) / 3,
    height: (width - 44) / 3,
    position: 'relative',
  },
  profileGridImage: {
    width: '100%',
    height: '100%',
  },
  profileVideoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
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
  cancelText: {
    fontSize: 16,
    color: '#8B5CF6',
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
    gap: 12,
    marginBottom: 20,
  },
  postTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  selectedPostType: {
    backgroundColor: '#8B5CF6',
  },
  postTypeText: {
    fontSize: 14,
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
    marginBottom: 20,
  },
  uploadArea: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  commentsModal: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
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
  placeholder: {
    width: 60,
  },
  commentsList: {
    flex: 1,
    padding: 20,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
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
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 18,
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});