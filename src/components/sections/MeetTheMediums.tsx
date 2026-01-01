import type { FC } from 'react';
import { MediumCard } from '../sections';
import { Link } from 'react-router-dom';
import { Users, Sparkles, ArrowRight } from 'lucide-react';
import type { Medium } from '../../types/types';

const MeetTheMediums: FC = () => {
  // Mock data - replace with API call later
  const mediums: Medium[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      specialty: 'Evidential Medium',
      tagline: 'Bridging hearts through spirit evidence',
      focus: ['Spirit Communication', 'Healing', 'Evidence'],
      ratingAverage: 4.8,
      ratingCount: 127,
      bookingEnabled: true,
      slug: 'sarah-johnson',
      availabilityStatus: 'available',
      //   nextEvent: {
      //     title: 'Platform Demonstration',
      //     date: 'Jan 15, 2025',
      //     time: '7:00 PM EST',
      //   },
      videoCount: 24,
      experience: '12+ years',
    },
    {
      id: '2',
      name: 'Michael Chen',
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      specialty: 'Trance Medium',
      tagline: 'Direct voice communication with spirit',
      focus: ['Trance Work', 'Direct Voice', 'Spirit Guides'],
      ratingAverage: 4.9,
      ratingCount: 89,
      bookingEnabled: true,
      slug: 'michael-chen',
      availabilityStatus: 'upcoming-events',
      //   nextEvent: {
      //     title: 'Trance Workshop',
      //     date: 'Jan 20, 2025',
      //     time: '2:00 PM EST',
      //   },
      videoCount: 18,
      experience: '15+ years',
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      photoUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      specialty: 'Spiritual Medium',
      tagline: 'Healing through spiritual connection',
      focus: ['Spiritual Healing', 'Energy Work', 'Guidance'],
      ratingAverage: 4.7,
      ratingCount: 156,
      bookingEnabled: true,
      slug: 'elena-rodriguez',
      availabilityStatus: 'guest-medium',
      videoCount: 31,
      experience: '10+ years',
      //   nextEvent: {
      //     title: 'Mental Mediumship Circle',
      //     date: 'Jan 25, 2025',
      //     time: '6:30 PM EST',
      //   },
    },
    {
      id: '4',
      name: 'David Thompson',
      photoUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      specialty: 'Physical Medium',
      tagline: 'Manifesting spirit through physical phenomena',
      focus: ['Physical Mediumship', 'Materialization', 'Energy'],
      ratingAverage: 4.6,
      ratingCount: 98,
      bookingEnabled: true,
      slug: 'david-thompson',
      availabilityStatus: 'busy',
      //   nextEvent: {
      //     title: 'Physical Mediumship Demo',
      //     date: 'Feb 5, 2025',
      //     time: '8:00 PM EST',
      //   },
      videoCount: 15,
      experience: '18+ years',
    },
    // {
    //   id: '5',
    //   name: 'Lisa Park',
    //   photoUrl:
    //     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    //   specialty: 'Mental Medium',
    //   tagline: 'Clear mental mediumship with precision',
    //   focus: ['Mental Mediumship', 'Clairvoyance', 'Clairaudience'],
    //   ratingAverage: 4.9,
    //   ratingCount: 203,
    //   bookingEnabled: true,
    //   slug: 'lisa-park',
    //   availabilityStatus: 'available',
    //   //   nextEvent: {
    //   //     title: 'Mental Mediumship Circle',
    //   //     date: 'Jan 25, 2025',
    //   //     time: '6:30 PM EST',
    //   //   },
    //   videoCount: 42,
    //   experience: '8+ years',
    // },
    // {
    //   id: '6',
    //   name: 'James Wilson',
    //   photoUrl:
    //     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    //   specialty: 'Healing Medium',
    //   tagline: 'Restoring balance through spiritual healing',
    //   focus: ['Spiritual Healing', 'Energy Healing', 'Therapy'],
    //   ratingAverage: 4.8,
    //   ratingCount: 145,
    //   bookingEnabled: true,
    //   slug: 'james-wilson',
    //   availabilityStatus: 'available',
    //   videoCount: 28,
    //   experience: '14+ years',
    // },
  ];

  return (
    <section className="py-20 md:pb-28 bg-linear-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm mb-6">
            <Users className="w-4 h-4" />
            Meet Our Mediums
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Meet the{' '}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
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
