import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  BookOpen,
  User,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Button, Input } from '../components/ui';
import type { BlogItem } from '../types/types';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for blogs
  const blogs: BlogItem[] = [
    {
      id: 1,
      title: "Understanding Spirit Communication: A Beginner's Guide",
      excerpt:
        'Learn the fundamentals of connecting with the spirit world and developing your intuition for meaningful communication.',
      content: 'Full content here...',
      author: 'Sarah Johnson',
      date: 'Dec 20, 2024',
      readTime: '5 min read',
      category: 'Spirit Communication',
      image: '/images/podcasts/carousel/1.jpg',
      slug: 'understanding-spirit-communication',
    },
    {
      id: 2,
      title: 'The Science Behind Mediumship: What Research Tells Us',
      excerpt:
        'Explore scientific studies and research that validate the experiences of mediums and spiritual communication.',
      content: 'Full content here...',
      author: 'Dr. Michael Chen',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      category: 'Science & Research',
      image: '/images/podcasts/carousel/2.jpg',
      slug: 'science-behind-mediumship',
    },
    {
      id: 3,
      title: 'Signs Your Loved Ones Are Trying to Contact You',
      excerpt:
        'Recognize the common signs and symbols that indicate your departed loved ones are reaching out from the other side.',
      content: 'Full content here...',
      author: 'Emma Rodriguez',
      date: 'Dec 10, 2024',
      readTime: '6 min read',
      category: 'Signs & Symbols',
      image: '/images/podcasts/carousel/3.jpg',
      slug: 'signs-loved-ones-contact',
    },
    {
      id: 4,
      title: 'Energy Healing: Ancient Wisdom Meets Modern Practice',
      excerpt:
        'Discover how traditional energy healing techniques are being integrated into contemporary wellness practices.',
      content: 'Full content here...',
      author: 'Lisa Park',
      date: 'Dec 5, 2024',
      readTime: '7 min read',
      category: 'Energy Healing',
      image: '/images/podcasts/carousel/4.jpg',
      slug: 'energy-healing-ancient-modern',
    },
    {
      id: 5,
      title: 'Developing Your Psychic Abilities: A Step-by-Step Guide',
      excerpt:
        'A comprehensive guide to awakening and strengthening your natural psychic gifts through practice and meditation.',
      content: 'Full content here...',
      author: 'James Wilson',
      date: 'Nov 28, 2024',
      readTime: '10 min read',
      category: 'Personal Development',
      image: '/images/podcasts/carousel/5.jpg',
      slug: 'developing-psychic-abilities',
    },
    {
      id: 6,
      title: 'The Role of Mediums in Grief Counseling',
      excerpt:
        'How professional mediums can provide comfort and closure to those grieving the loss of loved ones.',
      content: 'Full content here...',
      author: 'Maria Garcia',
      date: 'Nov 20, 2024',
      readTime: '6 min read',
      category: 'Grief Support',
      image: '/images/podcasts/carousel/6.jpg',
      slug: 'mediums-grief-counseling',
    },
    {
      id: 7,
      title: 'Crystal Healing: Myths vs Reality',
      excerpt:
        'Separating fact from fiction in the world of crystal healing and understanding their true energetic properties.',
      content: 'Full content here...',
      author: 'David Thompson',
      date: 'Nov 15, 2024',
      readTime: '5 min read',
      category: 'Crystal Healing',
      image: '/images/podcasts/carousel/7.jpg',
      slug: 'crystal-healing-myths-reality',
    },
    {
      id: 8,
      title: 'Past Life Regression: Journeying Through Time',
      excerpt:
        'Explore the therapeutic benefits and techniques of past life regression therapy for personal growth.',
      content: 'Full content here...',
      author: 'Anna Kowalski',
      date: 'Nov 10, 2024',
      readTime: '9 min read',
      category: 'Past Life',
      image: '/images/podcasts/carousel/8.jpg',
      slug: 'past-life-regression-journey',
    },
    {
      id: 9,
      title: 'Protecting Your Energy in Spiritual Work',
      excerpt:
        'Essential techniques for maintaining energetic boundaries and protecting yourself during spiritual practices.',
      content: 'Full content here...',
      author: 'Carlos Mendoza',
      date: 'Nov 5, 2024',
      readTime: '4 min read',
      category: 'Energy Protection',
      image: '/images/podcasts/carousel/9.jpg',
      slug: 'protecting-energy-spiritual-work',
    },
    {
      id: 10,
      title: 'Angel Communication: Connecting with Divine Guidance',
      excerpt:
        'Learn how to recognize and interpret messages from angels and spirit guides in your daily life.',
      content: 'Full content here...',
      author: 'Rachel Green',
      date: 'Oct 30, 2024',
      readTime: '7 min read',
      category: 'Angel Communication',
      image: '/images/podcasts/carousel/1.jpg',
      slug: 'angel-communication-guidance',
    },
    {
      id: 11,
      title: 'The Ethics of Professional Mediumship',
      excerpt:
        'Understanding the professional standards and ethical considerations in the practice of mediumship.',
      content: 'Full content here...',
      author: 'Thomas Anderson',
      date: 'Oct 25, 2024',
      readTime: '6 min read',
      category: 'Professional Practice',
      image: '/images/podcasts/carousel/2.jpg',
      slug: 'ethics-professional-mediumship',
    },
    {
      id: 12,
      title: 'Meditation for Spiritual Awakening',
      excerpt:
        'Powerful meditation techniques specifically designed to accelerate your spiritual growth and awareness.',
      content: 'Full content here...',
      author: 'Sophie Turner',
      date: 'Oct 20, 2024',
      readTime: '8 min read',
      category: 'Meditation',
      image: '/images/podcasts/carousel/3.jpg',
      slug: 'meditation-spiritual-awakening',
    },
  ];

  // Category options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Spirit Communication', label: 'Spirit Communication' },
    { value: 'Science & Research', label: 'Science & Research' },
    { value: 'Signs & Symbols', label: 'Signs & Symbols' },
    { value: 'Energy Healing', label: 'Energy Healing' },
    { value: 'Personal Development', label: 'Personal Development' },
    { value: 'Grief Support', label: 'Grief Support' },
    { value: 'Crystal Healing', label: 'Crystal Healing' },
    { value: 'Past Life', label: 'Past Life' },
    { value: 'Energy Protection', label: 'Energy Protection' },
    { value: 'Angel Communication', label: 'Angel Communication' },
    { value: 'Professional Practice', label: 'Professional Practice' },
    { value: 'Meditation', label: 'Meditation' },
  ];

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const BlogCard = ({ blog }: { blog: BlogItem }) => (
    <div className="flex flex-col group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredBlogs.length} of {blogs.length} articles
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredBlogs.length > 0 ? (
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
