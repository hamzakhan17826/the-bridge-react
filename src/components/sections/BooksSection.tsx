import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Star } from 'lucide-react';

const BooksSection = () => {
  const featuredBooks = [
    {
      id: 1,
      title: 'The Art of Mediumship',
      author: 'Sarah Mitchell',
      description:
        'A comprehensive guide to developing your mediumship abilities with practical exercises and spiritual insights.',
      rating: 4.8,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      category: 'Mediumship',
    },
    {
      id: 2,
      title: 'Spirit Communication',
      author: 'Marcus Johnson',
      description:
        'Learn the ancient and modern techniques for connecting with the spirit world safely and effectively.',
      rating: 4.9,
      reviews: 203,
      image:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      category: 'Spirituality',
    },
    {
      id: 3,
      title: 'Evidence-Based Mediumship',
      author: 'Elena Rodriguez',
      description:
        'Understanding and developing evidential mediumship through scientific and spiritual perspectives.',
      rating: 4.7,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      category: 'Development',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Spiritual Books & Resources
          </h2>
          <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
            Explore our curated collection of books on mediumship, spirituality,
            and personal development to deepen your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-3/4 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {book.category}
                  </span>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-primary-600 font-medium text-sm mb-3">
                  by {book.author}
                </p>
                <p className="text-gray-600 font-lato text-sm leading-relaxed mb-4 line-clamp-3">
                  {book.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {book.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({book.reviews} reviews)
                    </span>
                  </div>
                </div>
                <Link
                  to={`/books/${book.id}`}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-poppins font-medium rounded-xl transition-colors duration-200"
                >
                  <BookOpen className="w-4 h-4" />
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/books"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore All Books</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
