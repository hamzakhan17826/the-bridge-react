import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useBlogPosts } from '../hooks/useBlog';
import { useTags } from '../hooks/useTag';
import type { BlogPost } from '../types/blog';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const { data: posts = [], isLoading: isPostsLoading } = useBlogPosts();
  const { data: tags = [] } = useTags();

  // Category options (Tags)
  const tagOptions = [
    { value: 'all', label: 'All Categories' },
    ...tags.map((tag) => ({ value: tag.name, label: tag.name })),
  ];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.authorName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === 'all' || post.tags.some((t) => t.name === selectedTag);

    return matchesSearch && matchesTag;
  });

  const BlogCard = ({ post }: { post: BlogPost }) => (
    <div className="flex flex-col group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.imageUrl || '/images/podcasts/carousel/1.jpg'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            {post.tags[0]?.name || 'Spiritual'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {post.title}
        </h3>

        <div
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.authorName || 'System'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Read more button */}
        <Link to={`/blogs/${post.slug}`} className="mt-auto">
          <Button
            size="sm"
            className="w-full border border-primary-600 bg-white hover:bg-primary-600 hover:text-white text-primary-600 group-hover:border-primary-700"
          >
            Read Blog
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Blog - The Bridge Spiritual Community</title>
        <meta
          name="description"
          content="Explore insights, stories, and wisdom from our spiritual community."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
            Spiritual <span className="text-secondary-400">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-50 max-w-2xl mx-auto font-lato mb-10">
            Discover articles on mediumship, spiritual growth, and personal experiences
            from our community members.
          </p>

          {/* Search & Filter Container */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-200" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                className="w-full pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-primary-200 focus:bg-white/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-64 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-200" />
              <select
                className="w-full pl-12 pr-4 h-12 bg-white/10 border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:bg-white/20 transition-all appearance-none"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                {tagOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-gray-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {isPostsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Fetching blog posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-900 mb-2">
                No blog posts found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No articles match your search criteria. Try different keywords or
                clear the search.
              </p>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;
