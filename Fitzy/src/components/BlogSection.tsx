import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiTag, FiFilter, FiUser } from 'react-icons/fi';
import { getBlogPosts } from '../services/exerciseService';
import { BlogPost } from '../models/exercises';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);

  const blogCategories = [
    { id: '', name: 'All' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'motivation', name: 'Motivation' },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts(selectedCategory || undefined);

        // Set the first post as featured if data is available
        if (data.length > 0) {
          setFeaturedPost(data[0]);
          setPosts(data.slice(1));  // Set the rest of the posts
        } else {
          setFeaturedPost(null);
          setPosts([]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  // Fallback data for development
  useEffect(() => {
    if (posts.length === 0 && !loading && !error) {
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'How to Stay Active During Your Workday',
          content: '...',
          excerpt: 'Learn simple techniques to incorporate movement throughout your workday to improve energy, focus, and overall health.',
          image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          category: 'fitness',
          tags: ['office fitness', 'active work', 'health'],
          author: {
            id: 'author1',
            name: 'Alex Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          },
          publishedAt: new Date().toISOString(),
          readTime: 5,
        },
        {
          id: '2',
          title: 'Nutrition Tips for Busy Professionals',
          content: '...',
          excerpt: 'Quick and easy nutrition strategies to maintain a healthy diet even with a demanding work schedule.',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          category: 'nutrition',
          tags: ['meal prep', 'healthy eating', 'office lunch'],
          author: {
            id: 'author2',
            name: 'Samantha Lee',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          readTime: 7,
        },
        {
          id: '3',
          title: 'The Best Home Workouts for Limited Space',
          content: '...',
          excerpt: 'Effective workout routines that require minimal space and equipment but deliver maximum results.',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          category: 'fitness',
          tags: ['home workout', 'small space', 'no equipment'],
          author: {
            id: 'author3',
            name: 'Marcus Thompson',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
          publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          readTime: 6,
        },
        {
          id: '4',
          title: 'Mindfulness Practices for Stress Reduction',
          content: '...',
          excerpt: 'Simple mindfulness techniques you can practice daily to reduce stress and improve mental clarity.',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          category: 'wellness',
          tags: ['mindfulness', 'stress management', 'mental health'],
          author: {
            id: 'author4',
            name: 'Clara Winston',
            avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
          },
          publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          readTime: 4,
        }
      ];

      setFeaturedPost(mockPosts[0]);
      setPosts(mockPosts.slice(1));
    }
  }, [posts, loading, error]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section id="blog" className="py-16 bg-FITZY-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Fitness & Nutrition Blog</h2>
            <p className="mt-4 text-gray-300">
              Stay updated with the latest tips and insights for your fitness journey
            </p>
          </div>

          <div className="animate-pulse">
            <div className="h-72 bg-FITZY-dark/70 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-64 bg-FITZY-dark/70 rounded-lg"></div>
              <div className="h-64 bg-FITZY-dark/70 rounded-lg"></div>
              <div className="h-64 bg-FITZY-dark/70 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-16 bg-FITZY-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Fitness & Nutrition Blog</h2>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 bg-FITZY-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Fitness & Nutrition Blog</h2>
          <p className="mt-4 text-gray-300">
            Stay updated with the latest tips and insights for your fitness journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-FITZY-dark/50 p-1 rounded-lg overflow-hidden">
            {blogCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-FITZY-teal text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <div className="bg-FITZY-dark/50 rounded-lg overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 md:p-8">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <span className="bg-FITZY-teal/20 text-FITZY-teal px-2 py-1 rounded">
                      {featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}
                    </span>
                    <span className="ml-4 flex items-center">
                      <FiClock className="mr-1" /> {featuredPost.readTime} min read
                    </span>
                    <span className="ml-4">{formatDate(featuredPost.publishedAt)}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>

                  <div className="flex items-center">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-white">{featuredPost.author.name}</span>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="mt-6 inline-block bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-4 rounded"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-FITZY-dark/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-FITZY-teal/90 text-white text-xs px-2 py-1 rounded-full">
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <span className="flex items-center">
                    <FiClock className="mr-1" /> {post.readTime} min read
                  </span>
                  <span className="ml-4 flex items-center">
                    <FiUser className="mr-1" /> {post.author.name}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs bg-FITZY-dark/70 text-gray-300 px-2 py-1 rounded"
                    >
                      <FiTag className="mr-1" size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-FITZY-dark/50 text-white hover:bg-FITZY-dark/70 py-2 px-6 rounded border border-gray-700"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
