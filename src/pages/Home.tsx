import { Helmet } from 'react-helmet-async';
import {
  HeroSection,
  AboutSection,
  PodcastSection,
  EventSection,
  MeetTheMediums,
  TestimonialSection,
  MembershipSection,
  CTASection,
} from '../components/sections';

const Home = () => (
  <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <HeroSection />
    <AboutSection />
    <PodcastSection />
    <EventSection />
    <MeetTheMediums />
    <TestimonialSection />
    <CTASection />
    <MembershipSection />
  </>
);

export default Home;
