import type { FC } from 'react';
import { MediumCard } from '../sections';
import { Link } from 'react-router-dom';
import { Users, Sparkles, ArrowRight } from 'lucide-react';
import { BackgroundDecorations } from '../ui';

const MeetTheMediums: FC = () => {
  // Mock data - replace with API call later
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
    // {
    //   id: '5',
    //   name: 'Lisa Park',
    //   photoUrl:
    //     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    //   specialty: 'Mental Medium',
    //   tagline: 'Clear mental mediumship with precision',
    //   focus: ['Mental Mediumship', 'Clairvoyance', 'Clairaudience'],
    //   averageRating: 4.9,
    //   totalReviews: 203,
    //   isBookingEnabled: true,
    //   slug: 'lisa-park',
    //   availabilityStatus: 'available',
    //   totalVideos: 42,
    //   experienceInYears: '8+ years',
    // },
    // {
    //   id: '6',
    //   name: 'James Wilson',
    //   photoUrl:
    //     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    //   specialty: 'Healing Medium',
    //   tagline: 'Restoring balance through spiritual healing',
    //   focus: ['Spiritual Healing', 'Energy Healing', 'Therapy'],
    //   averageRating: 4.8,
    //   totalReviews: 145,
    //   isBookingEnabled: true,
    //   slug: 'james-wilson',
    //   availabilityStatus: 'available',
    //   totalVideos: 28,
    //   experienceInYears: '14+ years',
    // },
  ];

  const backgroundDecorations = [
    {
      top: 'top-20',
      left: 'left-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-primary-200',
      delay: '0s',
    },
    {
      bottom: 'bottom-20',
      right: 'right-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-secondary-200',
      delay: '1s',
    },
  ];

  return (
    <section className="py-20 md:pb-28 relative overflow-hidden">
      <BackgroundDecorations decorations={backgroundDecorations} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-secondary-100 text-primary-700 font-poppins font-medium text-sm mb-6">
            <Users className="w-4 h-4" />
            Meet Our Mediums
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Meet the{' '}
            <span className="bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Mediums
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
            Evidential mediums dedicated to clarity, compassion, and connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mediums.map((medium) => (
            <MediumCard key={medium.id} medium={medium} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/mediums"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            <Sparkles className="w-5 h-5" />
            View All Presenters
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetTheMediums;
