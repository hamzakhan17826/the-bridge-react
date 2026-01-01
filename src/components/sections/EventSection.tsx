import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { BackgroundDecorations } from '../ui';
import { EventCard } from '../sections';

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

  const backgroundDecorations = [
    {
      top: 'top-20',
      right: 'right-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-purple-200',
      delay: '0s',
    },
    {
      bottom: 'bottom-20',
      left: 'left-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-blue-200',
      delay: '1s',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <BackgroundDecorations decorations={backgroundDecorations} />

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
              <EventCard event={event} />
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
