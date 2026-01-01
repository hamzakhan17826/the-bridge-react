import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const Events: FC = () => {
  const events = [
    {
      image: '/images/podcasts/carousel/6.jpg',
      badge: 'Live Podcast Recording',
      date: 'Mon, Feb 12 @ 3:00PM',
      title: 'Bridging Cultures Podcast Live',
      description:
        'Join us for a live recording of our latest episode on cultural bridges in modern society.',
      location: 'Chiang Mai, Thailand',
      type: 'live',
    },
    {
      image: '/images/podcasts/carousel/7.jpg',
      badge: 'Virtual Event',
      date: 'Fri, Mar 5 @ 11:00AM',
      title: 'Podcast Q&A Session',
      description:
        'Interactive Q&A with our podcast hosts about bridging gaps in technology and humanity.',
      location: 'Online',
      type: 'virtual',
    },
    {
      image: '/images/podcasts/carousel/8.jpg',
      badge: 'In-Person Meetup',
      date: 'Fri, Jan 23 @ 5:30PM',
      title: 'The Bridge Fan Meetup',
      description:
        'Meet fellow listeners and discuss your favorite episodes in person.',
      location: 'New York, USA',
      type: 'in-person',
    },
    {
      image: '/images/podcasts/carousel/9.jpg',
      badge: 'Online Webinar',
      date: 'Sat, Apr 10 @ 2:00PM',
      title: 'Podcast Behind the Scenes',
      description:
        'Get insights into how we create content that bridges worlds.',
      location: 'Online',
      type: 'webinar',
    },
  ];

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'virtual':
        return 'bg-blue-500 text-white';
      case 'in-person':
        return 'bg-green-500 text-white';
      case 'webinar':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm mb-6">
            <Calendar className="w-4 h-4" />
            Community Events
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Upcoming{' '}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
            Join our community gatherings, live recordings, and special events
            that bring people together across the spiritual bridge.
          </p>
        </div>

        <Swiper
          className="events-swiper"
          modules={[Pagination]}
          spaceBetween={10}
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet tb-bullet',
            bulletActiveClass:
              'swiper-pagination-bullet-active tb-bullet-active',
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
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
                    <button className="bg-white/90 backdrop-blur-sm text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-105">
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                      {event.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-poppins font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors leading-tight">
                    <a
                      href="#"
                      className="hover:underline decoration-purple-500 decoration-2 underline-offset-4"
                    >
                      {event.title}
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 font-lato leading-relaxed mb-4 grow">
                    {event.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="text-gray-700 font-medium">
                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Events Button */}
        <div className="text-center mt-16">
          <Link
            to="/events"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            <Users className="w-5 h-5" />
            View All Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
