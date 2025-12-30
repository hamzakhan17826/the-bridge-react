import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { PodcastSliderProps } from '../../types/types';

const PodcastSlider: FC<PodcastSliderProps> = ({
  podcasts,
  title,
  subtitle,
  buttonText,
}) => {
  const items = podcasts && podcasts.length ? podcasts : [];
  return (
    <div
      className="mb-24"
      style={{
        background:
          'linear-gradient(to bottom, var(--color-primary) 60%, #fff 60%)',
      }}
    >
      <div className="container mx-auto px-6 pt-10 lg:pt-16">
        <div className="flex items-end justify-between mb-10 lg:mb-16">
          <div className="max-w-7xl">
            <div className="text-lg opacity-80 mb-3 font-grotesk-light text-white">
              {subtitle}
            </div>
            <h2 className="mb-0 text-4xl md:text-6xl text-white">{title}</h2>
          </div>
          <div className="shrink-0">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-primary font-grotesk-medium shadow-sm hover:shadow"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="px-4">
          <div className="overflow-visible">
            <Swiper
              className="podcast-swiper overflow-visible"
              modules={[Pagination]}
              spaceBetween={40}
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
                  <div className="relative flex flex-col justify-end min-h-[50vh]">
                    {/* Background image with gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%), url('${podcast.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    {/* Foreground content */}
                    <div className="relative z-10 flex flex-col items-start justify-end p-4">
                      <h3 className="mb-2">
                        <a
                          href="#"
                          className="text-white text-6xl font-grotesk-bold"
                        >
                          {podcast.episode}
                        </a>
                      </h3>
                      <div className="mb-3 text-sm opacity-90 text-white">
                        <span>{podcast.duration}</span>
                        <span className="mx-2 opacity-60">&middot;</span>
                        <span>{podcast.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <a
                          href="#"
                          className="mr-2 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white w-7 h-7"
                        >
                          <span className="text-xs text-gray-900">▶</span>
                        </a>
                        <a
                          href="#"
                          className="mr-2 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white w-7 h-7"
                        >
                          <img
                            src="/images/podcasts/icons/apple-podcast.png"
                            alt="Apple"
                            className="w-3.5 h-3.5"
                          />
                        </a>
                        <a
                          href="#"
                          className="mr-2 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white w-7 h-7"
                        >
                          <img
                            src="/images/podcasts/icons/google-podcast.png"
                            alt="Google"
                            className="w-3.5 h-3.5"
                          />
                        </a>
                        <a
                          href="#"
                          className="mr-2 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white w-7 h-7"
                        >
                          <img
                            src="/images/podcasts/icons/spotify.png"
                            alt="Spotify"
                            className="w-3.5 h-3.5"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-0 p-3 text-gray-900">
                    <a href="#" className="text-gray-900 font-grotesk-bold">
                      {podcast.title}
                    </a>
                  </h3>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastSlider;
