import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

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
    <section className="block-testimonials-3">
      <div className="content-wrap">
        <div className="container mx-auto">
          <div className="row justify-content-center mb-5">
            <div className="col-xl-6 col-lg-8 text-center">
              <h3 className="mb-4 text-4xl md:text-6xl font-grotesk-bold">
                Testimonials
              </h3>
              <h5 className="text-uppercase ls-2 op-07 font-grotesk-medium">
                ❤️ What Our Customers Say About Us ❤️
              </h5>
            </div>
          </div>
        </div>
        <section className="swiper_wrapper h-auto mb-20">
          <Swiper
            className="testimonial-swiper"
            modules={[FreeMode, Scrollbar]}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode
            grabCursor
            scrollbar={{ draggable: true }}
          >
            {testimonialSlides.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                {slide.map((testimonial, index) => (
                  <div className="testimonial-col" key={index}>
                    <p>{testimonial.text}</p>
                    <div className="flex items-start">
                      <img
                        src={testimonial.image}
                        alt="User"
                        className="rounded-full w-10 h-10"
                        width={40}
                        height={40}
                      />
                      <div className="ms-3">
                        <h5 className="mb-0">
                          <a
                            href={testimonial.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-bold"
                          >
                            {testimonial.name}
                          </a>
                        </h5>
                        <h6 className="fw-normal mb-0 op-06 ">
                          {testimonial.platform}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </SwiperSlide>
            ))}
            <div className="swiper-scrollbar" />
          </Swiper>
        </section>
      </div>
    </section>
  );
};

export default TestimonialSection;
