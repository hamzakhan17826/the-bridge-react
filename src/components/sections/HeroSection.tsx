import { Link } from 'react-router-dom';
import { Users, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { BackgroundDecorations, StatCard } from '../ui';

export default function HeroSection() {
  const backgroundDecorations = [
    {
      top: 'top-20',
      left: 'left-10',
      width: 'w-72',
      height: 'h-72',
      color: 'bg-primary-200',
      delay: '0s',
    },
    {
      top: 'top-40',
      right: 'right-10',
      width: 'w-72',
      height: 'h-72',
      color: 'bg-secondary-200',
      delay: '1s',
    },
    {
      bottom: 'bottom-20',
      left: 'left-1/2',
      width: 'w-72',
      height: 'h-72',
      color: 'bg-primary-200',
      delay: '2s',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <BackgroundDecorations decorations={backgroundDecorations} />
      </div>

      <div className="relative container mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text & Actions */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-secondary-100 text-primary-700 font-poppins font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                Bridging Two Worlds
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-poppins">
                A modern stage where{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 font-playfair italic font-semibold bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    mediums
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-linear-to-r from-primary-200 to-secondary-200 rounded-lg -z-10"></div>
                </span>{' '}
                rise together
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 font-lato leading-relaxed max-w-lg">
                The Bridge is a sacred space where sitters, developing mediums,
                and professional mediums connect with spirit through evidence,
                healing, and community.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 font-poppins font-semibold rounded-2xl transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Join Membership
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
              <StatCard icon={Users} number="137K" label="Active Listeners" />
              <StatCard icon={Heart} number="2.1M" label="Community Members" />
            </div>
          </div>

          {/* Right: Enhanced Visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://plus.unsplash.com/premium_photo-1663100390144-4056139c1af1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Spiritual community gathering - seniors holding hands in prayer circle"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  width={600}
                  height={600}
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-linear-to-r from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-linear-to-r from-secondary-400 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: '1s' }}
                >
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Background Cards */}
              <div className="absolute -top-8 -left-8 w-full h-full bg-linear-to-r from-primary-100 to-secondary-100 rounded-3xl -z-10 transform rotate-3"></div>
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-linear-to-r from-secondary-100 to-primary-100 rounded-3xl -z-20 transform -rotate-3"></div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary-400 to-secondary-400 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-secondary-400 to-primary-400 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white">B</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary-400 to-pink-400 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white">C</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 font-lato">
                <span className="font-semibold text-gray-900">500+</span> active
                members
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
