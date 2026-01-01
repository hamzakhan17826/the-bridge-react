import { Play, Calendar, Clock } from 'lucide-react';
import type { PodcastItem } from '../../types/types';

interface PodcastCardProps {
  podcast: PodcastItem;
}

export default function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <div className="relative group h-full flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-xl bg-white transform transition-all duration-300 hover:-translate-y-1">
      {/* Background Image */}
      <div className="relative overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full object-cover object-center h-64 group-hover:scale-110 transition-transform duration-500"
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
            </div>
          </div>

          <h3 className="text-xl font-poppins font-bold text-white mb-2 leading-tight">
            {podcast.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
