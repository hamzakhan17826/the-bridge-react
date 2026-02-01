import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Users, Sparkles } from 'lucide-react';
import { MediumCard } from '../components/sections';
import { Button, Input } from '../components/ui';

const Mediums = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  // Expanded mock data with more mediums
  const mediums = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      specialty: 'Evidential Medium',
      tagline: 'Bridging hearts through spirit evidence',
      focus: ['Spirit Communication', 'Healing', 'Evidence'],
      averageRating: 4.8,
      totalReviews: 127,
      isBookingEnabled: true,
      slug: 'sarah-johnson',
      availabilityStatus: 'available',
      totalVideos: 24,
      experienceInYears: '12+ years',
    },
    {
      id: '2',
      name: 'Michael Chen',
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      specialty: 'Trance Medium',
      tagline: 'Direct voice communication with spirit',
      focus: ['Trance Work', 'Direct Voice', 'Spirit Guides'],
      averageRating: 4.9,
      totalReviews: 89,
      isBookingEnabled: true,
      slug: 'michael-chen',
      availabilityStatus: 'upcoming-events',
      totalVideos: 18,
      experienceInYears: '15+ years',
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      photoUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      specialty: 'Spiritual Medium',
      tagline: 'Healing through spiritual connection',
      focus: ['Spiritual Healing', 'Energy Work', 'Guidance'],
      averageRating: 4.7,
      totalReviews: 156,
      isBookingEnabled: true,
      slug: 'elena-rodriguez',
      availabilityStatus: 'guest-medium',
      totalVideos: 31,
      experienceInYears: '10+ years',
    },
    {
      id: '4',
      name: 'David Thompson',
      photoUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      specialty: 'Physical Medium',
      tagline: 'Manifesting spirit through physical phenomena',
      focus: ['Physical Mediumship', 'Materialization', 'Energy'],
      averageRating: 4.6,
      totalReviews: 98,
      isBookingEnabled: true,
      slug: 'david-thompson',
      availabilityStatus: 'busy',
      totalVideos: 15,
      experienceInYears: '18+ years',
    },
    {
      id: '5',
      name: 'Lisa Park',
      photoUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      specialty: 'Mental Medium',
      tagline: 'Clear mental mediumship with precision',
      focus: ['Mental Mediumship', 'Clairvoyance', 'Clairaudience'],
      averageRating: 4.9,
      totalReviews: 203,
      isBookingEnabled: true,
      slug: 'lisa-park',
      availabilityStatus: 'available',
      totalVideos: 42,
      experienceInYears: '8+ years',
    },
    {
      id: '6',
      name: 'James Wilson',
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      specialty: 'Healing Medium',
      tagline: 'Restoring balance through spiritual healing',
      focus: ['Spiritual Healing', 'Energy Healing', 'Therapy'],
      averageRating: 4.8,
      totalReviews: 145,
      isBookingEnabled: true,
      slug: 'james-wilson',
      availabilityStatus: 'available',
      totalVideos: 28,
      experienceInYears: '14+ years',
    },
    {
      id: '7',
      name: 'Maria Santos',
      photoUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      specialty: 'Intuitive Medium',
      tagline: 'Connecting souls through intuition and love',
      focus: ['Intuition', 'Soul Connection', 'Love & Light'],
      averageRating: 4.7,
      totalReviews: 112,
      isBookingEnabled: true,
      slug: 'maria-santos',
      availabilityStatus: 'upcoming-events',
      totalVideos: 19,
      experienceInYears: '11+ years',
    },
    {
      id: '8',
      name: 'Robert Kim',
      photoUrl:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      specialty: 'Channeling Medium',
      tagline: 'Bringing forth wisdom from higher realms',
      focus: ['Channeling', 'Higher Wisdom', 'Spiritual Guidance'],
      averageRating: 4.5,
      totalReviews: 87,
      isBookingEnabled: true,
      slug: 'robert-kim',
      availabilityStatus: 'guest-medium',
      totalVideos: 22,
      experienceInYears: '16+ years',
    },
    {
      id: '9',
      name: 'Amanda Foster',
      photoUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      specialty: 'Animal Medium',
      tagline: 'Communicating with our animal companions',
      focus: ['Animal Communication', 'Pet Mediumship', 'Animal Healing'],
      averageRating: 4.9,
      totalReviews: 178,
      isBookingEnabled: true,
      slug: 'amanda-foster',
      availabilityStatus: 'available',
      totalVideos: 35,
      experienceInYears: '9+ years',
    },
    {
      id: '10',
      name: 'Thomas Brown',
      photoUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
      specialty: 'Medical Medium',
      tagline: 'Healing insights from the spirit world',
      focus: ['Medical Intuition', 'Health Guidance', 'Healing Energy'],
      averageRating: 4.6,
      totalReviews: 134,
      isBookingEnabled: true,
      slug: 'thomas-brown',
      availabilityStatus: 'busy',
      totalVideos: 27,
      experienceInYears: '13+ years',
    },
    {
      id: '11',
      name: 'Sophia Patel',
      photoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      specialty: 'Crystal Medium',
      tagline: 'Crystal energy and spiritual connection',
      focus: ['Crystal Healing', 'Energy Work', 'Crystal Readings'],
      averageRating: 4.8,
      totalReviews: 156,
      isBookingEnabled: true,
      slug: 'sophia-patel',
      availabilityStatus: 'available',
      totalVideos: 31,
      experienceInYears: '10+ years',
    },
    {
      id: '12',
      name: 'Marcus Johnson',
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      specialty: 'Shamanic Medium',
      tagline: 'Ancient wisdom for modern healing',
      focus: ['Shamanic Practices', 'Ancestral Wisdom', 'Ritual Work'],
      averageRating: 4.7,
      totalReviews: 92,
      isBookingEnabled: true,
      slug: 'marcus-johnson',
      availabilityStatus: 'upcoming-events',
      totalVideos: 18,
      experienceInYears: '17+ years',
    },
  ];

  // Get unique specialties for filter
  const specialties = [
    'all',
    ...Array.from(new Set(mediums.map((m) => m.specialty))),
  ];
  const availabilityOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available Now' },
    { value: 'upcoming-events', label: 'Upcoming Events' },
    { value: 'guest-medium', label: 'Guest Medium' },
    { value: 'busy', label: 'Currently Busy' },
  ];

  // Filter mediums based on search and filters
  const filteredMediums = mediums.filter((medium) => {
    const matchesSearch =
      medium.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medium.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medium.focus.some((focus) =>
        focus.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialty =
      selectedSpecialty === 'all' || medium.specialty === selectedSpecialty;
    const matchesAvailability =
      selectedAvailability === 'all' ||
      medium.availabilityStatus === selectedAvailability;

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
              Showing {filteredMediums.length} of {mediums.length} mediums
            </div>
          </div>
        </section>

        {/* Mediums Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredMediums.length > 0 ? (
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
