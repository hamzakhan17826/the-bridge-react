import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Filter,
  Play,
  Headphones,
  Calendar,
  Clock,
  ExternalLink,
  X,
} from 'lucide-react';
import { Button, Input } from '../components/ui';
import type { PodcastItem } from '../types/content';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import sampleAudio from '../assets/children-tune.mp3';

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [activePodcast, setActivePodcast] = useState<PodcastItem | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Expanded mock data with more podcasts
  const podcasts: PodcastItem[] = [
    {
      id: 1,
      episode: 'ep:1',
      duration: '05:35 Mins',
      date: 'Dec 15th, 2024',
      title: '10 good minutes daily Self-Improvement',
      image: '/images/podcasts/carousel/1.jpg',
    },
    {
      id: 2,
      episode: 'ep:2',
      duration: '07:20 Mins',
      date: 'Dec 8th, 2024',
      title: 'Daily Motivation Boost',
      image: '/images/podcasts/carousel/2.jpg',
    },
    {
      id: 3,
      episode: 'ep:3',
      duration: '04:45 Mins',
      date: 'Dec 1st, 2024',
      title: 'Mindfulness in Minutes',
      image: '/images/podcasts/carousel/3.jpg',
    },
    {
      id: 4,
      episode: 'ep:4',
      duration: '06:10 Mins',
      date: 'Nov 24th, 2024',
      title: 'Productivity Hacks',
      image: '/images/podcasts/carousel/4.jpg',
    },
    {
      id: 5,
      episode: 'ep:5',
      duration: '08:00 Mins',
      date: 'Nov 17th, 2024',
      title: 'Goal Setting Strategies',
      image: '/images/podcasts/carousel/5.jpg',
    },
    {
      id: 6,
      episode: 'ep:6',
      duration: '06:45 Mins',
      date: 'Nov 10th, 2024',
      title: 'Spiritual Awakening Journey',
      image: '/images/podcasts/carousel/1.jpg',
    },
    {
      id: 7,
      episode: 'ep:7',
      duration: '09:15 Mins',
      date: 'Nov 3rd, 2024',
      title: 'Connecting with Spirit Guides',
      image: '/images/podcasts/carousel/2.jpg',
    },
    {
      id: 8,
      episode: 'ep:8',
      duration: '05:50 Mins',
      date: 'Oct 27th, 2024',
      title: 'Mediumship Development Tips',
      image: '/images/podcasts/carousel/3.jpg',
    },
    {
      id: 9,
      episode: 'ep:9',
      duration: '07:30 Mins',
      date: 'Oct 20th, 2024',
      title: 'Understanding Energy Healing',
      image: '/images/podcasts/carousel/4.jpg',
    },
    {
      id: 10,
      episode: 'ep:10',
      duration: '06:20 Mins',
      date: 'Oct 13th, 2024',
      title: 'Intuition and Psychic Abilities',
      image: '/images/podcasts/carousel/5.jpg',
    },
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'duration-asc', label: 'Shortest First' },
    { value: 'duration-desc', label: 'Longest First' },
  ];

  // Split podcasts into internal and external
  const internalPodcasts = podcasts.slice(0, 5);
  // const externalPodcasts = podcasts.slice(5);

  // Filter and sort internal podcasts
  const filteredInternal = internalPodcasts
    .filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.episode.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (selectedSort) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'duration-asc':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'duration-desc':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return 0;
      }
    });

  // Filter and sort external podcasts
  // const filteredExternal = externalPodcasts
  //   .filter(
  //     (podcast) =>
  //       podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       podcast.episode.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     switch (selectedSort) {
  //       case 'newest':
  //         return new Date(b.date).getTime() - new Date(a.date).getTime();
  //       case 'oldest':
  //         return new Date(a.date).getTime() - new Date(b.date).getTime();
  //       case 'duration-asc':
  //         return parseInt(a.duration) - parseInt(b.duration);
  //       case 'duration-desc':
  //         return parseInt(b.duration) - parseInt(a.duration);
  //       default:
  //         return 0;
  //     }
  //   });

  const handlePlay = (podcast: PodcastItem) => {
    setActivePodcast(podcast);
    setIsPlayerOpen(true);
  };

  const PodcastCard = ({ podcast }: { podcast: PodcastItem }) => (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handlePlay(podcast)}
            className="bg-white/90 hover:bg-white text-primary-600 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            <Play className="w-6 h-6 ml-1" />
          </button>
        </div>

        {/* Episode badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            {podcast.episode}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {podcast.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{podcast.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{podcast.date}</span>
          </div>
        </div>

        {/* Listen buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 border border-primary-600 bg-white hover:bg-primary-600 hover:text-white text-primary-600"
            onClick={() => handlePlay(podcast)}
          >
            <Play className="w-4 h-4 mr-2" />
            Listen Now
          </Button>

          <div className="flex gap-1">
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-primary-600 transition-colors"
              title="Listen on Apple Podcasts"
            >
              <img
                src="/images/podcasts/icons/apple-podcast.png"
                alt="Apple Podcasts"
                className="w-4 h-4"
              />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-secondary-600 transition-colors"
              title="Listen on Google Podcasts"
            >
              <img
                src="/images/podcasts/icons/google-podcast.png"
                alt="Google Podcasts"
                className="w-4 h-4"
              />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-green-600 transition-colors"
              title="Listen on Spotify"
            >
              <img
                src="/images/podcasts/icons/spotify.png"
                alt="Spotify"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Podcasts - The Bridge</title>
        <meta
          name="description"
          content="Listen to our spiritual podcasts featuring mediumship, intuition, energy healing, and spiritual development topics."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <Headphones className="w-4 h-4" />
              Spiritual Podcasts
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4 text-white">
              Listen to Our{' '}
              <span className="bg-linear-to-r bg-clip-text">Spiritual </span>
              Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto">
              Discover insights on mediumship, intuition, energy healing, and
              spiritual growth through our curated podcast episodes.
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search episodes or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredInternal.length} of {internalPodcasts.length}{' '}
              episodes
            </div>
          </div>
        </section>

        {/* Featured Audio Player Trigger */}
        <section className="py-10 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Featured Episode
                </h2>
                <p className="text-sm text-gray-600">
                  Click play to open the player at the bottom.
                </p>
              </div>
              <button
                onClick={() =>
                  handlePlay({
                    id: 0,
                    episode: 'featured',
                    duration: '05:35 Mins',
                    date: 'Dec 15th, 2024',
                    title: 'Children Tune',
                    image: '/images/podcasts/carousel/1.jpg',
                  })
                }
                className="h-12 w-12 rounded-full border border-primary-200 bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Open player"
              >
                <Play className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Podcasts Sections */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Internal Podcasts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Podcasts
              </h2>
              {filteredInternal.length > 0 ? (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="podcast-swiper pb-8"
                >
                  {filteredInternal.map((podcast) => (
                    <SwiperSlide key={podcast.id}>
                      <PodcastCard podcast={podcast} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-8">
                  <Headphones className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No internal episodes found.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {filteredInternal.length > 0 && (
          <section className="py-16 bg-linear-to-r from-primary-50 to-secondary-50">
            <div className="container mx-auto px-6 text-center">
              <div className="max-w-3xl mx-auto">
                <Headphones className="w-12 h-12 text-primary-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
                  Subscribe & Follow
                </h2>
                <p className="text-lg text-gray-600 font-lato mb-8">
                  Never miss an episode! Subscribe to our podcast on your
                  favorite platform and join our spiritual community.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3"
                  >
                    <img
                      src="/images/podcasts/icons/apple-podcast.png"
                      alt="Apple Podcasts"
                      className="w-5 h-5 mr-2 filter invert"
                    />
                    Apple Podcasts
                  </Button>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.6-.12-.421.18-.78.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.081zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.42-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781-.18-.601.18-1.2.78-1.381 4.5-1.14 11.28-.86 15.72 1.621.479.3.599 1.02.3 1.5-.3.421-1.021.599-1.5.3z" />
                    </svg>
                    Spotify
                  </Button>
                  <Button
                    size="lg"
                    className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    All Platforms
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {isPlayerOpen && activePodcast && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[min(960px,95vw)] -translate-x-1/2 rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <button
            onClick={() => setIsPlayerOpen(false)}
            className="absolute right-1 top-1 z-10 rounded-full border border-red-500 bg-red-500 p-0.5 text-red-100 hover:text-white hover:border-red-600 hover:bg-red-600 transition-colors"
            aria-label="Close player"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="px-2 py-2">
            <MediaPlayer
              key={activePodcast.id}
              title={activePodcast.title}
              src={sampleAudio}
              autoPlay
              className="w-full"
            >
              <MediaProvider />
              <DefaultAudioLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </div>
        </div>
      )}
    </>
  );
};

export default Podcasts;
