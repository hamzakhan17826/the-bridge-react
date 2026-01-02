import { useState, useMemo } from 'react';
import {
  Search,
  //   Filter,
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface Event {
  id: number;
  image: string;
  badge: string;
  badgeType: 'live' | 'virtual' | 'in-person' | 'webinar';
  date: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  registered: number;
  duration: string;
  price: string;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'past';
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const events: Event[] = [
    {
      id: 1,
      image: '/images/podcasts/carousel/6.jpg',
      badge: 'Live Podcast Recording',
      badgeType: 'live',
      date: '2025-02-12T15:00:00',
      title: 'Bridging Cultures Podcast Live',
      description:
        'Join us for a live recording of our latest episode on cultural bridges in modern society. Experience the magic of live podcasting and interact with our hosts in real-time.',
      location: 'Chiang Mai, Thailand',
      capacity: 150,
      registered: 89,
      duration: '2 hours',
      price: 'Free',
      tags: ['Podcast', 'Culture', 'Live Event'],
      status: 'upcoming',
    },
    {
      id: 2,
      image: '/images/podcasts/carousel/7.jpg',
      badge: 'Virtual Event',
      badgeType: 'virtual',
      date: '2025-03-05T11:00:00',
      title: 'Podcast Q&A Session',
      description:
        'Interactive Q&A with our podcast hosts about bridging gaps in technology and humanity. Ask your burning questions and get exclusive insights.',
      location: 'Online (Zoom)',
      capacity: 500,
      registered: 234,
      duration: '1.5 hours',
      price: 'Free',
      tags: ['Q&A', 'Interactive', 'Technology'],
      status: 'upcoming',
    },
    {
      id: 3,
      image: '/images/podcasts/carousel/8.jpg',
      badge: 'In-Person Meetup',
      badgeType: 'in-person',
      date: '2025-01-23T17:30:00',
      title: 'The Bridge Fan Meetup',
      description:
        'Meet fellow listeners and discuss your favorite episodes in person. Network with like-minded individuals and build meaningful connections.',
      location: 'New York, USA',
      capacity: 75,
      registered: 45,
      duration: '3 hours',
      price: '$25',
      tags: ['Networking', 'Community', 'Social'],
      status: 'upcoming',
    },
    {
      id: 4,
      image: '/images/podcasts/carousel/9.jpg',
      badge: 'Online Webinar',
      badgeType: 'webinar',
      date: '2025-04-10T14:00:00',
      title: 'Podcast Behind the Scenes',
      description:
        'Get exclusive insights into how we create content that bridges worlds. Learn about our production process and creative decisions.',
      location: 'Online (YouTube Live)',
      capacity: 1000,
      registered: 567,
      duration: '1 hour',
      price: 'Free',
      tags: ['Behind-the-scenes', 'Production', 'Education'],
      status: 'upcoming',
    },
    {
      id: 5,
      image: '/images/podcasts/carousel/1.jpg',
      badge: 'Virtual Workshop',
      badgeType: 'virtual',
      date: '2025-02-28T10:00:00',
      title: 'Spiritual Communication Workshop',
      description:
        'Learn techniques for bridging the physical and spiritual worlds. A transformative workshop led by experienced mediums.',
      location: 'Online',
      capacity: 200,
      registered: 156,
      duration: '4 hours',
      price: '$49',
      tags: ['Workshop', 'Spiritual', 'Mediumship'],
      status: 'upcoming',
    },
    {
      id: 6,
      image: '/images/podcasts/carousel/2.jpg',
      badge: 'Live Event',
      badgeType: 'live',
      date: '2025-03-15T19:00:00',
      title: 'Evening of Mediumship',
      description:
        'An intimate evening featuring live mediumship demonstrations and spiritual readings. Experience the power of spiritual connection.',
      location: 'London, UK',
      capacity: 100,
      registered: 78,
      duration: '2.5 hours',
      price: '$35',
      tags: ['Mediumship', 'Live Demo', 'Spiritual'],
      status: 'upcoming',
    },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilter =
        selectedFilter === 'all' || event.badgeType === selectedFilter;
      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus;

      return matchesSearch && matchesFilter && matchesStatus;
    });
  }, [searchTerm, selectedFilter, selectedStatus]);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'virtual':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'in-person':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'webinar':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-linear-to-r from-primary-500 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl  mb-4 text-white">
              All Events
            </h1>
            <p className="text-xl md:text-2xl  max-w-3xl mx-auto text-white">
              Discover and join our upcoming events that bridge the physical and
              spiritual worlds
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent "
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent  bg-white"
              >
                <option value="all">All Types</option>
                <option value="live">Live Events</option>
                <option value="virtual">Virtual Events</option>
                <option value="in-person">In-Person</option>
                <option value="webinar">Webinars</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent  bg-white"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl  text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 ">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl  text-gray-900">
                  {filteredEvents.length} Event
                  {filteredEvents.length !== 1 ? 's' : ''} Found
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => {
                  const formattedDate = formatDate(event.date);
                  return (
                    <article
                      key={event.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Event Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-sm  rounded-full border ${getBadgeColor(event.badgeType)}`}
                          >
                            {event.badge}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs  rounded-full ${
                              event.status === 'upcoming'
                                ? 'bg-green-100 text-green-800'
                                : event.status === 'ongoing'
                                  ? 'bg-secondary-100 text-secondary-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-6">
                        {/* Date and Time */}
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span className="text-sm text-gray-600 ">
                            {formattedDate.day}, {formattedDate.date}
                          </span>
                          <Clock className="w-4 h-4 text-primary-600 ml-2" />
                          <span className="text-sm text-gray-600 ">
                            {formattedDate.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl  text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700  mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 ">
                            {event.location}
                          </span>
                        </div>

                        {/* Event Details */}
                        <div className="flex items-center justify-between mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 ">
                              {event.registered}/{event.capacity} registered
                            </span>
                          </div>
                          <span className="text-gray-600 ">
                            {event.duration}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs  rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-gray-700">
                            {event.price}
                          </div>
                          <button className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white  text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 cursor-pointer">
                            {event.status === 'upcoming'
                              ? 'Register'
                              : 'View Details'}
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-linear-to-r from-primary-50 to-secondary-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl mb-4">Never Miss an Event</h3>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about upcoming
            events, special workshops, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500"
            />
            <button className="px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
