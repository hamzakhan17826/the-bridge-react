import { Clock, MapPin } from 'lucide-react';

interface Event {
  image: string;
  badge: string;
  date: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

interface EventCardProps {
  event: Event;
}

const getBadgeColor = (type: string) => {
  switch (type) {
    case 'live':
      return 'bg-red-500 text-white';
    case 'virtual':
      return 'bg-secondary-500 text-white';
    case 'in-person':
      return 'bg-green-500 text-white';
    case 'webinar':
      return 'bg-primary-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="group h-full flex flex-col rounded-3xl shadow-lg hover:shadow-lg bg-white overflow-hidden transform transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full object-cover object-center h-64 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full shadow-lg ${getBadgeColor(event.type)}`}
          >
            {event.type === 'live' && (
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
            )}
            {event.badge}
          </span>
        </div>

        {/* Hover overlay with action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm text-primary-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
            {event.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 font-lato leading-relaxed mb-4 grow">
          {event.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
          <span className="text-gray-700 font-medium">{event.location}</span>
        </div>
      </div>
    </article>
  );
}
