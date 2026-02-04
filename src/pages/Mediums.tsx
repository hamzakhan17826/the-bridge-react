import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Users, Sparkles } from 'lucide-react';
import { MediumCard } from '../components/sections';
import { Button, Input } from '../components/ui';
import { AvailabilityStatus } from '../constants/enums';
import { useMediums } from '../hooks/useMedium';

const Mediums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  const { data: mediums = [], isLoading, isError } = useMediums();

  // Get unique specialties for filter
  const specialties = [
    'all',
    ...Array.from(new Set(mediums.map((m) => m.specialty))),
  ];
  const availabilityOptions = [
    { value: 'all', label: 'All Status' },
    { value: String(AvailabilityStatus.Available), label: 'Available Now' },
    {
      value: String(AvailabilityStatus.Upcoming_Events),
      label: 'Upcoming Events',
    },
    { value: String(AvailabilityStatus.Book_Reading), label: 'Book Reading' },
    {
      value: String(AvailabilityStatus.Private_Sessions_Only),
      label: 'Private Sessions Only',
    },
    {
      value: String(AvailabilityStatus.Public_Sessions_Only),
      label: 'Public Sessions Only',
    },
    { value: String(AvailabilityStatus.Unavailable), label: 'Unavailable' },
  ];

  // Filter mediums based on search and filters
  const filteredMediums = mediums.filter((medium) => {
    const focusFields = [
      medium.focus,
      medium.focusAreaTitle1,
      medium.focusAreaTitle2,
      medium.focusAreaTitle3,
      medium.focusAreaTitle4,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      (medium.slug || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      medium.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      focusFields.includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'all' || medium.specialty === selectedSpecialty;
    const matchesAvailability =
      selectedAvailability === 'all' ||
      medium.availabilityStatus === Number(selectedAvailability);

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <>
      <Helmet>
        <title>Our Mediums - The Bridge</title>
        <meta
          name="description"
          content="Connect with experienceInYearsd spiritual mediums. Browse profiles, read reviews, and book sessions with our community of gifted practitioners."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900  text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <Users className="w-4 h-4" />
              Our Mediums
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4 text-white">
              Meet Our{' '}
              <span className="bg-linear-to-r bg-clip-text">Spiritual </span>
              Guides
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto">
              Connect with experienceInYearsd mediums dedicated to clarity,
              compassion, and spiritual connection.
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
                  placeholder="Search mediums, specialties, or focus areas..."
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
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {isLoading
                ? 'Loading mediums...'
                : `Showing ${filteredMediums.length} of ${mediums.length} mediums`}
            </div>
          </div>
        </section>

        {/* Mediums Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="text-center py-16 text-gray-500">
                Loading mediums...
              </div>
            ) : isError ? (
              <div className="text-center py-16 text-red-500">
                Failed to load mediums.
              </div>
            ) : filteredMediums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMediums.map((medium) => (
                  <MediumCard key={medium.id} medium={medium} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No mediums found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        {filteredMediums.length > 0 && (
          <section className="py-16 bg-linear-to-r from-primary-50 to-secondary-50">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
                  Ready to Connect?
                </h2>
                <p className="text-lg text-gray-600 font-lato mb-8">
                  Book a session with one of our experienceInYearsd mediums and
                  begin your journey of spiritual discovery.
                </p>
                <Button
                  size="lg"
                  className="bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 text-lg"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Mediums;
