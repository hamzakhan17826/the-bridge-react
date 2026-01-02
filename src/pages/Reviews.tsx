import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  Users,
  Award,
  Quote,
} from 'lucide-react';
import { Button, Input } from '../components/ui';
import type { ReviewItem } from '../types/types';

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for reviews
  const reviews: ReviewItem[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/images/team/1.jpg',
      rating: 5,
      date: 'Dec 20, 2024',
      category: 'Mediums',
      title: 'Life-Changing Medium Reading',
      comment:
        'Sarah connected me with my grandmother who passed away 10 years ago. The details she shared were incredibly accurate and brought me so much peace. Highly recommend!',
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/images/team/2.jpg',
      rating: 5,
      date: 'Dec 15, 2024',
      category: 'Podcasts',
      title: 'Daily Spiritual Motivation',
      comment:
        'The podcasts have become part of my daily routine. The insights on mediumship and spiritual growth are profound and practical. Thank you for this amazing content!',
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      avatar: '/images/team/3.jpg',
      rating: 4,
      date: 'Dec 10, 2024',
      category: 'Mediums',
      title: 'Accurate and Compassionate',
      comment:
        'Emma provided clear guidance about my career path. Her compassion and accuracy made the reading very meaningful. Will definitely book again.',
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: '/images/team/4.jpg',
      rating: 5,
      date: 'Dec 5, 2024',
      category: 'General',
      title: 'Found My Spiritual Community',
      comment:
        'This platform helped me discover my spiritual path and connect with like-minded people. The events and resources are invaluable.',
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: '/images/team/5.jpg',
      rating: 5,
      date: 'Nov 28, 2024',
      category: 'Podcasts',
      title: 'Healing Through Stories',
      comment:
        'The afterlife communication stories shared in the podcasts brought me comfort and understanding. Beautiful work!',
    },
    {
      id: 6,
      name: 'James Wilson',
      avatar: '/images/team/6.jpg',
      rating: 4,
      date: 'Nov 20, 2024',
      category: 'Mediums',
      title: 'Professional and Insightful',
      comment:
        'James provided clear insights about my relationships. His professional approach made me feel comfortable throughout the session.',
    },
    {
      id: 7,
      name: 'Maria Garcia',
      avatar: '/images/team/7.jpg',
      rating: 5,
      date: 'Nov 15, 2024',
      category: 'General',
      title: 'Transformative Experience',
      comment:
        'The Bridge has been instrumental in my spiritual awakening. The mediums, podcasts, and community support are exceptional.',
    },
    {
      id: 8,
      name: 'Robert Lee',
      avatar: '/images/team/8.jpg',
      rating: 5,
      date: 'Nov 10, 2024',
      category: 'Podcasts',
      title: 'Spiritual Growth Journey',
      comment:
        'Every episode provides new insights and tools for spiritual development. The quality of content is outstanding.',
    },
    {
      id: 9,
      name: 'Anna Kowalski',
      avatar: '/images/team/9.jpg',
      rating: 4,
      date: 'Nov 5, 2024',
      category: 'Mediums',
      title: 'Gentle and Accurate Guidance',
      comment:
        "Anna's gentle approach made the reading comfortable. The information she provided was spot-on and very helpful.",
    },
    {
      id: 10,
      name: 'Carlos Mendoza',
      avatar: '/images/team/10.jpg',
      rating: 5,
      date: 'Oct 30, 2024',
      category: 'General',
      title: 'Grateful for the Connection',
      comment:
        'Finding The Bridge was a blessing. The spiritual guidance and community have enriched my life immensely.',
    },
  ];

  // Filter options
  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Mediums', label: 'Medium Readings' },
    { value: 'Podcasts', label: 'Podcasts' },
    { value: 'General', label: 'General' },
  ];

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      selectedRating === 'all' ||
      (selectedRating === '4' && review.rating >= 4) ||
      (selectedRating === '3' && review.rating >= 3) ||
      review.rating.toString() === selectedRating;

    const matchesCategory =
      selectedCategory === 'all' || review.category === selectedCategory;

    return matchesSearch && matchesRating && matchesCategory;
  });

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  ).toFixed(1);
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  const ReviewCard = ({ review }: { review: ReviewItem }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Users className="w-6 h-6 text-primary-600" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-poppins font-semibold text-gray-900">
              {review.name}
            </h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{review.rating}/5</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium">
            {review.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <h5 className="font-poppins font-semibold text-gray-900 mb-2">
          {review.title}
        </h5>
        <p className="text-gray-600 text-sm leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Quote icon */}
      <div className="mt-4 flex justify-end">
        <Quote className="w-6 h-6 text-primary-200" />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Client Reviews - The Bridge</title>
        <meta
          name="description"
          content="Read authentic reviews from our clients about medium readings, spiritual guidance, and podcast experiences."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900  text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <MessageSquare className="w-4 h-4" />
              Client Reviews
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins text-white leading-tight mb-4">
              What Our{' '}
              <span className="bg-linear-to-r bg-clip-text">Clients </span>
              Say
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto">
              Authentic experiences and testimonials from people who found
              guidance, healing, and spiritual growth through The Bridge.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {totalReviews}+
                </div>
                <p className="text-gray-600 font-lato">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <Star className="w-8 h-8 text-yellow-500 fill-current" />
                </div>
                <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {averageRating}
                </div>
                <p className="text-gray-600 font-lato">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {fiveStarCount}
                </div>
                <p className="text-gray-600 font-lato">5-Star Reviews</p>
              </div>
            </div>
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
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                  >
                    {ratingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
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
              Showing {filteredReviews.length} of {reviews.length} reviews
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-linear-to-r from-primary-50 to-secondary-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <MessageSquare className="w-12 h-12 text-primary-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
                Share Your Experience
              </h2>
              <p className="text-lg text-gray-600 font-lato mb-8">
                Have you had a spiritual experience with us? We'd love to hear
                your story and help others find their path.
              </p>
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3"
              >
                Leave a Review
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;
