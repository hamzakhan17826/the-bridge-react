import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Star,
  BookOpen,
  Clock,
  Calendar,
  User,
  Heart,
  Share2,
} from 'lucide-react';

const BookDetail = () => {
  // Mock book data - in real app this would come from API
  const book = {
    id: 1,
    title: 'The Art of Mediumship',
    author: 'Sarah Mitchell',
    description:
      'A comprehensive guide to developing your mediumship abilities with practical exercises and spiritual insights. This book serves as both a theoretical foundation and practical handbook for anyone interested in exploring mediumship.',
    longDescription: `
      <p>In "The Art of Mediumship," Sarah Mitchell draws from her 15+ years of experience as a professional medium to provide readers with a comprehensive understanding of mediumship development. This book bridges the gap between spiritual theory and practical application, offering clear guidance for both beginners and experienced practitioners.</p>

      <p>The book begins with foundational concepts of energy work and spiritual communication, then progresses through advanced techniques for evidence gathering and message delivery. Each chapter includes practical exercises, meditation practices, and journaling prompts to help readers develop their abilities at their own pace.</p>

      <p>Key topics covered include:</p>
      <ul>
        <li>Understanding spiritual energy and vibration</li>
        <li>Developing clairvoyance, clairaudience, and clairsentience</li>
        <li>Ethical considerations in mediumship practice</li>
        <li>Building confidence in your abilities</li>
        <li>Working with spirit guides and helpers</li>
        <li>Creating sacred space for readings</li>
      </ul>

      <p>Whether you're just beginning your spiritual journey or looking to refine your mediumship skills, "The Art of Mediumship" provides the tools and knowledge you need to connect more deeply with the spirit world.</p>
    `,
    rating: 4.8,
    reviewCount: 156,
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop',
    category: 'Mediumship',
    pages: 320,
    published: '2023',
    isbn: '978-1-234567-89-0',
    language: 'English',
    tags: [
      'Mediumship',
      'Spirit Communication',
      'Spiritual Development',
      'Psychic Abilities',
    ],
    reviews: [
      {
        id: 1,
        name: 'Maria Gonzalez',
        rating: 5,
        date: '2024-01-15',
        comment:
          "This book completely transformed my understanding of mediumship. Sarah's practical approach made complex concepts accessible.",
      },
      {
        id: 2,
        name: 'David Chen',
        rating: 5,
        date: '2024-01-08',
        comment:
          'Excellent resource for both beginners and experienced mediums. The exercises are particularly helpful.',
      },
      {
        id: 3,
        name: 'Lisa Thompson',
        rating: 4,
        date: '2023-12-20',
        comment:
          'Well-written and comprehensive. A must-read for anyone serious about mediumship development.',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{book.title} - The Bridge</title>
        <meta name="description" content={book.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back Navigation */}
        <section className="py-6 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-poppins font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Books
            </Link>
          </div>
        </section>

        {/* Book Header */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Book Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-80 h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-primary-500 text-white px-4 py-2 rounded-xl font-poppins font-semibold text-sm">
                    {book.category}
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-4">
                    {book.title}
                  </h1>
                  <p className="text-xl text-primary-600 font-medium mb-4">
                    by {book.author}
                  </p>
                  <p className="text-gray-600 font-lato leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(book.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {book.rating}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    ({book.reviewCount} reviews)
                  </span>
                </div>

                {/* Book Details */}
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pages</p>
                      <p className="font-semibold text-gray-900">
                        {book.pages}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-semibold text-gray-900">
                        {book.published}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-semibold text-gray-900">
                        {book.language}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-500">ISBN</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {book.isbn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-poppins font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Read Now
                  </button>
                  <button className="p-3 border border-gray-300 hover:border-primary-300 rounded-xl transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="p-3 border border-gray-300 hover:border-primary-300 rounded-xl transition-colors duration-200">
                    <Share2 className="w-5 h-5 text-gray-600 hover:text-primary-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book Description */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-8">
                About This Book
              </h2>
              <div
                className="prose prose-lg max-w-none font-lato text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: book.longDescription }}
              />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-8">
                Reader Reviews
              </h2>

              <div className="space-y-6">
                {book.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-poppins font-semibold text-gray-900">
                            {review.name}
                          </h4>
                          <div className="flex items-center gap-2">
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
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 font-lato leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-6 py-3 border border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-medium rounded-xl transition-colors duration-200">
                  Load More Reviews
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Books */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-4">
                You Might Also Like
              </h2>
              <p className="text-gray-600 font-lato max-w-2xl mx-auto">
                Explore more books on mediumship and spiritual development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Related books would go here - using placeholder for now */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-3/4 bg-gray-200 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-poppins font-semibold text-gray-900 mb-2">
                      Related Book {i}
                    </h3>
                    <p className="text-primary-600 font-medium text-sm mb-3">
                      by Author Name
                    </p>
                    <Link
                      to={`/books/${i + 1}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookDetail;
