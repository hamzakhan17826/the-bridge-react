import { useState, useMemo } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useEvents } from '../hooks/useEvent';
import {
  EventStatus,
  Tags,
  getEventStatusKey,
  getTagKey,
} from '../constants/enums';
import { EventCard } from '../components/sections';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const { data: events = [], isLoading, isError } = useEvents();

  const statusOptions = useMemo(
    () =>
      [{ label: 'All Status', value: 'all' }].concat(
        Object.keys(EventStatus).map((key) => ({
          label: key.replace(/_/g, ' '),
          value: key,
        }))
      ),
    []
  );

  const tagOptions = useMemo(
    () =>
      [{ label: 'All Tags', value: 'all' }].concat(
        Object.keys(Tags).map((key) => ({
          label: key.replace(/_/g, ' '),
          value: key,
        }))
      ),
    []
  );

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => event.isPublic)
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.tags || [])
            .map((tag) => getTagKey(tag))
            .filter(Boolean)
            .some((tag) =>
              (tag as string).toLowerCase().includes(searchTerm.toLowerCase())
            );

        const statusKey = getEventStatusKey(event.status);
        const matchesStatus =
          selectedStatus === 'all' || statusKey === selectedStatus;

        const matchesTag =
          selectedTag === 'all' ||
          (event.tags || [])
            .map((tag) => getTagKey(tag))
            .filter(Boolean)
            .some((tag) => tag === selectedTag);

        return matchesSearch && matchesStatus && matchesTag;
      });
  }, [events, searchTerm, selectedStatus, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-linear-to-r from-primary-900 to-secondary-900 text-white py-20">
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent  bg-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent  bg-white"
              >
                {tagOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20 text-gray-600">
              Loading events...
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-600">
              Unable to load events right now.
            </div>
          ) : filteredEvents.length === 0 ? (
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
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
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
