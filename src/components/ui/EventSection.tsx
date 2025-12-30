import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
    },
    {
      image: '/images/podcasts/carousel/7.jpg',
      badge: 'Virtual Event',
      date: 'Fri, Mar 5 @ 11:00AM',
      title: 'Podcast Q&A Session',
      description:
        'Interactive Q&A with our podcast hosts about bridging gaps in technology and humanity.',
      location: 'Online',
    },
    {
      image: '/images/podcasts/carousel/8.jpg',
      badge: 'In-Person Meetup',
      date: 'Fri, Jan 23 @ 5:30PM',
      title: 'The Bridge Fan Meetup',
      description:
        'Meet fellow listeners and discuss your favorite episodes in person.',
      location: 'New York, USA',
    },
    {
      image: '/images/podcasts/carousel/9.jpg',
      badge: 'Online Webinar',
      date: 'Sat, Apr 10 @ 2:00PM',
      title: 'Podcast Behind the Scenes',
      description:
        'Get insights into how we create content that bridges worlds.',
      location: 'Online',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-center mb-8 text-3xl md:text-6xl font-grotesk-bold">
          Upcoming Events
        </h3>

        <Swiper
          className="events-swiper"
          modules={[Pagination]}
          spaceBetween={24}
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <article className="h-full flex flex-col rounded-2xl shadow-sm hover:shadow p-3 bg-white">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full object-cover object-center h-96"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-white text-gray-900 shadow">
                      {event.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-1">
                    <span className="uppercase tracking-wide text-xs text-gray-600 font-grotesk-light">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="">
                    <a href="#" className="text-gray-900 font-grotesk-bold">
                      {event.title}
                    </a>
                  </h3>
                  <p className="my-3 text-gray-700 font-grotesk-light">
                    {event.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 text-gray-700 font-grotesk-medium">
                    <span className="mr-1">📍</span>
                    {event.location}
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Events;
