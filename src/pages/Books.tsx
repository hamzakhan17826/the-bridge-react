import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Filter, Star } from 'lucide-react';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Mediumship',
    'Spirituality',
    'Development',
    'Healing',
    'Consciousness',
  ];

  const books = [
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
      pages: 320,
      published: '2023',
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
        'https://images.unsplash.com/photo-1571946805638-3cc11f7ea1bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Spirituality',
      pages: 285,
      published: '2022',
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
        'https://images.unsplash.com/photo-1603163052302-05be52a494f4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Development',
      pages: 256,
      published: '2024',
    },
    {
      id: 4,
      title: 'Healing Through Spirit',
      author: 'Dr. Michael Chen',
      description:
        'Discover how spiritual connections can facilitate emotional healing and personal transformation.',
      rating: 4.6,
      reviews: 134,
      image:
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
      category: 'Healing',
      pages: 198,
      published: '2023',
    },
    {
      id: 5,
      title: 'Consciousness & Spirit',
      author: 'Dr. Lisa Thompson',
      description:
        'Exploring the intersection of consciousness studies and spiritual experiences in the modern world.',
      rating: 4.8,
      reviews: 167,
      image:
        'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=400&h=600&fit=crop',
      category: 'Consciousness',
      pages: 342,
      published: '2023',
    },
    {
      id: 6,
      title: 'Intuitive Development',
      author: 'Rachel Green',
      description:
        'A practical guide to developing your intuition and psychic abilities through daily exercises.',
      rating: 4.5,
      reviews: 98,
      image:
        'https://images.unsplash.com/photo-1687967447187-f5bfcd95c270?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Development',
      pages: 224,
      published: '2024',
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Spiritual Books & Resources - The Bridge</title>
        <meta
          name="description"
          content="Explore our collection of spiritual books on mediumship, consciousness, healing, and personal development."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 via-secondary-900 to-indigo-900 text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              Spiritual Books
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins text-white leading-tight mb-4">
              Expand Your{' '}
              <span className="bg-linear-to-r bg-clip-text">
                Spiritual Knowledge
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto mb-8">
              Discover books that will deepen your understanding of mediumship,
              spirituality, and personal growth on your spiritual journey.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl font-poppins font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-2">
                  {selectedCategory === 'All'
                    ? 'All Books'
                    : `${selectedCategory} Books`}
                </h2>
                <p className="text-gray-600 font-lato">
                  {filteredBooks.length} book
                  {filteredBooks.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {book.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-primary-600 font-medium text-sm mb-3">
                      by {book.author}
                    </p>
                    <p className="text-gray-600 font-lato text-sm leading-relaxed mb-4 line-clamp-3">
                      {book.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
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

                    {/* Book Details */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{book.pages} pages</span>
                      <span>{book.published}</span>
                    </div>

                    <Link
                      to={`/books/${book.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-poppins font-medium rounded-xl transition-colors duration-200"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-600 font-lato">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Books;
