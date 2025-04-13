import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiClock, FiTag, FiArrowLeft, FiShare2, FiBookmark, FiCalendar } from 'react-icons/fi';
import { getBlogPostById } from '../services/exerciseService';
import { BlogPost } from '../models/exercises';

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getBlogPostById(id);

        if (data) {
          setPost(data);
        } else {
          setError('Blog post not found');
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blog post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Fallback data for development
  useEffect(() => {
    if (!post && !loading && !error) {
      const mockPost: BlogPost = {
        id: id || '1',
        title: 'How to Stay Active During Your Workday',
        content: `
          <p>In today's sedentary work environment, staying active throughout the workday is more important than ever for maintaining both physical health and mental sharpness. Here are some practical strategies to incorporate movement into your daily routine:</p>

          <h2>The Problem with Sitting</h2>
          <p>Research has consistently shown that prolonged sitting is associated with numerous health issues, including increased risk of cardiovascular disease, type 2 diabetes, and musculoskeletal problems. Even regular exercise outside of work hours may not fully offset the negative effects of sitting for 8+ hours a day.</p>

          <h2>Simple Office Exercises</h2>
          <p>These exercises can be done right at your desk without disturbing colleagues:</p>
          <ul>
            <li><strong>Desk Push-Ups:</strong> Place hands on the edge of your desk, step back, and perform push-ups at an angle.</li>
            <li><strong>Chair Squats:</strong> Stand up and sit down without using your hands, repeating 10-15 times.</li>
            <li><strong>Seated Leg Raises:</strong> While seated, extend one leg at a time, holding for 5 seconds.</li>
            <li><strong>Wrist and Ankle Rolls:</strong> Perform circular motions to prevent stiffness in joints.</li>
          </ul>

          <h2>Movement Breaks</h2>
          <p>Set a timer to remind yourself to stand up and move every 30-60 minutes. Even a brief 2-minute movement break can significantly improve circulation and energy levels. Try these movement break ideas:</p>
          <ul>
            <li>Take a quick walk to the water cooler or bathroom</li>
            <li>Perform a quick set of stretches</li>
            <li>Walk up and down a flight of stairs</li>
            <li>Do 20 jumping jacks or march in place</li>
          </ul>

          <h2>Rethinking Your Workspace</h2>
          <p>Consider these modifications to encourage more movement:</p>
          <ul>
            <li><strong>Standing Desk:</strong> Alternate between sitting and standing throughout the day.</li>
            <li><strong>Walking Meetings:</strong> For one-on-one discussions, suggest walking while talking.</li>
            <li><strong>Exercise Ball Chair:</strong> Replaces your regular chair to engage core muscles.</li>
            <li><strong>Desktop Placement:</strong> Place frequently used items just out of reach to encourage stretching.</li>
          </ul>

          <h2>Daily Habits That Make a Difference</h2>
          <p>Small changes to your daily routine can add up significantly:</p>
          <ul>
            <li>Park farther from the building entrance</li>
            <li>Take stairs instead of elevators</li>
            <li>Use restrooms on different floors</li>
            <li>Walk to colleagues' desks instead of sending emails</li>
            <li>Set up your printer away from your desk</li>
          </ul>

          <h2>Conclusion</h2>
          <p>Incorporating regular movement throughout your workday doesn't require dramatic changes to your routine. By making small, intentional choices to move more frequently, you can improve your energy, focus, productivity, and overall health. Remember that even small movements matter—they all add up to create a more active lifestyle despite the constraints of office work.</p>
        `,
        excerpt: 'Learn simple techniques to incorporate movement throughout your workday to improve energy, focus, and overall health.',
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        category: 'fitness',
        tags: ['office fitness', 'active work', 'health', 'productivity', 'ergonomics'],
        author: {
          id: 'author1',
          name: 'Alex Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        publishedAt: new Date().toISOString(),
        readTime: 5,
      };

      setPost(mockPost);
    }
  }, [post, loading, error, id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSave = () => {
    setSaved(!saved);
    // Logic to save/unsave the post would go here
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-FITZY-dark/70 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-FITZY-dark/70 rounded w-1/4 mx-auto mb-8"></div>
          <div className="h-96 bg-FITZY-dark/70 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-FITZY-dark/70 rounded"></div>
            <div className="h-4 bg-FITZY-dark/70 rounded"></div>
            <div className="h-4 bg-FITZY-dark/70 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mx-auto bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-4 rounded"
        >
          <FiArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="bg-FITZY-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-FITZY-teal hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Back to Blog
          </button>
        </div>

        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center text-sm text-gray-400 mb-3 space-x-4">
            <span className="bg-FITZY-teal/20 text-FITZY-teal px-2 py-1 rounded">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-1" /> {post.readTime} min read
            </span>
            <span className="flex items-center">
              <FiCalendar className="mr-1" /> {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Author & Actions */}
        <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-800">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <div className="text-white font-medium">{post.author.name}</div>
              <div className="text-gray-400 text-sm">Fitness Specialist</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className={`flex items-center ${saved ? 'text-FITZY-teal' : 'text-gray-400 hover:text-white'}`}
            >
              <FiBookmark className="mr-1" />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center text-gray-400 hover:text-white"
            >
              <FiShare2 className="mr-1" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-white font-medium mb-4">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/blog/tag/${tag}`}
                className="flex items-center bg-FITZY-dark/50 hover:bg-FITZY-dark/70 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-800"
              >
                <FiTag className="mr-1" size={14} /> {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Posts CTA */}
        <div className="bg-FITZY-dark/50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">
            Enjoyed this article?
          </h3>
          <p className="text-gray-300 mb-4">
            Check out more fitness and nutrition tips on our blog.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-6 rounded"
          >
            View More Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
