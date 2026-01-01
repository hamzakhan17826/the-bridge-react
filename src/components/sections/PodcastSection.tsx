import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { PodcastSliderProps, PodcastItem } from '../../types/types';
import { Play, Headphones, Calendar, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PodcastSlider: FC<PodcastSliderProps> = ({
  podcasts,
  title = 'Featured Podcasts',
  subtitle = 'Listen to our latest episodes',
  buttonText = 'View All',
}) => {
  // Default podcast data if none provided
  const defaultPodcasts: PodcastItem[] = [
    {
      id: 1,
      episode: 'ep:1',
      duration: '05:35 Mins',
      date: 'Dec 15th, 2024',
      title: 'Spiritual Awakening Journey',
      image: '/images/podcasts/carousel/1.jpg',
    },
    {
      id: 2,
      episode: 'ep:2',
      duration: '07:20 Mins',
      date: 'Dec 8th, 2024',
      title: 'Connecting with Spirit Guides',
      image: '/images/podcasts/carousel/2.jpg',
    },
    {
      id: 3,
      episode: 'ep:3',
      duration: '04:45 Mins',
      date: 'Dec 1st, 2024',
      title: 'Mediumship Development Tips',
      image: '/images/podcasts/carousel/3.jpg',
    },
    {
      id: 4,
      episode: 'ep:4',
      duration: '06:10 Mins',
      date: 'Nov 24th, 2024',
      title: 'Understanding Energy Healing',
      image: '/images/podcasts/carousel/4.jpg',
    },
    {
      id: 5,
      episode: 'ep:5',
      duration: '08:00 Mins',
      date: 'Nov 17th, 2024',
      title: 'Intuition and Psychic Abilities',
      image: '/images/podcasts/carousel/5.jpg',
    },
  ];

  const items = podcasts && podcasts.length ? podcasts : defaultPodcasts;
  return (
    <div className="relative overflow-hidden pb-12">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-600 via-secondary-600 to-primary-800"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-10 lg:pt-16">
          <div className="flex items-end justify-between mb-10 lg:mb-16">
            <div className="max-w-7xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-4">
                <Headphones className="w-4 h-4" />
                {subtitle}
              </div>
              <h2 className="mb-0 text-4xl md:text-6xl lg:text-7xl text-white font-poppins leading-tight">
                {title.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className={
                      index === title.split(' ').length - 1
                        ? 'bg-linear-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent'
                        : ''
                    }
                  >
                    {word}{' '}
                  </span>
                ))}
              </h2>
            </div>
            <div className="shrink-0">
              <Link
                to="/podcasts"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-primary-50"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {buttonText}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="px-4">
            <div className="overflow-visible">
              <Swiper
                className="podcast-swiper overflow-visible"
                modules={[Pagination]}
                spaceBetween={30}
                grabCursor
                breakpoints={{
                  768: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet tb-bullet',
                  bulletActiveClass:
                    'swiper-pagination-bullet-active tb-bullet-active',
                  renderBullet: (index: number, className: string) => {
                    const num = index + 1;
                    const label = num < 10 ? `${num}` : `${num}`;
                    return `<span class="${className}">${label}</span>`;
                  },
                }}
              >
                {items.map((podcast) => (
                  <SwiperSlide key={podcast.id}>
                    <div className="group relative flex flex-col justify-end min-h-[50vh] mb-6 transform transition-all duration-300 hover:scale-105">
                      {/* Background image with enhanced gradient overlay */}
                      <div
                        className="absolute inset-0 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.8) 100%), url('${podcast.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />

                      {/* Gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent rounded-2xl"></div>

                      {/* Foreground content */}
                      <div className="relative z-10 flex flex-col items-start justify-end p-6">
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Episode {podcast.episode}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm text-white/90">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{podcast.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{podcast.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <button className="group/btn inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                            <Play className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>

                          <div className="flex gap-2">
                            <a
                              href="#"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-primary-700 transition-all duration-300 transform hover:scale-110 shadow-md"
                              title="Listen on Apple Podcasts"
                            >
                              <img
                                src="/images/podcasts/icons/apple-podcast.png"
                                alt="Apple Podcasts"
                                className="w-4 h-4"
                              />
                            </a>
                            <a
                              href="#"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-secondary-700 transition-all duration-300 transform hover:scale-110 shadow-md"
                              title="Listen on Google Podcasts"
                            >
                              <img
                                src="/images/podcasts/icons/google-podcast.png"
                                alt="Google Podcasts"
                                className="w-4 h-4"
                              />
                            </a>
                            <a
                              href="#"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-green-700 transition-all duration-300 transform hover:scale-110 shadow-md"
                              title="Listen on Spotify"
                            >
                              <img
                                src="/images/podcasts/icons/spotify.png"
                                alt="Spotify"
                                className="w-4 h-4"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-2">
                      <h3 className="text-lg font-poppins font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-2 leading-tight">
                        <a
                          href="#"
                          className="text-white hover:underline decoration-primary-500 decoration-2 underline-offset-4"
                        >
                          {podcast.title}
                        </a>
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastSlider;
