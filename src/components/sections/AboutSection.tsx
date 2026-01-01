import CountUp from 'react-countup';
import { Users, BookOpen, Award, Heart, Sparkles } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="bg-linear-to-br from-purple-50 via-white to-blue-50 m-0 relative py-24 lg:pb-44">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                About The Bridge
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-poppins">
                Where the{' '}
                <span className="relative inline-block">
                  <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    seen
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-purple-200 to-blue-200 rounded-full"></div>
                </span>{' '}
                meets the unseen
              </h2>
            </div>

            <p className="text-lg md:text-xl text-gray-600 font-lato leading-relaxed">
              <strong className="text-purple-700">The Bridge</strong> is a
              modern digital platform for evidential mediumship, spiritual
              development, and community connection. It serves three core groups
              who come together in sacred space.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                <div className="shrink-0 w-12 h-12 bg-linear-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                    Sitters
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Book readings, attend live demonstrations, and access event
                    replays for spiritual guidance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div className="shrink-0 w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                    Developing Mediums
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Build skills through circles, workshops, and mentorship in a
                    supportive community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                <div className="shrink-0 w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-900 mb-1">
                    Professional Mediums
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Showcase services, grow your client base, and connect with a
                    like-minded community.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Heart className="w-5 h-5" />
                Learn More About Us
              </button>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 flex justify-center items-center">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-linear-to-r from-purple-200 to-blue-200 rounded-3xl -z-10 transform rotate-12 opacity-60"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-linear-to-r from-blue-200 to-purple-200 rounded-3xl -z-10 transform -rotate-12 opacity-60"></div>

              <div className="relative rounded-full h-80 w-80 border-2 border-purple-100 lg:h-105 lg:w-105 bg-white shadow-2xl">
                <div className="w-90 h-90 -ml-5 -mt-5 lg:w-120 lg:h-120 lg:-ml-7.5 lg:-mt-7.5">
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <div className="rounded-2xl min-w-24 min-h-24 lg:min-w-32 lg:min-h-32 p-3 lg:p-4 bg-linear-to-r from-purple-500 to-blue-500 shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-white lg:text-3xl font-bold font-poppins">
                            <CountUp start={1} end={500} duration={2} />
                          </div>
                          <p className="font-semibold text-purple-100 mb-0 text-sm">
                            Mediums
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full flex-col justify-between">
                      <div className="rounded-2xl min-w-24 min-h-24 lg:min-w-32 lg:min-h-32 p-3 lg:p-4 bg-linear-to-r from-blue-500 to-purple-500 shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-white lg:text-3xl font-bold font-poppins">
                            <CountUp start={1} end={2000} duration={1.4} />
                          </div>
                          <p className="font-semibold text-blue-100 mb-0 text-sm">
                            Sitters
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl min-w-24 min-h-24 lg:min-w-32 lg:min-h-32 p-3 lg:p-4 bg-linear-to-r from-red-500 to-pink-500 shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-white lg:text-3xl font-bold font-poppins">
                            <CountUp start={1} end={150} duration={2.1} />
                          </div>
                          <p className="font-semibold text-red-100 mb-0 text-sm">
                            Events
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl min-w-24 min-h-24 lg:min-w-32 lg:min-h-32 p-3 lg:p-4 bg-linear-to-r from-amber-500 to-orange-500 shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-white lg:text-3xl font-bold font-poppins">
                            <CountUp start={1} end={5000} duration={2.4} />
                          </div>
                          <p className="font-semibold text-amber-100 mb-0 text-sm">
                            Members
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="rounded-2xl min-w-24 min-h-24 lg:min-w-32 lg:min-h-32 p-3 lg:p-4 bg-linear-to-r from-purple-500 to-blue-500 shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-white lg:text-3xl font-bold font-poppins">
                            <CountUp start={1} end={1000} duration={2.4} />
                          </div>
                          <p className="font-semibold text-purple-100 mb-0 text-sm">
                            Replays
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
