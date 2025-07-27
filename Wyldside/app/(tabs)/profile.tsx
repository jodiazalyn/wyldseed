import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Settings, Heart, Download, ShoppingBag, Music, Crown, BarChart3, TrendingUp, Eye, Brain, Calendar, DollarSign, User, Target, Activity, Hash, Users, Smile, Frown, Meh, Globe2, MessageCircle, Zap, Network, Filter, MapPin, Radio, Star, Link2, TrendingDown, Zap as Lightning, Clock, Headphones, ShoppingCart, Play, Pause, Layers, BarChart2, PieChart, LineChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicPlayer } from '@/components/MusicPlayer';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

  const stats = [
    { label: "Songs Played", value: "1,247", icon: Music },
    { label: "Items Bought", value: "23", icon: ShoppingBag },
    { label: "Liked Songs", value: "156", icon: Heart },
    { label: "Downloads", value: "89", icon: Download },
  ];

  const recentPurchases = [
    {
      id: 1,
      name: "Air Jordan 4 Retro",
      price: "$190",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Supreme Box Logo Hoodie",
      price: "$350",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
      date: "1 week ago",
    },
  ];

  // Analytics data structure - ready for your dashboard details
  const analyticsData = {
    overview: {
      totalSpent: "$3,247",
      avgOrderValue: "$142",
      conversionRate: "23.4%",
      engagementScore: "8.7/10"
    },
    categories: [
      { name: "Sneakers", value: 45, color: "#FF6B35" },
      { name: "Streetwear", value: 30, color: "#1DB954" },
      { name: "Electronics", value: 15, color: "#8B5CF6" },
      { name: "Accessories", value: 10, color: "#F59E0B" }
    ],
    insights: [
      {
        title: "Shopping Behavior",
        description: "You tend to shop more on weekends",
        icon: Calendar,
        trend: "+12%"
      },
      {
        title: "Price Sensitivity",
        description: "Most purchases under $200",
        icon: DollarSign,
        trend: "68%"
      },
      {
        title: "Brand Loyalty",
        description: "High preference for Nike & Supreme",
        icon: Target,
                 trend: "+24%"
       }
     ]
   };

   // Cultural Intelligence Dashboard Data
   const culturalIntelligenceData = {
     realTimeSentiment: {
       overall: 8.2,
       positive: 67,
       neutral: 23,
       negative: 10,
       trending: "+5.3%"
     },
     keywordTrends: [
       { keyword: "#vibes", volume: 15420, trend: "+24%", sentiment: "positive" },
       { keyword: "#streetwear", volume: 12890, trend: "+18%", sentiment: "positive" },
       { keyword: "#mood", volume: 9340, trend: "-3%", sentiment: "neutral" },
       { keyword: "#authentic", volume: 7650, trend: "+31%", sentiment: "positive" },
       { keyword: "#luxury", volume: 6220, trend: "+12%", sentiment: "positive" }
     ],
     demographicBreakdown: [
       { segment: "Gen Z (18-24)", sentiment: 8.7, engagement: 92, color: "#FF6B35" },
       { segment: "Millennials (25-34)", sentiment: 7.9, engagement: 85, color: "#1DB954" },
       { segment: "Gen X (35-44)", sentiment: 7.2, engagement: 73, color: "#8B5CF6" },
       { segment: "Urban Culture", sentiment: 8.9, engagement: 96, color: "#F59E0B" }
     ],
     culturalTrends: [
       {
         category: "Music Genres",
         trends: [
           { name: "Afrobeats", growth: "+45%", sentiment: 8.9 },
           { name: "Hip-Hop", growth: "+23%", sentiment: 8.4 },
           { name: "R&B Revival", growth: "+38%", sentiment: 8.1 }
         ]
       },
       {
         category: "Fashion Movements",
         trends: [
           { name: "Sustainable Streetwear", growth: "+67%", sentiment: 9.1 },
           { name: "Vintage Athletics", growth: "+29%", sentiment: 7.8 },
           { name: "Tech Fashion", growth: "+52%", sentiment: 8.3 }
         ]
       }
     ],
     socialFeedMetrics: {
       totalInteractions: "2.4M",
       shareToListen: "23.4%",
       viralCoefficient: "1.8x",
       culturalReach: "156 countries"
          }
   };

   // Comprehensive Influence Mapping Data
   const influenceMappingData = {
     networkOverview: {
       totalInfluencers: 2847,
       activeConnections: 15603,
       avgInfluenceScore: 7.3,
       networkReach: "12.4M users"
     },
     topInfluencers: [
       {
         id: 1,
         name: "Travis Scott",
         type: "Mega Influencer",
         community: "Hip-Hop",
         location: "Houston, TX",
         followers: "45.2M",
         influenceScore: 9.8,
         streamImpact: "+340%",
         salesImpact: "+280%",
         engagementRate: "12.4%",
         avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
         connectedArtists: 156,
         trending: "up"
       },
       {
         id: 2,
         name: "Emma Chamberlain",
         type: "Lifestyle Influencer", 
         community: "Gen Z Culture",
         location: "Los Angeles, CA",
         followers: "12.1M",
         influenceScore: 8.9,
         streamImpact: "+145%",
         salesImpact: "+190%",
         engagementRate: "18.7%",
         avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
         connectedArtists: 89,
         trending: "up"
       },
       {
         id: 3,
         name: "Complex Music",
         type: "Media Outlet",
         community: "Music Media",
         location: "New York, NY",
         followers: "8.9M",
         influenceScore: 8.4,
         streamImpact: "+89%",
         salesImpact: "+67%",
         engagementRate: "9.2%",
         avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
         connectedArtists: 234,
         trending: "stable"
       },
       {
         id: 4,
         name: "Highsnobiety",
         type: "Fashion Media",
         community: "Streetwear",
         location: "Berlin, DE",
         followers: "6.7M",
         influenceScore: 7.8,
         streamImpact: "+56%",
         salesImpact: "+156%",
         engagementRate: "11.3%",
         avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg",
         connectedArtists: 178,
         trending: "up"
       }
     ],
     filterOptions: {
       communities: ["Hip-Hop", "Gen Z Culture", "Music Media", "Streetwear", "R&B", "Afrobeats"],
       genres: ["Hip-Hop", "R&B", "Pop", "Electronic", "Afrobeats", "Latin"],
       locations: ["Los Angeles", "New York", "Atlanta", "Toronto", "London", "Berlin"],
       influencerTypes: ["Mega Influencer", "Lifestyle Influencer", "Media Outlet", "Fashion Media", "Music Artist", "Tastemaker"]
     },
     impactMetrics: {
       streamBoost: {
         avg: "+127%",
         top: "+340%",
         trend: "+23%"
       },
       salesBoost: {
         avg: "+89%", 
         top: "+280%",
         trend: "+34%"
       },
       engagementBoost: {
         avg: "+67%",
         top: "+156%", 
         trend: "+12%"
       }
     },
     networkConnections: [
       { from: "Travis Scott", to: "Hip-Hop Community", strength: 95, type: "genre" },
       { from: "Emma Chamberlain", to: "Gen Z Brands", strength: 87, type: "demographic" },
       { from: "Complex Music", to: "Underground Artists", strength: 78, type: "discovery" },
       { from: "Highsnobiety", to: "Fashion Brands", strength: 92, type: "commercial" }
     ]
   };

   const [selectedFilters, setSelectedFilters] = useState({
     community: "All",
     genre: "All", 
     location: "All",
     influencerType: "All"
   });

   // Behavioral Motivation Insights Data
   const behavioralInsightsData = {
     predictiveModels: {
       engagementPrediction: {
         accuracy: 94.2,
         confidence: 89.7,
         trend: "+12.3%"
       },
       purchasePrediction: {
         accuracy: 87.8,
         confidence: 92.1,
         trend: "+8.7%"
       },
       streamingPrediction: {
         accuracy: 91.5,
         confidence: 88.4,
         trend: "+15.2%"
       }
     },
     emotionalTriggers: [
       {
         emotion: "Nostalgia",
         impact: 92,
         triggers: ["Throwback Thursdays", "Vintage Aesthetics", "Childhood Memories"],
         color: "#8B5CF6",
         engagement: "+67%",
         conversions: "+34%"
       },
       {
         emotion: "FOMO (Fear of Missing Out)",
         impact: 88,
         triggers: ["Limited Drops", "Exclusive Access", "Trending Now"],
         color: "#EF4444",
         engagement: "+89%",
         conversions: "+56%"
       },
       {
         emotion: "Social Validation",
         impact: 85,
         triggers: ["Peer Approval", "Status Symbols", "Flex Culture"],
         color: "#F59E0B",
         engagement: "+72%",
         conversions: "+45%"
       },
       {
         emotion: "Aspiration",
         impact: 81,
         triggers: ["Success Stories", "Lifestyle Upgrades", "Dream Goals"],
         color: "#10B981",
         engagement: "+63%",
         conversions: "+38%"
       }
     ],
     psychologicalFactors: {
       personalityTraits: [
         { trait: "Trendsetter", percentage: 28, influence: "High", behavior: "Early Adopter" },
         { trait: "Follower", percentage: 35, influence: "Medium", behavior: "Social Proof Driven" },
         { trait: "Independent", percentage: 22, influence: "Low", behavior: "Quality Focused" },
         { trait: "Collector", percentage: 15, influence: "High", behavior: "Completion Driven" }
       ],
       motivationalDrivers: [
         { driver: "Self-Expression", score: 9.2, impact: "Content Creation", color: "#8B5CF6" },
         { driver: "Social Connection", score: 8.8, impact: "Sharing & Comments", color: "#1DB954" },
         { driver: "Achievement", score: 8.4, impact: "Collection Building", color: "#F59E0B" },
         { driver: "Discovery", score: 7.9, impact: "Exploration Behavior", color: "#EF4444" }
       ]
     },
     behavioralPatterns: {
       contentEngagement: {
         peakTimes: [
           { time: "7-9 AM", activity: "Morning Motivation", engagement: 78 },
           { time: "12-2 PM", activity: "Lunch Break Scroll", engagement: 85 },
           { time: "6-8 PM", activity: "Evening Wind-down", engagement: 92 },
           { time: "9-11 PM", activity: "Night Discovery", engagement: 88 }
         ],
         triggerTypes: [
           { type: "Visual Appeal", effectiveness: 94, description: "High-quality aesthetics" },
           { type: "Emotional Resonance", effectiveness: 89, description: "Personal connection" },
           { type: "Social Proof", effectiveness: 86, description: "Peer validation" },
           { type: "Scarcity", effectiveness: 83, description: "Limited availability" }
         ]
       },
       streamingChoices: {
         moodInfluence: [
           { mood: "Energetic", genres: ["Hip-Hop", "Electronic"], percentage: 78 },
           { mood: "Relaxed", genres: ["R&B", "Lo-Fi"], percentage: 85 },
           { mood: "Nostalgic", genres: ["Classic Hip-Hop", "90s R&B"], percentage: 92 },
           { mood: "Social", genres: ["Party Rap", "Dance"], percentage: 76 }
         ],
         contextTriggers: [
           { context: "Workout", preference: "High-energy beats", conversion: 89 },
           { context: "Study/Work", preference: "Instrumental focus", conversion: 76 },
           { context: "Commute", preference: "Familiar favorites", conversion: 94 },
           { context: "Social Gathering", preference: "Crowd pleasers", conversion: 82 }
         ]
       },
       purchaseDecisions: {
         decisionFactors: [
           { factor: "Peer Influence", weight: 34, trigger: "Friend recommendations" },
           { factor: "Artist Association", weight: 28, trigger: "Celebrity endorsement" },
           { factor: "Emotional Connection", weight: 23, trigger: "Personal meaning" },
           { factor: "Quality Perception", weight: 15, trigger: "Premium positioning" }
         ],
         purchaseJourney: [
           { stage: "Awareness", duration: "2-3 days", triggers: ["Social media", "Influencer content"] },
           { stage: "Consideration", duration: "1-2 weeks", triggers: ["Reviews", "Comparisons"] },
           { stage: "Decision", duration: "24-48 hours", triggers: ["FOMO", "Discounts"] },
           { stage: "Purchase", duration: "Immediate", triggers: ["Scarcity", "Social pressure"] }
         ]
       }
     },
     predictiveMetrics: {
       nextAction: {
         probability: 87,
         action: "Purchase Streetwear Item",
         confidence: "High",
         timeframe: "48 hours"
       },
       churnRisk: {
         probability: 12,
         risk: "Low",
         factors: ["High engagement", "Recent purchases"],
         retention: "94%"
       },
       upsellOpportunity: {
         probability: 76,
         product: "Premium Subscription",
         confidence: "Medium",
         value: "$29/month"
       }
     }
   };

   // Predictive Consumer Behavior Data
   const predictiveConsumerData = {
     forecastingAccuracy: {
       streamingPreferences: { accuracy: 91.3, confidence: 88.6, trend: "+14.2%" },
       purchaseLikelihood: { accuracy: 89.7, confidence: 92.4, trend: "+11.8%" },
       trendingProducts: { accuracy: 86.4, confidence: 85.9, trend: "+16.3%" },
       demographicSegments: { accuracy: 93.1, confidence: 90.2, trend: "+9.7%" }
     },
     streamingForecast: {
       next30Days: [
         { genre: "Afrobeats", currentShare: 23, predictedShare: 31, growth: "+34.8%", confidence: 89 },
         { genre: "Hip-Hop", currentShare: 45, predictedShare: 48, growth: "+6.7%", confidence: 94 },
         { genre: "R&B", currentShare: 18, predictedShare: 16, growth: "-11.1%", confidence: 82 },
         { genre: "Electronic", currentShare: 14, predictedShare: 18, growth: "+28.6%", confidence: 76 }
       ],
       peakTimes: [
         { time: "7-9 AM", predicted: 78, actual: 72, variance: "+8.3%" },
         { time: "12-2 PM", predicted: 92, actual: 85, variance: "+8.2%" },
         { time: "6-8 PM", predicted: 96, actual: 92, variance: "+4.3%" },
         { time: "9-11 PM", predicted: 89, actual: 88, variance: "+1.1%" }
       ]
     },
     purchasePredictions: {
       likelihoodByCategory: [
         { category: "Streetwear", likelihood: 87, avgValue: "$156", trend: "+23%", timeframe: "7 days" },
         { category: "Sneakers", likelihood: 76, avgValue: "$189", trend: "+18%", timeframe: "14 days" },
         { category: "Accessories", likelihood: 69, avgValue: "$67", trend: "+31%", timeframe: "10 days" },
         { category: "Electronics", likelihood: 54, avgValue: "$234", trend: "+12%", timeframe: "21 days" }
       ],
       seasonalTrends: [
         { season: "Spring 2024", category: "Athleisure", demand: 94, price: "$89-156" },
         { season: "Summer 2024", category: "Festival Wear", demand: 87, price: "$67-234" },
         { season: "Fall 2024", category: "Layering Pieces", demand: 91, price: "$78-189" },
         { season: "Holiday 2024", category: "Premium Items", demand: 96, price: "$156-456" }
       ]
     },
     trendingProductsForecast: [
       {
         product: "AI-Designed Sneakers",
         currentDemand: 67,
         predictedDemand: 89,
         growth: "+32.8%",
         peakDate: "March 15, 2024",
         demographics: ["Gen Z", "Tech Enthusiasts"],
         priceRange: "$180-$280"
       },
       {
         product: "Sustainable Streetwear",
         currentDemand: 71,
         predictedDemand: 94,
         growth: "+32.4%",
         peakDate: "April 22, 2024",
         demographics: ["Millennials", "Eco-Conscious"],
         priceRange: "$89-$167"
       },
       {
         product: "Vintage Audio Equipment",
         currentDemand: 45,
         predictedDemand: 78,
         growth: "+73.3%",
         peakDate: "May 8, 2024",
         demographics: ["Audiophiles", "Collectors"],
         priceRange: "$234-$567"
       },
       {
         product: "AR Fashion Accessories",
         currentDemand: 23,
         predictedDemand: 56,
         growth: "+143.5%",
         peakDate: "June 12, 2024",
         demographics: ["Early Adopters", "Tech Savvy"],
         priceRange: "$67-$189"
       }
     ],
     demographicSegmentation: {
       genZ: {
         preferredGenres: ["Hip-Hop", "Afrobeats", "Electronic"],
         purchaseProb: 84,
         avgSpend: "$127",
         trendingSoon: ["AI Sneakers", "Gaming Merch"],
         peakActivity: "9-11 PM"
       },
       millennials: {
         preferredGenres: ["Hip-Hop", "R&B", "Indie"],
         purchaseProb: 76,
         avgSpend: "$156",
         trendingSoon: ["Sustainable Fashion", "Wellness Tech"],
         peakActivity: "6-8 PM"
       },
       genX: {
         preferredGenres: ["Classic Hip-Hop", "R&B", "Jazz"],
         purchaseProb: 68,
         avgSpend: "$189",
         trendingSoon: ["Vintage Items", "Premium Audio"],
         peakActivity: "7-9 AM"
       }
     },
     culturalIndicators: {
       socialMediaTrends: [
         { platform: "TikTok", influence: 92, nextTrend: "Micro-Luxury", impact: "High" },
         { platform: "Instagram", influence: 87, nextTrend: "Sustainable Living", impact: "Medium" },
         { platform: "Twitter", influence: 76, nextTrend: "Tech Integration", impact: "High" },
         { platform: "YouTube", influence: 89, nextTrend: "Educational Content", impact: "Medium" }
       ],
       globalEvents: [
         { event: "Fashion Week", impact: 94, category: "Luxury Fashion", timeline: "2 weeks" },
         { event: "Music Festivals", impact: 87, category: "Festival Wear", timeline: "1 month" },
         { event: "Tech Conferences", impact: 82, category: "Tech Accessories", timeline: "3 weeks" },
         { event: "Sports Seasons", impact: 78, category: "Athletic Wear", timeline: "Ongoing" }
       ]
     },
     futureDemandVisualization: {
       next7Days: { predicted: 1247, confidence: 94, variance: "+12%" },
       next30Days: { predicted: 4891, confidence: 89, variance: "+18%" },
       next90Days: { predicted: 14567, confidence: 82, variance: "+24%" },
       nextYear: { predicted: 58934, confidence: 76, variance: "+31%" }
     }
   };

   const renderOverviewTab = () => (
    <View style={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <IconComponent size={24} color="#8B5CF6" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Purchases</Text>
        {recentPurchases.map((item) => (
          <TouchableOpacity key={item.id} style={styles.purchaseItem}>
            <Image source={{ uri: item.image }} style={styles.purchaseImage} />
            <View style={styles.purchaseInfo}>
              <Text style={styles.purchaseName}>{item.name}</Text>
              <Text style={styles.purchaseDate}>{item.date}</Text>
            </View>
            <Text style={styles.purchasePrice}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsList}>
          <TouchableOpacity style={styles.actionItem}>
            <Heart size={20} color="#F59E0B" />
            <Text style={styles.actionText}>Liked Songs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Download size={20} color="#10B981" />
            <Text style={styles.actionText}>Downloaded Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <ShoppingBag size={20} color="#8B5CF6" />
            <Text style={styles.actionText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Settings size={20} color="#999" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.content}>
      <View style={styles.section}>
        <View style={styles.analyticsHeader}>
          <Brain size={24} color="#1DB954" />
          <Text style={styles.sectionTitle}>Consumer Insights</Text>
        </View>
        <Text style={styles.analyticsSubtitle}>
          AI-powered analysis of your music and shopping behavior
        </Text>
      </View>

      {/* Overview Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <DollarSign size={20} color="#10B981" />
            <Text style={styles.metricValue}>{analyticsData.overview.totalSpent}</Text>
            <Text style={styles.metricLabel}>Total Spent</Text>
          </View>
          <View style={styles.metricCard}>
            <TrendingUp size={20} color="#F59E0B" />
            <Text style={styles.metricValue}>{analyticsData.overview.avgOrderValue}</Text>
            <Text style={styles.metricLabel}>Avg Order</Text>
          </View>
          <View style={styles.metricCard}>
            <Target size={20} color="#8B5CF6" />
            <Text style={styles.metricValue}>{analyticsData.overview.conversionRate}</Text>
            <Text style={styles.metricLabel}>Conversion</Text>
          </View>
          <View style={styles.metricCard}>
            <Eye size={20} color="#FF6B35" />
            <Text style={styles.metricValue}>{analyticsData.overview.engagementScore}</Text>
            <Text style={styles.metricLabel}>Engagement</Text>
          </View>
        </View>
      </View>

      {/* Purchase Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Purchase Categories</Text>
        <View style={styles.categoryChart}>
          {analyticsData.categories.map((category, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryBar}>
                <View 
                  style={[
                    styles.categoryProgress, 
                    { width: `${category.value}%`, backgroundColor: category.color }
                  ]} 
                />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryPercent}>{category.value}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Consumer Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Behavioral Insights</Text>
        {analyticsData.insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <IconComponent size={20} color="#1DB954" />
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <View style={styles.trendBadge}>
                  <Text style={styles.trendText}>{insight.trend}</Text>
                </View>
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Cultural Intelligence Dashboard */}
      <View style={styles.section}>
        <View style={styles.culturalHeader}>
          <Globe2 size={24} color="#FF6B35" />
          <Text style={styles.sectionTitle}>Integrated Cultural Intelligence</Text>
        </View>
        <Text style={styles.culturalSubtitle}>
          Real-time sentiment analysis and cultural trends from streaming, lyrics, and social interactions
        </Text>

        {/* Real-time Sentiment Scoring */}
        <View style={styles.sentimentSection}>
          <Text style={styles.subsectionTitle}>Real-time Sentiment Analysis</Text>
          <View style={styles.sentimentOverview}>
            <View style={styles.sentimentMainScore}>
              <Activity size={20} color="#1DB954" />
              <Text style={styles.sentimentScore}>{culturalIntelligenceData.realTimeSentiment.overall}/10</Text>
              <Text style={styles.sentimentLabel}>Overall Sentiment</Text>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>{culturalIntelligenceData.realTimeSentiment.trending}</Text>
              </View>
            </View>
            
            <View style={styles.sentimentBreakdown}>
              <View style={styles.sentimentItem}>
                <Smile size={16} color="#10B981" />
                <Text style={styles.sentimentPercent}>{culturalIntelligenceData.realTimeSentiment.positive}%</Text>
                <Text style={styles.sentimentType}>Positive</Text>
              </View>
              <View style={styles.sentimentItem}>
                <Meh size={16} color="#F59E0B" />
                <Text style={styles.sentimentPercent}>{culturalIntelligenceData.realTimeSentiment.neutral}%</Text>
                <Text style={styles.sentimentType}>Neutral</Text>
              </View>
              <View style={styles.sentimentItem}>
                <Frown size={16} color="#EF4444" />
                <Text style={styles.sentimentPercent}>{culturalIntelligenceData.realTimeSentiment.negative}%</Text>
                <Text style={styles.sentimentType}>Negative</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Keyword Trend Tracking */}
        <View style={styles.keywordSection}>
          <View style={styles.subsectionHeader}>
            <Hash size={20} color="#8B5CF6" />
            <Text style={styles.subsectionTitle}>Trending Keywords</Text>
          </View>
          {culturalIntelligenceData.keywordTrends.map((keyword, index) => (
            <View key={index} style={styles.keywordItem}>
              <View style={styles.keywordInfo}>
                <Text style={styles.keywordText}>{keyword.keyword}</Text>
                <Text style={styles.keywordVolume}>{keyword.volume.toLocaleString()} mentions</Text>
              </View>
              <View style={styles.keywordMetrics}>
                <View style={[styles.sentimentIndicator, { 
                  backgroundColor: keyword.sentiment === 'positive' ? '#10B981' : 
                                   keyword.sentiment === 'neutral' ? '#F59E0B' : '#EF4444' 
                }]} />
                <Text style={[styles.keywordTrend, { 
                  color: keyword.trend.startsWith('+') ? '#10B981' : '#EF4444' 
                }]}>{keyword.trend}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Demographic Sentiment Breakdown */}
        <View style={styles.demographicSection}>
          <View style={styles.subsectionHeader}>
            <Users size={20} color="#F59E0B" />
            <Text style={styles.subsectionTitle}>Sentiment by Demographics</Text>
          </View>
          {culturalIntelligenceData.demographicBreakdown.map((demo, index) => (
            <View key={index} style={styles.demographicItem}>
              <View style={styles.demographicInfo}>
                <Text style={styles.demographicSegment}>{demo.segment}</Text>
                <View style={styles.demographicMetrics}>
                  <Text style={styles.demographicSentiment}>Sentiment: {demo.sentiment}/10</Text>
                  <Text style={styles.demographicEngagement}>Engagement: {demo.engagement}%</Text>
                </View>
              </View>
              <View style={styles.demographicBar}>
                <View style={[styles.demographicProgress, { 
                  width: `${demo.engagement}%`, 
                  backgroundColor: demo.color 
                }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Cultural Trends */}
        <View style={styles.culturalTrendsSection}>
          <View style={styles.subsectionHeader}>
            <Zap size={20} color="#FF6B35" />
            <Text style={styles.subsectionTitle}>Cultural Movement Tracking</Text>
          </View>
          {culturalIntelligenceData.culturalTrends.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.trendCategory}>
              <Text style={styles.trendCategoryTitle}>{category.category}</Text>
              {category.trends.map((trend, trendIndex) => (
                <View key={trendIndex} style={styles.trendItem}>
                  <View style={styles.trendInfo}>
                    <Text style={styles.trendName}>{trend.name}</Text>
                    <Text style={styles.trendSentiment}>Sentiment: {trend.sentiment}/10</Text>
                  </View>
                  <View style={styles.trendGrowth}>
                    <Text style={styles.trendGrowthText}>{trend.growth}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Social Feed Metrics */}
        <View style={styles.socialMetricsSection}>
          <View style={styles.subsectionHeader}>
            <MessageCircle size={20} color="#1DB954" />
            <Text style={styles.subsectionTitle}>Social Feed Intelligence</Text>
          </View>
          <View style={styles.socialMetricsGrid}>
            <View style={styles.socialMetricCard}>
              <Text style={styles.socialMetricValue}>{culturalIntelligenceData.socialFeedMetrics.totalInteractions}</Text>
              <Text style={styles.socialMetricLabel}>Total Interactions</Text>
            </View>
            <View style={styles.socialMetricCard}>
              <Text style={styles.socialMetricValue}>{culturalIntelligenceData.socialFeedMetrics.shareToListen}</Text>
              <Text style={styles.socialMetricLabel}>Share-to-Listen</Text>
            </View>
            <View style={styles.socialMetricCard}>
              <Text style={styles.socialMetricValue}>{culturalIntelligenceData.socialFeedMetrics.viralCoefficient}</Text>
              <Text style={styles.socialMetricLabel}>Viral Coefficient</Text>
            </View>
            <View style={styles.socialMetricCard}>
              <Text style={styles.socialMetricValue}>{culturalIntelligenceData.socialFeedMetrics.culturalReach}</Text>
              <Text style={styles.socialMetricLabel}>Cultural Reach</Text>
            </View>
                     </View>
         </View>

         {/* Comprehensive Influence Mapping Dashboard */}
         <View style={styles.section}>
           <View style={styles.influenceHeader}>
             <Network size={24} color="#8B5CF6" />
             <Text style={styles.sectionTitle}>Comprehensive Influence Mapping</Text>
           </View>
           <Text style={styles.influenceSubtitle}>
             Interactive network analysis of influencers and tastemakers impact on streams, engagement, and sales
           </Text>

           {/* Network Overview Metrics */}
           <View style={styles.networkOverviewSection}>
             <Text style={styles.subsectionTitle}>Network Overview</Text>
             <View style={styles.networkMetricsGrid}>
               <View style={styles.networkMetricCard}>
                 <Users size={20} color="#8B5CF6" />
                 <Text style={styles.networkMetricValue}>{influenceMappingData.networkOverview.totalInfluencers.toLocaleString()}</Text>
                 <Text style={styles.networkMetricLabel}>Total Influencers</Text>
               </View>
               <View style={styles.networkMetricCard}>
                 <Link2 size={20} color="#1DB954" />
                 <Text style={styles.networkMetricValue}>{influenceMappingData.networkOverview.activeConnections.toLocaleString()}</Text>
                 <Text style={styles.networkMetricLabel}>Active Connections</Text>
               </View>
               <View style={styles.networkMetricCard}>
                 <Star size={20} color="#F59E0B" />
                 <Text style={styles.networkMetricValue}>{influenceMappingData.networkOverview.avgInfluenceScore}/10</Text>
                 <Text style={styles.networkMetricLabel}>Avg Influence Score</Text>
               </View>
               <View style={styles.networkMetricCard}>
                 <Radio size={20} color="#FF6B35" />
                 <Text style={styles.networkMetricValue}>{influenceMappingData.networkOverview.networkReach}</Text>
                 <Text style={styles.networkMetricLabel}>Network Reach</Text>
               </View>
             </View>
           </View>

           {/* Dynamic Filtering Controls */}
           <View style={styles.filteringSection}>
             <View style={styles.subsectionHeader}>
               <Filter size={20} color="#10B981" />
               <Text style={styles.subsectionTitle}>Dynamic Filtering</Text>
             </View>
             
             <View style={styles.filterRow}>
               <Text style={styles.filterLabel}>Community:</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                 {["All", ...influenceMappingData.filterOptions.communities].map((community) => (
                   <TouchableOpacity
                     key={community}
                     style={[
                       styles.filterButton,
                       selectedFilters.community === community && styles.activeFilterButton
                     ]}
                     onPress={() => setSelectedFilters({...selectedFilters, community})}
                   >
                     <Text style={[
                       styles.filterButtonText,
                       selectedFilters.community === community && styles.activeFilterButtonText
                     ]}>{community}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>

             <View style={styles.filterRow}>
               <Text style={styles.filterLabel}>Genre:</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                 {["All", ...influenceMappingData.filterOptions.genres].map((genre) => (
                   <TouchableOpacity
                     key={genre}
                     style={[
                       styles.filterButton,
                       selectedFilters.genre === genre && styles.activeFilterButton
                     ]}
                     onPress={() => setSelectedFilters({...selectedFilters, genre})}
                   >
                     <Text style={[
                       styles.filterButtonText,
                       selectedFilters.genre === genre && styles.activeFilterButtonText
                     ]}>{genre}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>

             <View style={styles.filterRow}>
               <Text style={styles.filterLabel}>Location:</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                 {["All", ...influenceMappingData.filterOptions.locations].map((location) => (
                   <TouchableOpacity
                     key={location}
                     style={[
                       styles.filterButton,
                       selectedFilters.location === location && styles.activeFilterButton
                     ]}
                     onPress={() => setSelectedFilters({...selectedFilters, location})}
                   >
                     <Text style={[
                       styles.filterButtonText,
                       selectedFilters.location === location && styles.activeFilterButtonText
                     ]}>{location}</Text>
                   </TouchableOpacity>
                 ))}
               </ScrollView>
             </View>
           </View>

           {/* Impact Metrics Dashboard */}
           <View style={styles.impactMetricsSection}>
             <Text style={styles.subsectionTitle}>Impact Analysis</Text>
             <View style={styles.impactMetricsGrid}>
               <View style={styles.impactMetricCard}>
                 <View style={styles.impactMetricHeader}>
                   <Music size={18} color="#1DB954" />
                   <Text style={styles.impactMetricTitle}>Stream Impact</Text>
                 </View>
                 <Text style={styles.impactMetricAvg}>{influenceMappingData.impactMetrics.streamBoost.avg}</Text>
                 <Text style={styles.impactMetricLabel}>Average Boost</Text>
                 <Text style={styles.impactMetricTop}>Top: {influenceMappingData.impactMetrics.streamBoost.top}</Text>
                 <View style={styles.trendBadge}>
                   <TrendingUp size={12} color="#10B981" />
                   <Text style={styles.trendText}>{influenceMappingData.impactMetrics.streamBoost.trend}</Text>
                 </View>
               </View>

               <View style={styles.impactMetricCard}>
                 <View style={styles.impactMetricHeader}>
                   <ShoppingBag size={18} color="#F59E0B" />
                   <Text style={styles.impactMetricTitle}>Sales Impact</Text>
                 </View>
                 <Text style={styles.impactMetricAvg}>{influenceMappingData.impactMetrics.salesBoost.avg}</Text>
                 <Text style={styles.impactMetricLabel}>Average Boost</Text>
                 <Text style={styles.impactMetricTop}>Top: {influenceMappingData.impactMetrics.salesBoost.top}</Text>
                 <View style={styles.trendBadge}>
                   <TrendingUp size={12} color="#10B981" />
                   <Text style={styles.trendText}>{influenceMappingData.impactMetrics.salesBoost.trend}</Text>
                 </View>
               </View>

               <View style={styles.impactMetricCard}>
                 <View style={styles.impactMetricHeader}>
                   <Heart size={18} color="#EF4444" />
                   <Text style={styles.impactMetricTitle}>Engagement Impact</Text>
                 </View>
                 <Text style={styles.impactMetricAvg}>{influenceMappingData.impactMetrics.engagementBoost.avg}</Text>
                 <Text style={styles.impactMetricLabel}>Average Boost</Text>
                 <Text style={styles.impactMetricTop}>Top: {influenceMappingData.impactMetrics.engagementBoost.top}</Text>
                 <View style={styles.trendBadge}>
                   <TrendingUp size={12} color="#10B981" />
                   <Text style={styles.trendText}>{influenceMappingData.impactMetrics.engagementBoost.trend}</Text>
                 </View>
               </View>
             </View>
           </View>

           {/* Top Influencers Network */}
           <View style={styles.influencersNetworkSection}>
             <Text style={styles.subsectionTitle}>Top Influencers & Tastemakers</Text>
             {influenceMappingData.topInfluencers.map((influencer) => (
               <View key={influencer.id} style={styles.influencerCard}>
                 <View style={styles.influencerHeader}>
                   <Image source={{ uri: influencer.avatar }} style={styles.influencerAvatar} />
                   <View style={styles.influencerInfo}>
                     <View style={styles.influencerNameRow}>
                       <Text style={styles.influencerName}>{influencer.name}</Text>
                       <View style={[styles.trendingIndicator, { 
                         backgroundColor: influencer.trending === 'up' ? '#10B981' : 
                                          influencer.trending === 'down' ? '#EF4444' : '#F59E0B' 
                       }]}>
                         {influencer.trending === 'up' ? <TrendingUp size={12} color="#fff" /> :
                          influencer.trending === 'down' ? <TrendingDown size={12} color="#fff" /> :
                          <Activity size={12} color="#fff" />}
                       </View>
                     </View>
                     <Text style={styles.influencerType}>{influencer.type}</Text>
                     <View style={styles.influencerLocation}>
                       <MapPin size={12} color="#999" />
                       <Text style={styles.influencerLocationText}>{influencer.location}</Text>
                     </View>
                   </View>
                 </View>

                 <View style={styles.influencerMetrics}>
                   <View style={styles.influencerMetricItem}>
                     <Text style={styles.influencerMetricValue}>{influencer.followers}</Text>
                     <Text style={styles.influencerMetricLabel}>Followers</Text>
                   </View>
                   <View style={styles.influencerMetricItem}>
                     <Text style={styles.influencerMetricValue}>{influencer.influenceScore}/10</Text>
                     <Text style={styles.influencerMetricLabel}>Influence Score</Text>
                   </View>
                   <View style={styles.influencerMetricItem}>
                     <Text style={styles.influencerMetricValue}>{influencer.connectedArtists}</Text>
                     <Text style={styles.influencerMetricLabel}>Connected Artists</Text>
                   </View>
                 </View>

                 <View style={styles.influencerImpacts}>
                   <View style={styles.influencerImpactItem}>
                     <Music size={14} color="#1DB954" />
                     <Text style={styles.influencerImpactLabel}>Streams:</Text>
                     <Text style={styles.influencerImpactValue}>{influencer.streamImpact}</Text>
                   </View>
                   <View style={styles.influencerImpactItem}>
                     <ShoppingBag size={14} color="#F59E0B" />
                     <Text style={styles.influencerImpactLabel}>Sales:</Text>
                     <Text style={styles.influencerImpactValue}>{influencer.salesImpact}</Text>
                   </View>
                   <View style={styles.influencerImpactItem}>
                     <Heart size={14} color="#EF4444" />
                     <Text style={styles.influencerImpactLabel}>Engagement:</Text>
                     <Text style={styles.influencerImpactValue}>{influencer.engagementRate}</Text>
                   </View>
                 </View>
               </View>
             ))}
           </View>

           {/* Network Connections Visualization */}
           <View style={styles.networkConnectionsSection}>
             <Text style={styles.subsectionTitle}>Network Connection Strength</Text>
             <Text style={styles.networkConnectionsSubtitle}>
               Visualization of influence pathways and connection strengths
             </Text>
             {influenceMappingData.networkConnections.map((connection, index) => (
               <View key={index} style={styles.connectionItem}>
                 <View style={styles.connectionInfo}>
                   <Text style={styles.connectionFrom}>{connection.from}</Text>
                   <Link2 size={16} color="#8B5CF6" />
                   <Text style={styles.connectionTo}>{connection.to}</Text>
                 </View>
                 <View style={styles.connectionStrength}>
                   <View style={styles.connectionBar}>
                     <View 
                       style={[
                         styles.connectionProgress, 
                         { 
                           width: `${connection.strength}%`,
                           backgroundColor: connection.type === 'genre' ? '#1DB954' :
                                            connection.type === 'demographic' ? '#F59E0B' :
                                            connection.type === 'discovery' ? '#8B5CF6' : '#FF6B35'
                         }
                       ]} 
                     />
                   </View>
                   <Text style={styles.connectionStrengthText}>{connection.strength}%</Text>
                 </View>
               </View>
             ))}
           </View>

           {/* Behavioral Motivation Insights Dashboard */}
           <View style={styles.section}>
             <View style={styles.behavioralHeader}>
               <Brain size={24} color="#8B5CF6" />
               <Text style={styles.sectionTitle}>Behavioral Motivation Insights</Text>
             </View>
             <Text style={styles.behavioralSubtitle}>
               Predictive models identifying emotional and psychological triggers driving user actions
             </Text>

             {/* Predictive Models Overview */}
             <View style={styles.predictiveModelsSection}>
               <Text style={styles.subsectionTitle}>AI Predictive Models</Text>
               <View style={styles.modelsGrid}>
                 <View style={styles.modelCard}>
                   <View style={styles.modelHeader}>
                     <Lightning size={18} color="#1DB954" />
                     <Text style={styles.modelTitle}>Engagement Prediction</Text>
                   </View>
                   <Text style={styles.modelAccuracy}>{behavioralInsightsData.predictiveModels.engagementPrediction.accuracy}%</Text>
                   <Text style={styles.modelLabel}>Accuracy</Text>
                   <Text style={styles.modelConfidence}>Confidence: {behavioralInsightsData.predictiveModels.engagementPrediction.confidence}%</Text>
                   <View style={styles.trendBadge}>
                     <TrendingUp size={12} color="#10B981" />
                     <Text style={styles.trendText}>{behavioralInsightsData.predictiveModels.engagementPrediction.trend}</Text>
                   </View>
                 </View>

                 <View style={styles.modelCard}>
                   <View style={styles.modelHeader}>
                     <ShoppingCart size={18} color="#F59E0B" />
                     <Text style={styles.modelTitle}>Purchase Prediction</Text>
                   </View>
                   <Text style={styles.modelAccuracy}>{behavioralInsightsData.predictiveModels.purchasePrediction.accuracy}%</Text>
                   <Text style={styles.modelLabel}>Accuracy</Text>
                   <Text style={styles.modelConfidence}>Confidence: {behavioralInsightsData.predictiveModels.purchasePrediction.confidence}%</Text>
                   <View style={styles.trendBadge}>
                     <TrendingUp size={12} color="#10B981" />
                     <Text style={styles.trendText}>{behavioralInsightsData.predictiveModels.purchasePrediction.trend}</Text>
                   </View>
                 </View>

                 <View style={styles.modelCard}>
                   <View style={styles.modelHeader}>
                     <Headphones size={18} color="#EF4444" />
                     <Text style={styles.modelTitle}>Streaming Prediction</Text>
                   </View>
                   <Text style={styles.modelAccuracy}>{behavioralInsightsData.predictiveModels.streamingPrediction.accuracy}%</Text>
                   <Text style={styles.modelLabel}>Accuracy</Text>
                   <Text style={styles.modelConfidence}>Confidence: {behavioralInsightsData.predictiveModels.streamingPrediction.confidence}%</Text>
                   <View style={styles.trendBadge}>
                     <TrendingUp size={12} color="#10B981" />
                     <Text style={styles.trendText}>{behavioralInsightsData.predictiveModels.streamingPrediction.trend}</Text>
                   </View>
                 </View>
               </View>
             </View>

             {/* Emotional Triggers Analysis */}
             <View style={styles.emotionalTriggersSection}>
               <Text style={styles.subsectionTitle}>Emotional Triggers Analysis</Text>
               {behavioralInsightsData.emotionalTriggers.map((trigger, index) => (
                 <View key={index} style={styles.triggerCard}>
                   <View style={styles.triggerHeader}>
                     <View style={[styles.triggerIndicator, { backgroundColor: trigger.color }]} />
                     <Text style={styles.triggerEmotion}>{trigger.emotion}</Text>
                     <Text style={styles.triggerImpact}>Impact: {trigger.impact}%</Text>
                   </View>
                   
                   <View style={styles.triggerDetails}>
                     <View style={styles.triggerMetrics}>
                       <View style={styles.triggerMetric}>
                         <Text style={styles.triggerMetricLabel}>Engagement:</Text>
                         <Text style={styles.triggerMetricValue}>{trigger.engagement}</Text>
                       </View>
                       <View style={styles.triggerMetric}>
                         <Text style={styles.triggerMetricLabel}>Conversions:</Text>
                         <Text style={styles.triggerMetricValue}>{trigger.conversions}</Text>
                       </View>
                     </View>
                     
                     <View style={styles.triggerList}>
                       <Text style={styles.triggerListTitle}>Key Triggers:</Text>
                       <View style={styles.triggerTags}>
                         {trigger.triggers.map((item, idx) => (
                           <View key={idx} style={[styles.triggerTag, { borderColor: trigger.color }]}>
                             <Text style={[styles.triggerTagText, { color: trigger.color }]}>{item}</Text>
                           </View>
                         ))}
                       </View>
                     </View>
                   </View>
                 </View>
               ))}
             </View>

             {/* Predictive Metrics */}
             <View style={styles.predictiveMetricsSection}>
               <Text style={styles.subsectionTitle}>Predictive Action Insights</Text>
               
               <View style={styles.predictiveCardsGrid}>
                 <View style={styles.predictiveCard}>
                   <View style={styles.predictiveHeader}>
                     <Target size={18} color="#10B981" />
                     <Text style={styles.predictiveTitle}>Next Likely Action</Text>
                   </View>
                   <Text style={styles.predictiveAction}>{behavioralInsightsData.predictiveMetrics.nextAction.action}</Text>
                   <View style={styles.predictiveDetails}>
                     <Text style={styles.predictiveProb}>Probability: {behavioralInsightsData.predictiveMetrics.nextAction.probability}%</Text>
                     <Text style={styles.predictiveTime}>Timeframe: {behavioralInsightsData.predictiveMetrics.nextAction.timeframe}</Text>
                   </View>
                 </View>

                 <View style={styles.predictiveCard}>
                   <View style={styles.predictiveHeader}>
                     <Users size={18} color="#EF4444" />
                     <Text style={styles.predictiveTitle}>Churn Risk Analysis</Text>
                   </View>
                   <Text style={styles.predictiveAction}>Risk Level: {behavioralInsightsData.predictiveMetrics.churnRisk.risk}</Text>
                   <View style={styles.predictiveDetails}>
                     <Text style={styles.predictiveProb}>Probability: {behavioralInsightsData.predictiveMetrics.churnRisk.probability}%</Text>
                     <Text style={styles.predictiveTime}>Retention: {behavioralInsightsData.predictiveMetrics.churnRisk.retention}</Text>
                   </View>
                 </View>

                 <View style={styles.predictiveCard}>
                   <View style={styles.predictiveHeader}>
                     <TrendingUp size={18} color="#F59E0B" />
                     <Text style={styles.predictiveTitle}>Upsell Opportunity</Text>
                   </View>
                   <Text style={styles.predictiveAction}>{behavioralInsightsData.predictiveMetrics.upsellOpportunity.product}</Text>
                   <View style={styles.predictiveDetails}>
                     <Text style={styles.predictiveProb}>Probability: {behavioralInsightsData.predictiveMetrics.upsellOpportunity.probability}%</Text>
                     <Text style={styles.predictiveTime}>Value: {behavioralInsightsData.predictiveMetrics.upsellOpportunity.value}</Text>
                   </View>
                 </View>
               </View>
             </View>

             {/* Predictive Consumer Behavior Dashboard */}
             <View style={styles.section}>
               <View style={styles.predictiveConsumerHeader}>
                 <Layers size={24} color="#10B981" />
                 <Text style={styles.sectionTitle}>Predictive Consumer Behavior</Text>
               </View>
               <Text style={styles.predictiveConsumerSubtitle}>
                 Forecasted consumer behavior including streaming preferences, purchasing likelihood, and trending products
               </Text>

               {/* Forecasting Accuracy Metrics */}
               <View style={styles.forecastingAccuracySection}>
                 <Text style={styles.subsectionTitle}>Predictive Model Accuracy</Text>
                 <View style={styles.accuracyMetricsGrid}>
                   <View style={styles.accuracyCard}>
                     <View style={styles.accuracyHeader}>
                       <Headphones size={18} color="#1DB954" />
                       <Text style={styles.accuracyTitle}>Streaming Preferences</Text>
                     </View>
                     <Text style={styles.accuracyValue}>{predictiveConsumerData.forecastingAccuracy.streamingPreferences.accuracy}%</Text>
                     <Text style={styles.accuracyLabel}>Accuracy</Text>
                     <Text style={styles.accuracyConfidence}>Confidence: {predictiveConsumerData.forecastingAccuracy.streamingPreferences.confidence}%</Text>
                     <View style={styles.trendBadge}>
                       <TrendingUp size={12} color="#10B981" />
                       <Text style={styles.trendText}>{predictiveConsumerData.forecastingAccuracy.streamingPreferences.trend}</Text>
                     </View>
                   </View>

                   <View style={styles.accuracyCard}>
                     <View style={styles.accuracyHeader}>
                       <ShoppingBag size={18} color="#F59E0B" />
                       <Text style={styles.accuracyTitle}>Purchase Likelihood</Text>
                     </View>
                     <Text style={styles.accuracyValue}>{predictiveConsumerData.forecastingAccuracy.purchaseLikelihood.accuracy}%</Text>
                     <Text style={styles.accuracyLabel}>Accuracy</Text>
                     <Text style={styles.accuracyConfidence}>Confidence: {predictiveConsumerData.forecastingAccuracy.purchaseLikelihood.confidence}%</Text>
                     <View style={styles.trendBadge}>
                       <TrendingUp size={12} color="#10B981" />
                       <Text style={styles.trendText}>{predictiveConsumerData.forecastingAccuracy.purchaseLikelihood.trend}</Text>
                     </View>
                   </View>

                   <View style={styles.accuracyCard}>
                     <View style={styles.accuracyHeader}>
                       <Star size={18} color="#EF4444" />
                       <Text style={styles.accuracyTitle}>Trending Products</Text>
                     </View>
                     <Text style={styles.accuracyValue}>{predictiveConsumerData.forecastingAccuracy.trendingProducts.accuracy}%</Text>
                     <Text style={styles.accuracyLabel}>Accuracy</Text>
                     <Text style={styles.accuracyConfidence}>Confidence: {predictiveConsumerData.forecastingAccuracy.trendingProducts.confidence}%</Text>
                     <View style={styles.trendBadge}>
                       <TrendingUp size={12} color="#10B981" />
                       <Text style={styles.trendText}>{predictiveConsumerData.forecastingAccuracy.trendingProducts.trend}</Text>
                     </View>
                   </View>

                   <View style={styles.accuracyCard}>
                     <View style={styles.accuracyHeader}>
                       <Users size={18} color="#8B5CF6" />
                       <Text style={styles.accuracyTitle}>Demographic Segments</Text>
                     </View>
                     <Text style={styles.accuracyValue}>{predictiveConsumerData.forecastingAccuracy.demographicSegments.accuracy}%</Text>
                     <Text style={styles.accuracyLabel}>Accuracy</Text>
                     <Text style={styles.accuracyConfidence}>Confidence: {predictiveConsumerData.forecastingAccuracy.demographicSegments.confidence}%</Text>
                     <View style={styles.trendBadge}>
                       <TrendingUp size={12} color="#10B981" />
                       <Text style={styles.trendText}>{predictiveConsumerData.forecastingAccuracy.demographicSegments.trend}</Text>
                     </View>
                   </View>
                 </View>
               </View>

               {/* Streaming Preferences Forecast */}
               <View style={styles.streamingForecastSection}>
                 <Text style={styles.subsectionTitle}>Streaming Preferences Forecast (Next 30 Days)</Text>
                 {predictiveConsumerData.streamingForecast.next30Days.map((genre, index) => (
                   <View key={index} style={styles.genreForecastItem}>
                     <View style={styles.genreForecastInfo}>
                       <Text style={styles.genreName}>{genre.genre}</Text>
                       <View style={styles.genreShareComparison}>
                         <Text style={styles.currentShare}>Current: {genre.currentShare}%</Text>
                         <Text style={styles.predictedShare}>Predicted: {genre.predictedShare}%</Text>
                       </View>
                     </View>
                     <View style={styles.genreForecastMetrics}>
                       <Text style={[styles.genreGrowth, { 
                         color: genre.growth.startsWith('+') ? '#10B981' : '#EF4444' 
                       }]}>{genre.growth}</Text>
                       <Text style={styles.genreConfidence}>{genre.confidence}% confidence</Text>
                     </View>
                   </View>
                 ))}
               </View>

               {/* Purchase Predictions */}
               <View style={styles.purchasePredictionsSection}>
                 <Text style={styles.subsectionTitle}>Purchase Likelihood by Category</Text>
                 {predictiveConsumerData.purchasePredictions.likelihoodByCategory.map((category, index) => (
                   <View key={index} style={styles.purchaseCategoryItem}>
                     <View style={styles.purchaseCategoryInfo}>
                       <Text style={styles.categoryName}>{category.category}</Text>
                       <Text style={styles.categoryTimeframe}>Expected: {category.timeframe}</Text>
                     </View>
                     <View style={styles.purchaseCategoryMetrics}>
                       <View style={styles.likelihoodBar}>
                         <View style={[styles.likelihoodProgress, { width: `${category.likelihood}%` }]} />
                         <Text style={styles.likelihoodText}>{category.likelihood}%</Text>
                       </View>
                       <Text style={styles.avgValue}>{category.avgValue}</Text>
                       <Text style={styles.categoryTrend}>{category.trend}</Text>
                     </View>
                   </View>
                 ))}
               </View>

               {/* Trending Products Forecast */}
               <View style={styles.trendingForecastSection}>
                 <Text style={styles.subsectionTitle}>Trending Products Forecast</Text>
                 {predictiveConsumerData.trendingProductsForecast.map((product, index) => (
                   <View key={index} style={styles.trendingProductCard}>
                     <View style={styles.trendingProductHeader}>
                       <Text style={styles.trendingProductName}>{product.product}</Text>
                       <View style={styles.trendingProductGrowth}>
                         <Text style={styles.trendingGrowthText}>{product.growth}</Text>
                       </View>
                     </View>
                     
                     <View style={styles.trendingProductDetails}>
                       <View style={styles.demandComparison}>
                                                   <View style={styles.demandItem}>
                            <Text style={styles.demandValueLabel}>Current Demand</Text>
                            <Text style={styles.demandValue}>{product.currentDemand}%</Text>
                          </View>
                          <View style={styles.demandItem}>
                            <Text style={styles.demandValueLabel}>Predicted Demand</Text>
                            <Text style={styles.demandValue}>{product.predictedDemand}%</Text>
                          </View>
                       </View>
                       
                       <View style={styles.trendingProductMeta}>
                         <Text style={styles.peakDate}>Peak: {product.peakDate}</Text>
                         <Text style={styles.priceRange}>{product.priceRange}</Text>
                       </View>
                       
                       <View style={styles.demographicTags}>
                         {product.demographics.map((demo, idx) => (
                           <View key={idx} style={styles.demographicTag}>
                             <Text style={styles.demographicTagText}>{demo}</Text>
                           </View>
                         ))}
                       </View>
                     </View>
                   </View>
                 ))}
               </View>

               {/* Demographic Segmentation */}
               <View style={styles.demographicSegmentationSection}>
                 <Text style={styles.subsectionTitle}>Consumer Behavior by Demographics</Text>
                 
                 <View style={styles.demographicSegmentCard}>
                   <Text style={styles.segmentTitle}>Gen Z (18-24)</Text>
                   <View style={styles.segmentDetails}>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Purchase Probability:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genZ.purchaseProb}%</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Avg Spend:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genZ.avgSpend}</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Peak Activity:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genZ.peakActivity}</Text>
                     </View>
                   </View>
                   <View style={styles.segmentTrends}>
                     <Text style={styles.segmentTrendsTitle}>Trending Soon:</Text>
                     <View style={styles.segmentTrendTags}>
                       {predictiveConsumerData.demographicSegmentation.genZ.trendingSoon.map((trend, idx) => (
                         <View key={idx} style={styles.segmentTrendTag}>
                           <Text style={styles.segmentTrendText}>{trend}</Text>
                         </View>
                       ))}
                     </View>
                   </View>
                 </View>

                 <View style={styles.demographicSegmentCard}>
                   <Text style={styles.segmentTitle}>Millennials (25-34)</Text>
                   <View style={styles.segmentDetails}>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Purchase Probability:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.millennials.purchaseProb}%</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Avg Spend:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.millennials.avgSpend}</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Peak Activity:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.millennials.peakActivity}</Text>
                     </View>
                   </View>
                   <View style={styles.segmentTrends}>
                     <Text style={styles.segmentTrendsTitle}>Trending Soon:</Text>
                     <View style={styles.segmentTrendTags}>
                       {predictiveConsumerData.demographicSegmentation.millennials.trendingSoon.map((trend, idx) => (
                         <View key={idx} style={styles.segmentTrendTag}>
                           <Text style={styles.segmentTrendText}>{trend}</Text>
                         </View>
                       ))}
                     </View>
                   </View>
                 </View>

                 <View style={styles.demographicSegmentCard}>
                   <Text style={styles.segmentTitle}>Gen X (35-44)</Text>
                   <View style={styles.segmentDetails}>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Purchase Probability:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genX.purchaseProb}%</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Avg Spend:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genX.avgSpend}</Text>
                     </View>
                     <View style={styles.segmentMetric}>
                       <Text style={styles.segmentLabel}>Peak Activity:</Text>
                       <Text style={styles.segmentValue}>{predictiveConsumerData.demographicSegmentation.genX.peakActivity}</Text>
                     </View>
                   </View>
                   <View style={styles.segmentTrends}>
                     <Text style={styles.segmentTrendsTitle}>Trending Soon:</Text>
                     <View style={styles.segmentTrendTags}>
                       {predictiveConsumerData.demographicSegmentation.genX.trendingSoon.map((trend, idx) => (
                         <View key={idx} style={styles.segmentTrendTag}>
                           <Text style={styles.segmentTrendText}>{trend}</Text>
                         </View>
                       ))}
                     </View>
                   </View>
                 </View>
               </View>

               {/* Future Demand Visualization */}
               <View style={styles.futureDemandSection}>
                 <Text style={styles.subsectionTitle}>Future Demand Visualization</Text>
                 <View style={styles.demandTimelineGrid}>
                   <View style={styles.demandTimelineCard}>
                     <View style={styles.demandTimelineHeader}>
                       <Calendar size={16} color="#1DB954" />
                       <Text style={styles.demandTimelineTitle}>Next 7 Days</Text>
                     </View>
                                           <Text style={styles.demandPredicted}>{predictiveConsumerData.futureDemandVisualization.next7Days.predicted.toLocaleString()}</Text>
                      <Text style={styles.demandTimelineLabel}>Predicted Orders</Text>
                      <Text style={styles.demandConfidence}>Confidence: {predictiveConsumerData.futureDemandVisualization.next7Days.confidence}%</Text>
                      <Text style={styles.demandVariance}>{predictiveConsumerData.futureDemandVisualization.next7Days.variance}</Text>
                    </View>

                    <View style={styles.demandTimelineCard}>
                      <View style={styles.demandTimelineHeader}>
                        <Calendar size={16} color="#F59E0B" />
                        <Text style={styles.demandTimelineTitle}>Next 30 Days</Text>
                      </View>
                      <Text style={styles.demandPredicted}>{predictiveConsumerData.futureDemandVisualization.next30Days.predicted.toLocaleString()}</Text>
                      <Text style={styles.demandTimelineLabel}>Predicted Orders</Text>
                      <Text style={styles.demandConfidence}>Confidence: {predictiveConsumerData.futureDemandVisualization.next30Days.confidence}%</Text>
                      <Text style={styles.demandVariance}>{predictiveConsumerData.futureDemandVisualization.next30Days.variance}</Text>
                    </View>

                    <View style={styles.demandTimelineCard}>
                      <View style={styles.demandTimelineHeader}>
                        <Calendar size={16} color="#8B5CF6" />
                        <Text style={styles.demandTimelineTitle}>Next 90 Days</Text>
                      </View>
                      <Text style={styles.demandPredicted}>{predictiveConsumerData.futureDemandVisualization.next90Days.predicted.toLocaleString()}</Text>
                      <Text style={styles.demandTimelineLabel}>Predicted Orders</Text>
                      <Text style={styles.demandConfidence}>Confidence: {predictiveConsumerData.futureDemandVisualization.next90Days.confidence}%</Text>
                      <Text style={styles.demandVariance}>{predictiveConsumerData.futureDemandVisualization.next90Days.variance}</Text>
                    </View>

                    <View style={styles.demandTimelineCard}>
                      <View style={styles.demandTimelineHeader}>
                        <Calendar size={16} color="#EF4444" />
                        <Text style={styles.demandTimelineTitle}>Next Year</Text>
                      </View>
                      <Text style={styles.demandPredicted}>{predictiveConsumerData.futureDemandVisualization.nextYear.predicted.toLocaleString()}</Text>
                      <Text style={styles.demandTimelineLabel}>Predicted Orders</Text>
                     <Text style={styles.demandConfidence}>Confidence: {predictiveConsumerData.futureDemandVisualization.nextYear.confidence}%</Text>
                     <Text style={styles.demandVariance}>{predictiveConsumerData.futureDemandVisualization.nextYear.variance}</Text>
                   </View>
                 </View>
               </View>
             </View>
           </View>
         </View>
       </View>
     </View>
   );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8B5CF6', '#1a1a1a']}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg" }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <View style={styles.premiumBadge}>
                <Crown size={16} color="#F59E0B" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
              <Text style={styles.username}>Alex Johnson</Text>
              <Text style={styles.memberSince}>Member since Jan 2023</Text>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <User size={20} color={activeTab === 'overview' ? '#1DB954' : '#999'} />
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
            onPress={() => setActiveTab('analytics')}
          >
            <BarChart3 size={20} color={activeTab === 'analytics' ? '#1DB954' : '#999'} />
            <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
              Analytics
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' ? renderOverviewTab() : renderAnalyticsTab()}
      </ScrollView>

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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  premiumText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  purchaseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  purchaseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  purchaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  purchaseDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  purchasePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  actionsList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  // Tab Navigation Styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    marginTop: 20,
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
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#121212',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#1DB954',
  },
  // Analytics Styles
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  analyticsSubtitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  categoryChart: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryProgress: {
    height: '100%',
    borderRadius: 4,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  categoryPercent: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  insightCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  insightTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  trendBadge: {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    color: '#1DB954',
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  placeholderCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Cultural Intelligence Dashboard Styles
  culturalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  culturalSubtitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  subsectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  // Sentiment Analysis Styles
  sentimentSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sentimentOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sentimentMainScore: {
    alignItems: 'center',
    flex: 1,
  },
  sentimentScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1DB954',
    marginTop: 8,
  },
  sentimentLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    marginBottom: 8,
  },
  sentimentBreakdown: {
    flex: 1,
    paddingLeft: 16,
  },
  sentimentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sentimentPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    minWidth: 40,
  },
  sentimentType: {
    fontSize: 14,
    color: '#999',
  },
  // Keywords Styles
  keywordSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  keywordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  keywordInfo: {
    flex: 1,
  },
  keywordText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  keywordVolume: {
    fontSize: 12,
    color: '#999',
  },
  keywordMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sentimentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  keywordTrend: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Demographics Styles
  demographicSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  demographicItem: {
    marginBottom: 16,
  },
  demographicInfo: {
    marginBottom: 8,
  },
  demographicSegment: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  demographicMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  demographicSentiment: {
    fontSize: 12,
    color: '#1DB954',
  },
  demographicEngagement: {
    fontSize: 12,
    color: '#F59E0B',
  },
  demographicBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  demographicProgress: {
    height: '100%',
    borderRadius: 3,
  },
  // Cultural Trends Styles
  culturalTrendsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  trendCategory: {
    marginBottom: 20,
  },
  trendCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 12,
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trendInfo: {
    flex: 1,
  },
  trendName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  trendSentiment: {
    fontSize: 12,
    color: '#999',
  },
  trendGrowth: {
    alignItems: 'flex-end',
  },
  trendGrowthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  // Social Metrics Styles
  socialMetricsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  socialMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialMetricCard: {
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  socialMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  socialMetricLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  // Comprehensive Influence Mapping Styles
  influenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  influenceSubtitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 24,
  },
  // Network Overview Styles
  networkOverviewSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  networkMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  networkMetricCard: {
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  networkMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  networkMetricLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  // Dynamic Filtering Styles
  filteringSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  filterRow: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  filterScroll: {
    maxHeight: 40,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#1DB954',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  // Impact Metrics Styles
  impactMetricsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  impactMetricsGrid: {
    gap: 12,
  },
  impactMetricCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  impactMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  impactMetricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  impactMetricAvg: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  impactMetricLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  impactMetricTop: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  // Influencers Network Styles
  influencersNetworkSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  influencerCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  influencerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  influencerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  influencerInfo: {
    flex: 1,
  },
  influencerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  influencerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  trendingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  influencerType: {
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 4,
  },
  influencerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  influencerLocationText: {
    fontSize: 12,
    color: '#999',
  },
  influencerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  influencerMetricItem: {
    alignItems: 'center',
  },
  influencerMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  influencerMetricLabel: {
    fontSize: 10,
    color: '#999',
  },
  influencerImpacts: {
    gap: 8,
  },
  influencerImpactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  influencerImpactLabel: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
  influencerImpactValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  // Network Connections Styles
  networkConnectionsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  networkConnectionsSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  connectionItem: {
    marginBottom: 16,
  },
  connectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  connectionFrom: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  connectionTo: {
    fontSize: 14,
    color: '#8B5CF6',
  },
  connectionStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectionBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  connectionProgress: {
    height: '100%',
    borderRadius: 3,
  },
  connectionStrengthText: {
    fontSize: 12,
    color: '#999',
    minWidth: 40,
  },
  // Behavioral Motivation Insights Styles
  behavioralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  behavioralSubtitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 24,
  },
  // Predictive Models Styles
  predictiveModelsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  modelsGrid: {
    gap: 12,
  },
  modelCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  modelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modelAccuracy: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  modelLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  modelConfidence: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  // Emotional Triggers Styles
  emotionalTriggersSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  triggerCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  triggerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  triggerIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  triggerEmotion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  triggerImpact: {
    fontSize: 14,
    color: '#1DB954',
    fontWeight: '500',
  },
  triggerDetails: {
    gap: 12,
  },
  triggerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  triggerMetric: {
    alignItems: 'center',
  },
  triggerMetricLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  triggerMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  triggerList: {
    marginTop: 8,
  },
  triggerListTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  triggerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  triggerTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  triggerTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Predictive Metrics Styles
  predictiveMetricsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  predictiveCardsGrid: {
    gap: 12,
  },
  predictiveCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  predictiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  predictiveTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  predictiveAction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 8,
  },
  predictiveDetails: {
    gap: 4,
  },
  predictiveProb: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  predictiveTime: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  // Predictive Consumer Behavior Styles
  predictiveConsumerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  predictiveConsumerSubtitle: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 24,
  },
  // Forecasting Accuracy Styles
  forecastingAccuracySection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  accuracyMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  accuracyCard: {
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  accuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  accuracyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  accuracyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  accuracyConfidence: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  // Streaming Forecast Styles
  streamingForecastSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  genreForecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  genreForecastInfo: {
    flex: 1,
  },
  genreName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  genreShareComparison: {
    flexDirection: 'row',
    gap: 16,
  },
  currentShare: {
    fontSize: 12,
    color: '#999',
  },
  predictedShare: {
    fontSize: 12,
    color: '#1DB954',
  },
  genreForecastMetrics: {
    alignItems: 'flex-end',
  },
  genreGrowth: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  genreConfidence: {
    fontSize: 12,
    color: '#666',
  },
  // Purchase Predictions Styles
  purchasePredictionsSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  purchaseCategoryItem: {
    marginBottom: 16,
  },
  purchaseCategoryInfo: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  categoryTimeframe: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  purchaseCategoryMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  likelihoodBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  likelihoodProgress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 10,
  },
  likelihoodText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  avgValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  categoryTrend: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  // Trending Products Forecast Styles
  trendingForecastSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  trendingProductCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  trendingProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendingProductName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  trendingProductGrowth: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingGrowthText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  trendingProductDetails: {
    gap: 12,
  },
  demandComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demandItem: {
    alignItems: 'center',
  },
  demandValueLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  demandValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DB954',
  },
  trendingProductMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  peakDate: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  priceRange: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '500',
  },
  demographicTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  demographicTag: {
    backgroundColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demographicTagText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  // Demographic Segmentation Styles
  demographicSegmentationSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  demographicSegmentCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  segmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DB954',
    marginBottom: 12,
  },
  segmentDetails: {
    gap: 8,
    marginBottom: 12,
  },
  segmentMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segmentLabel: {
    fontSize: 14,
    color: '#999',
  },
  segmentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  segmentTrends: {
    marginTop: 8,
  },
  segmentTrendsTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  segmentTrendTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  segmentTrendTag: {
    backgroundColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  segmentTrendText: {
    fontSize: 12,
    color: '#1DB954',
    fontWeight: '500',
  },
  // Future Demand Styles
  futureDemandSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  demandTimelineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  demandTimelineCard: {
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  demandTimelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  demandTimelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  demandPredicted: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 4,
  },
  demandTimelineLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  demandConfidence: {
    fontSize: 12,
    color: '#F59E0B',
    marginBottom: 4,
  },
  demandVariance: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
});