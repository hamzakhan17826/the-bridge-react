import type { FC } from 'react';
import { MediumCard } from '../sections';
import { Link } from 'react-router-dom';
import { Users, Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';
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
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary-100 bg-white/90 p-10 text-center shadow-sm">
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary-100/60 blur-2xl"></div>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary-100/60 blur-2xl"></div>
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
              Meet Our Mediums
            </h3>
            <p className="text-base text-gray-600 font-lato mb-6">
              Our presenter lineup is being refreshed. Please check back soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary-200 bg-white px-6 py-3 text-primary-700 font-poppins font-semibold hover:bg-primary-50 transition-colors"
              >
                Join as a Medium
                <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : mediums.length === 0 ? (
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gray-100 bg-white/90 p-10 text-center shadow-sm">
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary-100/60 blur-2xl"></div>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-secondary-100/60 blur-2xl"></div>
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-2">
              No Mediums Yet
            </h3>
            <p className="text-base text-gray-600 font-lato mb-6">
              We are curating our first group of presenters. If you are a
              medium, you can register now and be featured here.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 text-white font-poppins font-semibold shadow-md hover:bg-primary-700 transition-colors"
            >
              Register as a Medium
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mediums.map((medium) => (
              <MediumCard key={medium.id} medium={medium} />
            ))}
          </div>
        )}

        {!isLoading && !isError && mediums.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default MeetTheMediums;
