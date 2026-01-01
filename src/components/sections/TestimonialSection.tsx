import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Quote, Heart, Star } from 'lucide-react';

const TestimonialSection: FC = () => {
  const testimonialSlides = [
    [
      {
        text: 'The Bridge podcasts are incredibly engaging and insightful.',
        name: '@podcastfan1',
        link: '#',
        platform: 'Spotify Listener',
        image: '/images/team/1.jpg',
      },
      {
        text: 'Love the weekly episodes! The Bridge keeps me informed and entertained.',
        name: '@audiophile',
        link: '#',
        platform: 'Apple Podcasts',
        image: '/images/team/2.jpg',
      },
    ],
    [
      {
        text: 'The Bridge has transformed how I consume media. So much value in every episode.',
        name: '@medialover',
        link: '#',
        platform: 'YouTube Subscriber',
        image: '/images/team/4.jpg',
      },
      {
        text: 'Incredible depth and storytelling. The Bridge stands out in the podcast world.',
        name: '@storyteller',
        link: '#',
        platform: 'Podcast Addict',
        image: '/images/team/5.jpg',
      },
    ],
    [
      {
        text: 'Weekly top podcasts from The Bridge are always spot on. Highly recommend!',
        name: '@weeklylistener',
        link: '#',
        platform: 'TuneIn User',
        image: '/images/team/6.jpg',
      },
      {
        text: 'The Bridge connects ideas beautifully. A podcast that educates and inspires.',
        name: '@inspireduser',
        link: '#',
        platform: 'Stitcher Fan',
        image: '/images/team/7.jpg',
      },
    ],
    [
      {
        text: 'Seamless listening experience on The Bridge. Great variety and quality.',
        name: '@qualityseeker',
        link: '#',
        platform: 'Overcast Listener',
        image: '/images/team/8.jpg',
      },
      {
        text: 'The Bridge podcasts are my go-to for relaxation and learning. Fantastic!',
        name: '@relaxedlistener',
        link: '#',
        platform: 'Pocket Casts',
        image: '/images/team/9.jpg',
      },
    ],
    [
      {
        text: 'Innovative and fresh content. The Bridge keeps podcasting exciting.',
        name: '@innovator',
        link: '#',
        platform: 'Castbox User',
        image: '/images/team/10.jpg',
      },
      {
        text: 'The Bridge has built a loyal community. Love the engagement and topics.',
        name: '@communitymember',
        link: '#',
        platform: 'Podbean Fan',
        image: '/images/team/11.jpg',
      },
    ],
    [
      {
        text: 'Top-notch production values. The Bridge sets the standard for podcasts.',
        name: '@productionguru',
        link: '#',
        platform: 'Acast Listener',
        image: '/images/team/12.jpg',
      },
      {
        text: 'Diverse episodes that cater to all interests. The Bridge is versatile.',
        name: '@versatilefan',
        link: '#',
        platform: 'Megaphone User',
        image: '/images/team/13.jpg',
      },
    ],
    [
      {
        text: 'Reliable and consistent quality. The Bridge is my favorite podcast platform.',
        name: '@reliableuser',
        link: '#',
        platform: 'SoundCloud Fan',
        image: '/images/team/15.jpg',
      },
      {
        text: 'The Bridge bridges knowledge gaps perfectly. Essential listening!',
        name: '@knowledgebridge',
        link: '#',
        platform: 'IHeartRadio',
        image: '/images/team/16.jpg',
      },
    ],
    [
      {
        text: 'High-quality production and diverse topics. The Bridge is a must-listen!',
        name: '@contentcreator',
        link: '#',
        platform: 'Google Podcasts',
        image: '/images/team/3.jpg',
      },
      {
        text: "The Bridge podcasts are informative and fun. Can't get enough!",
        name: '@funlearner',
        link: '#',
        platform: 'Libsyn Subscriber',
        image: '/images/team/14.jpg',
      },
    ],
  ];
  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="max-full mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm mb-6">
            <Star className="w-4 h-4" />
            Community Voices
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            What Our{' '}
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Community
            </span>{' '}
            Says
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
            Hear from our listeners, sitters, and mediums about their
            experiences with The Bridge.
          </p>
        </div>

        <div className="w-full">
          <Swiper
            className="testimonial-swiper"
            modules={[FreeMode, Scrollbar]}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode
            grabCursor
            scrollbar={{ draggable: true }}
          >
            {testimonialSlides.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                {slide.map((testimonial, index) => (
                  <div className="testimonial-col group" key={index}>
                    <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
                      {/* Quote icon */}
                      <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Quote className="w-6 h-6 text-white" />
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-700 font-lato leading-relaxed mb-6 pt-4 italic">
                        "{testimonial.text}"
                      </p>

                      {/* User info */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="rounded-full w-12 h-12 object-cover border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
                            width={48}
                            height={48}
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h5 className="mb-1">
                            <a
                              href={testimonial.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-700 hover:text-purple-800 font-poppins font-semibold transition-colors"
                            >
                              {testimonial.name}
                            </a>
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium">
                              <Heart className="w-3 h-3" />
                              {testimonial.platform}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </SwiperSlide>
            ))}
            <div className="swiper-scrollbar" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
