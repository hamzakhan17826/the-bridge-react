import type { FC } from 'react';
import { MediumCard } from '../sections';
import { Link } from 'react-router-dom';
import { Users, Sparkles, ArrowRight } from 'lucide-react';
import { BackgroundDecorations } from '../ui';
import { useMediums } from '../../hooks/useMedium';

const MeetTheMediums: FC = () => {
  const { data: mediums = [], isLoading, isError } = useMediums();

  const backgroundDecorations = [
    {
      top: 'top-20',
      left: 'left-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-primary-200',
      delay: '0s',
    },
    {
      bottom: 'bottom-20',
      right: 'right-10',
      width: 'w-64',
      height: 'h-64',
      color: 'bg-secondary-200',
      delay: '1s',
    },
  ];

  return (
    <section className="py-20 md:pb-28 relative overflow-hidden">
      <BackgroundDecorations decorations={backgroundDecorations} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-secondary-100 text-primary-700 font-poppins font-medium text-sm mb-6">
            <Users className="w-4 h-4" />
            Meet Our Mediums
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Meet the{' '}
            <span className="bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Mediums
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
            Evidential mediums dedicated to clarity, compassion, and connection.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-400 border-t-transparent"></span>
              Loading mediums...
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            Failed to load mediums.
          </div>
        ) : mediums.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No mediums available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mediums.map((medium) => (
              <MediumCard key={medium.id} medium={medium} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/mediums"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            <Sparkles className="w-5 h-5" />
            View All Presenters
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeetTheMediums;
