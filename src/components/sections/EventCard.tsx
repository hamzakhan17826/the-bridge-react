import { Calendar, Clock, ExternalLink, Users } from 'lucide-react';
import type { EventListItem } from '../../types/event';
import { getEventStatusKey, getTagKey } from '../../constants/enums';

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

const getMediumName = (event: EventListItem) => {
  if (event.medium?.firstName || event.medium?.lastName) {
    return `${event.medium?.firstName ?? ''} ${
      event.medium?.lastName ?? ''
    }`.trim();
  }
  return event.medium?.userName || 'The Bridge';
};

export default function EventCard({ event }: { event: EventListItem }) {
  const statusLabel = getEventStatusKey(event.status) ?? 'Upcoming';
  const firstTag = event.tags?.[0] ?? null;
  const tagLabel = firstTag !== null ? getTagKey(firstTag) : null;
  const badgeText = tagLabel ? tagLabel.replace(/_/g, ' ') : statusLabel;
  const formattedDate = formatDate(event.startDateTime);

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 text-sm rounded-full border bg-primary-100 text-primary-800 border-primary-200">
            {badgeText}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
              statusLabel === 'Upcoming'
                ? 'bg-green-100 text-green-800'
                : statusLabel === 'Ongoing'
                  ? 'bg-secondary-100 text-secondary-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {statusLabel.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      <div className="border border-gray-200 p-6 rounded-b-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-primary-600" />
          <span className="text-sm text-gray-600 ">
            {formattedDate.day}, {formattedDate.date}
          </span>
          <Clock className="w-4 h-4 text-primary-600 ml-2" />
          <span className="text-sm text-gray-600 ">{formattedDate.time}</span>
        </div>

        <h3 className="text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
          {event.title}
        </h3>

        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 ">
              {event.currentEnrolled} enrolled
            </span>
          </div>
          <span className="text-gray-600 ">Credits: {event.credits}</span>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-gray-600 ">
            Hosted by {getMediumName(event)}
          </span>
          {event.recordingAvailable && (
            <span className="text-xs bg-primary-50 text-primary-700 rounded-full px-2 py-1">
              Recording Available
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(event.tags || [])
            .map((tag) => getTagKey(tag))
            .filter(Boolean)
            .map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {(tag as string).replace(/_/g, ' ')}
              </span>
            ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {event.enrollmentDeadline
              ? `Enroll by ${formatDate(event.enrollmentDeadline).date}`
              : 'Open enrollment'}
          </div>
          {event.zoomLink ? (
            <a
              href={event.zoomLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 cursor-pointer"
            >
              Join Event
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-lg">
              Details Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
