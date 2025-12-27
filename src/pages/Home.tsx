import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/ui/HeroSection';
import AboutSection from '../components/ui/AboutSection';
import PodcastSlider from '../components/ui/PodcastSection';
import type { PodcastItem } from '../types/types';
import EventsSection from '../components/ui/EventSection';
import TestimonialSection from '../components/ui/TestimonialSection';
import MembershipSection from '../components/ui/MembershipSection';
import CallToAction from '../components/ui/CTASection';

const podcasts: PodcastItem[] = [
  {
    id: 1,
    episode: 'ep:1',
    duration: '05:35 Mins',
    date: 'Oct 2nd, 2022',
    title: '10 good minutes daily Self-Improvement',
    image: '/images/podcasts/carousel/1.jpg',
  },
  {
    id: 2,
    episode: 'ep:2',
    duration: '07:20 Mins',
    date: 'Oct 9th, 2022',
    title: 'Daily Motivation Boost',
    image: '/images/podcasts/carousel/2.jpg',
  },
  {
    id: 3,
    episode: 'ep:3',
    duration: '04:45 Mins',
    date: 'Oct 16th, 2022',
    title: 'Mindfulness in Minutes',
    image: '/images/podcasts/carousel/3.jpg',
  },
  {
    id: 4,
    episode: 'ep:4',
    duration: '06:10 Mins',
    date: 'Oct 23rd, 2022',
    title: 'Productivity Hacks',
    image: '/images/podcasts/carousel/4.jpg',
  },
  {
    id: 5,
    episode: 'ep:5',
    duration: '08:00 Mins',
    date: 'Oct 30th, 2022',
    title: 'Goal Setting Strategies',
    image: '/images/podcasts/carousel/5.jpg',
  },
];

const Home = () => (
  <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <HeroSection />
    <AboutSection />
    <PodcastSlider
      podcasts={podcasts}
      title="Featured Podcasts"
      subtitle="Listen to our latest episodes"
      buttonText="View All"
    />
    <EventsSection />
    <TestimonialSection />
    <MembershipSection />
    <CallToAction />
  </>
);

export default Home;
