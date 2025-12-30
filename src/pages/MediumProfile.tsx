import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Star,
  Video,
  Calendar,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  Heart,
  Share2,
  BookOpen,
  Users,
  TrendingUp,
  Play,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

// Extended Medium Profile interface
interface MediumProfile {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  tagline: string;
  bio: string;
  philosophy: string;
  experience: string;
  experienceYears: number;
  sessionCount: number;
  ratingAverage: number;
  ratingCount: number;
  videoCount: number;
  focus: Array<{
    name: string;
    description: string;
  }>;
  availabilityStatus: 'available' | 'upcoming-events' | 'guest-medium' | 'busy';
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: 'live' | 'virtual' | 'workshop';
  }>;
  videos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    uploadDate: string;
  }>;
  reviews: Array<{
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  pricing: {
    singleSession: number;
    package3: number;
    package5: number;
  };
  contact: {
    email: string;
    phone?: string;
  };
  socialLinks: {
    website?: string;
    instagram?: string;
    youtube?: string;
  };
}

// Mock data for demonstration
const mockMediumProfile: MediumProfile = {
  id: '1',
  name: 'Sarah Mitchell',
  photoUrl: '/images/team/1.jpg',
  specialty: 'Evidential Medium',
  tagline: 'Bridging hearts through spirit communication',
  bio: 'Sarah Mitchell is a renowned evidential medium with over 15 years of experience connecting people with their loved ones in spirit. Her compassionate approach and dedication to providing clear, specific evidence have touched thousands of lives worldwide.',
  philosophy:
    'I believe that mediumship is not just about delivering messages, but about healing hearts and bringing peace to those who grieve. Every reading is an opportunity to demonstrate the continuity of love beyond physical life.',
  experience: '15+ years',
  experienceYears: 15,
  sessionCount: 2500,
  ratingAverage: 4.9,
  ratingCount: 487,
  videoCount: 45,
  focus: [
    {
      name: 'Spirit Communication',
      description:
        'Connecting with loved ones who have passed, providing specific evidence of their continued presence.',
    },
    {
      name: 'Grief Healing',
      description:
        'Supporting individuals through the grieving process with compassionate spiritual guidance.',
    },
    {
      name: 'Evidence-Based Mediumship',
      description:
        'Delivering clear, verifiable information from spirit to validate the connection.',
    },
    {
      name: 'Spiritual Development',
      description:
        'Mentoring developing mediums and helping others strengthen their own spiritual awareness.',
    },
  ],
  availabilityStatus: 'available',
  upcomingEvents: [
    {
      id: '1',
      title: 'Live Demonstration - Spirit Communication',
      date: '2024-01-15',
      time: '7:00 PM EST',
      location: 'Online',
      type: 'live',
    },
    {
      id: '2',
      title: 'Mediumship Workshop - Developing Your Gifts',
      date: '2024-01-22',
      time: '10:00 AM EST',
      location: 'New York, NY',
      type: 'workshop',
    },
    {
      id: '3',
      title: 'Private Reading Session',
      date: '2024-01-18',
      time: '2:00 PM EST',
      location: 'Virtual',
      type: 'virtual',
    },
  ],
  videos: [
    {
      id: '1',
      title: 'Understanding Spirit Communication',
      thumbnail: '/images/podcasts/carousel/1.jpg',
      duration: '24:35',
      views: 12500,
      uploadDate: '2023-12-01',
    },
    {
      id: '2',
      title: 'Evidence in Mediumship Readings',
      thumbnail: '/images/podcasts/carousel/2.jpg',
      duration: '31:42',
      views: 8900,
      uploadDate: '2023-11-15',
    },
    {
      id: '3',
      title: 'Healing Through Spirit Connection',
      thumbnail: '/images/podcasts/carousel/3.jpg',
      duration: '28:17',
      views: 15600,
      uploadDate: '2023-10-28',
    },
  ],
  reviews: [
    {
      id: '1',
      userName: 'Maria Rodriguez',
      userAvatar: '/images/team/2.jpg',
      rating: 5,
      comment:
        'Sarah provided incredible evidence from my grandmother. Details only she would know. Life-changing experience.',
      date: '2023-12-10',
    },
    {
      id: '2',
      userName: 'James Wilson',
      userAvatar: '/images/team/3.jpg',
      rating: 5,
      comment:
        "Compassionate and professional. The reading brought me peace I've been seeking for years.",
      date: '2023-11-28',
    },
    {
      id: '3',
      userName: 'Lisa Chen',
      userAvatar: '/images/team/4.jpg',
      rating: 5,
      comment:
        "Sarah's accuracy is remarkable. She connected me with my father and provided specific memories we shared.",
      date: '2023-11-15',
    },
  ],
  pricing: {
    singleSession: 150,
    package3: 400,
    package5: 650,
  },
  contact: {
    email: 'sarah@thebridge.com',
    phone: '+1 (555) 123-4567',
  },
  socialLinks: {
    website: 'https://sarahmitchellmedium.com',
    instagram: '@sarahmitchellmedium',
    youtube: '@SarahMitchellMedium',
  },
};

const MediumProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // In a real app, this would fetch data based on slug
  // For now, we'll use mock data - TODO: Implement API call with slug
  console.log('Loading profile for:', slug);
  const profile = mockMediumProfile;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getAvailabilityBadge = (
    status: MediumProfile['availabilityStatus']
  ) => {
    switch (status) {
      case 'available':
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Available Now
          </Badge>
        );
      case 'upcoming-events':
        return (
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Upcoming Events
          </Badge>
        );
      case 'guest-medium':
        return (
          <Badge
            variant="default"
            className="bg-purple-100 text-purple-800 border-purple-200"
          >
            Guest Medium
          </Badge>
        );
      case 'busy':
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-800 border-gray-200"
          >
            Currently Busy
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {profile.name} - {profile.specialty} | The Bridge
        </title>
        <meta
          name="description"
          content={`${profile.tagline} - ${profile.specialty} with ${profile.experienceYears} years of experience.`}
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Photo */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl scale-125"></div>
                  <Avatar className="w-48 h-48 border-8 border-white/20 shadow-2xl relative z-10">
                    <AvatarImage src={profile.photoUrl} alt={profile.name} />
                    <AvatarFallback className="text-4xl font-bold bg-linear-to-br from-purple-100 to-blue-100">
                      {profile.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 z-20">
                    {getAvailabilityBadge(profile.availabilityStatus)}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl text-white lg:text-6xl font-bold mb-4">
                  {profile.name}
                </h1>
                <p className="text-xl lg:text-2xl text-purple-200 mb-2">
                  {profile.specialty}
                </p>
                <p className="text-lg text-blue-200 italic mb-6">
                  "{profile.tagline}"
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {profile.experienceYears}+
                    </div>
                    <div className="text-sm text-purple-200">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {profile.sessionCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-200">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {renderStars(profile.ratingAverage)}
                    </div>
                    <div className="text-sm text-purple-200">
                      {profile.ratingAverage} ({profile.ratingCount})
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {profile.videoCount}
                    </div>
                    <div className="text-sm text-purple-200">Videos</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Session
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-purple-900 hover:bg-white hover:text-purple-900 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Follow
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-purple-900 hover:bg-white hover:text-purple-900 cursor-pointer"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About {profile.name}
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-900 mb-3">
                      Biography
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold text-purple-900 mb-3">
                      Philosophy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {profile.philosophy}
                    </p>
                  </div>
                </div>
              </section>

              {/* Credentials & Stats */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Credentials & Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {profile.experience}
                      </div>
                      <div className="text-sm text-gray-600">
                        Professional Experience
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {profile.sessionCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sessions Completed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {profile.ratingAverage}/5
                      </div>
                      <div className="text-sm text-gray-600">
                        {profile.ratingCount} Reviews
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {profile.videoCount}
                      </div>
                      <div className="text-sm text-gray-600">
                        Educational Videos
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Areas of Focus */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Areas of Focus
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.focus.map((focus, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">
                        {focus.name}
                      </h3>
                      <p className="text-gray-700">{focus.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Events */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Upcoming Events
                  </h2>
                  <Button
                    variant="outline"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    View All Events
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {profile.upcomingEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.date} at {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.type === 'live' ? 'default' : 'secondary'
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* Video Gallery */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Video Gallery
                  </h2>
                  <Button
                    variant="outline"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    View All Videos
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.videos.map((video) => (
                    <div
                      key={video.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedVideo(video.id)}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {video.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {video.views.toLocaleString()} views •{' '}
                        {video.uploadDate}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews & Testimonials */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Reviews & Testimonials
                  </h2>
                  <Button
                    variant="outline"
                    className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  >
                    View All Reviews
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="space-y-6">
                  {profile.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={review.userAvatar}
                            alt={review.userName}
                          />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {review.userName}
                            </h4>
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <div className="text-sm text-gray-500">
                            {review.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Booking Section */}
              <section className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Book a Session
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        Single Session
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        ${profile.pricing.singleSession}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      60-minute private reading
                    </p>
                    <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                      Book Now
                    </Button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        3-Session Package
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        ${profile.pricing.package3}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Save 11% on multiple sessions
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Book Package
                    </Button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        5-Session Package
                      </span>
                      <span className="text-lg font-bold text-purple-600">
                        ${profile.pricing.package5}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Save 17% on multiple sessions
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Book Package
                    </Button>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-gray-700 hover:text-purple-600"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                  {profile.contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <a
                        href={`tel:${profile.contact.phone}`}
                        className="text-gray-700 hover:text-purple-600"
                      >
                        {profile.contact.phone}
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* Social Links */}
              <section className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Connect
                </h3>
                <div className="space-y-3">
                  {profile.socialLinks.website && (
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600"
                    >
                      <BookOpen className="w-5 h-5" />
                      Personal Website
                    </a>
                  )}
                  {profile.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${profile.socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600"
                    >
                      📷 Instagram
                    </a>
                  )}
                  {profile.socialLinks.youtube && (
                    <a
                      href={`https://youtube.com/${profile.socialLinks.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-purple-600"
                    >
                      📺 YouTube
                    </a>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Video Modal (placeholder for future implementation) */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Video Player</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedVideo(null)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Video player would be embedded here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Video ID: {selectedVideo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MediumProfile;
