import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Search, Bookmark, BookmarkCheck } from 'lucide-react-native';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readTime: string;
  bookmarked: boolean;
}

export default function BlogScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const accentColor = useThemeColor('accent');

  const categories = ['All', 'Nutrition', 'Workout', 'Mindfulness', 'Recovery'];
  
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Science Behind High-Intensity Interval Training',
      excerpt: 'Discover why HIIT workouts are so effective for burning fat and building endurance.',
      category: 'Workout',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
      readTime: '4 min read',
      bookmarked: false,
    },
    {
      id: '2',
      title: 'Nutrition Myths Debunked: The Truth About Protein',
      excerpt: 'Learn the facts about protein intake and its role in muscle building and recovery.',
      category: 'Nutrition',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop',
      readTime: '5 min read',
      bookmarked: false,
    },
    {
      id: '3',
      title: 'Mindful Movement: Combining Yoga and Strength Training',
      excerpt: 'How to integrate mindfulness practices into your strength training routine.',
      category: 'Mindfulness',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      readTime: '6 min read',
      bookmarked: true,
    },
  ]);

  const toggleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: textColor }]}>Fitness Blog</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={textColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search articles..."
            placeholderTextColor={textColor + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryButton,
                activeCategory === category && { backgroundColor: accentColor }
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: activeCategory === category ? '#000' : textColor }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.postsContainer}>
          {filteredPosts.map((post) => (
            <TouchableOpacity key={post.id} style={[styles.postCard, { backgroundColor }]}>
              <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
              <View style={styles.postContent}>
                <View style={styles.postHeader}>
                  <Text style={[styles.postCategory, { color: accentColor }]}>
                    {post.category}
                  </Text>
                  <TouchableOpacity onPress={() => toggleBookmark(post.id)}>
                    {post.bookmarked ? (
                      <BookmarkCheck size={24} color={accentColor} />
                    ) : (
                      <Bookmark size={24} color={textColor} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={[styles.postTitle, { color: textColor }]}>
                  {post.title}
                </Text>
                <Text style={[styles.postExcerpt, { color: textColor + '80' }]}>
                  {post.excerpt}
                </Text>
                <Text style={[styles.readTime, { color: textColor + '80' }]}>
                  {post.readTime}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D31',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#2A2D31',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  postsContainer: {
    gap: 24,
  },
  postCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 28,
  },
  postExcerpt: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  readTime: {
    fontSize: 14,
  },
});