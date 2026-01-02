import { Helmet } from 'react-helmet-async';
import {
  HeroSection,
  AboutSection,
  PodcastSection,
  EventSection,
  MeetTheMediums,
  TestimonialSection,
  BooksSection,
  CTASection,
  MembershipSection,
} from '../components/sections';

const Home = () => (
  <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <HeroSection />
    <AboutSection />
    <PodcastSection />
    <BooksSection />
    <EventSection />
    <MeetTheMediums />
    <TestimonialSection />
    <CTASection />
    <MembershipSection />
  </>
);

export default Home;
