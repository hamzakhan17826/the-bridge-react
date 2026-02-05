import { useMemo, type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { BackgroundDecorations } from '../ui';
import { EventCard } from '../sections';
import { useEvents } from '../../hooks/useEvent';

const Events: FC = () => {
  const { data: events = [], isLoading, isError } = useEvents();

  const publicUpcomingEvents = useMemo(
    () =>
      events
        .filter((event) => event.isPublic)
        .sort(
          (a, b) =>
            new Date(a.startDateTime).getTime() -
            new Date(b.startDateTime).getTime()
        )
        .slice(0, 6),
    [events]
  );

  const backgroundDecorations = [
    {
      top: 'top-20',
      right: 'right-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-primary-200',
      delay: '0s',
    },
    {
      bottom: 'bottom-20',
      left: 'left-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-secondary-200',
      delay: '1s',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <BackgroundDecorations decorations={backgroundDecorations} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-secondary-100 text-primary-700 font-poppins font-medium text-sm mb-6">
            <Calendar className="w-4 h-4" />
            Community Events
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Upcoming{' '}
            <span className="bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
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
          {isLoading && (
            <SwiperSlide>
              <div className="h-full flex items-center justify-center rounded-3xl border border-dashed border-primary-200 bg-white/70 p-10 text-center text-sm text-gray-600">
                Loading events...
              </div>
            </SwiperSlide>
          )}
          {isError && (
            <SwiperSlide>
              <div className="h-full flex items-center justify-center rounded-3xl border border-dashed border-red-200 bg-white/70 p-10 text-center text-sm text-red-600">
                Unable to load events right now.
              </div>
            </SwiperSlide>
          )}
          {!isLoading && !isError && publicUpcomingEvents.length === 0 && (
            <SwiperSlide>
              <div className="h-full flex items-center justify-center rounded-3xl border border-dashed border-primary-200 bg-white/70 p-10 text-center text-sm text-gray-600">
                No public events yet.
              </div>
            </SwiperSlide>
          )}
          {publicUpcomingEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Events Button */}
        <div className="text-center mt-16">
          <Link
            to="/events"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
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
