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
import { useBlogs } from '../hooks/useBlog';
import { useTags } from '../hooks/useTag';
import type { BlogPostResponse } from '../types/blog';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const { data: blogs = [], isLoading: isBlogsLoading } = useBlogs();
  const { data: tags = [] } = useTags();

  // Category options (Tags)
  const tagOptions = [
    { value: 'all', label: 'All Categories' },
    ...tags.map((tag) => ({ value: tag.name, label: tag.name })),
  ];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.authorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === 'all' || blog.tags.some((t) => t.name === selectedTag);

    return matchesSearch && matchesTag;
  });

  const BlogCard = ({ blog }: { blog: BlogPostResponse }) => (
    <div className="flex flex-col group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={blog.imageUrl || '/images/podcasts/carousel/1.jpg'}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            {blog.tags[0]?.name || 'Spiritual'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.authorName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Read more button */}
        <Link to={`/blogs/${blog.slug}`} className="mt-auto">
          <Button
            size="sm"
            className="w-full border border-primary-600 bg-white hover:bg-primary-600 hover:text-white text-primary-600 group-hover:border-primary-700"
          >
            Read Article
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Spiritual Blogs - The Bridge</title>
        <meta
          name="description"
          content="Explore our collection of spiritual blogs covering mediumship, energy healing, psychic development, and spiritual growth topics."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900  text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              Spiritual Blogs
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-poppins leading-tight mb-4">
              Wisdom <span className="bg-linear-to-r bg-clip-text">& </span>
              Insights
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto">
              Discover profound knowledge and practical guidance on your
              spiritual journey through our curated collection of articles and
              insights.
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                >
                  {tagOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {isBlogsLoading
                ? 'Loading articles...'
                : `Showing ${filteredBlogs.length} of ${blogs.length} articles`}
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {isBlogsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
              </div>
            ) : filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        {filteredBlogs.length > 0 && (
          <section className="py-16 bg-linear-to-r from-primary-50 to-secondary-50">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <BookOpen className="w-12 h-12 text-primary-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
                  Share Your Wisdom
                </h2>
                <p className="text-lg text-gray-600 font-lato mb-8">
                  Have insights or experiences you'd like to share with our
                  spiritual community? We'd love to hear from you.
                </p>
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3"
                >
                  Submit Your Article
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Blogs;
