import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Award,
  Star,
  Crown,
} from 'lucide-react';

const MembershipSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-linear-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-secondary-100 text-primary-700 font-poppins font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Membership Plans
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight mb-4">
            Choose Your{' '}
            <span className="bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Spiritual Path
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-lato max-w-3xl mx-auto">
            Join our community and unlock your spiritual potential with our
            carefully crafted membership tiers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* General Medium */}
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100 overflow-hidden">
            {/* Decorative top border */}
            <div className="h-1 bg-linear-to-r from-primary-400 to-secondary-400"></div>

            <div className="p-8">
              {/* Icon and title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-gray-900">
                    General Medium
                  </h3>
                  <p className="text-primary-600 font-medium text-sm">
                    Starter Plan
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-lato leading-relaxed mb-6">
                For sitters & spiritual seekers looking for insight, healing,
                and meaningful connection
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-poppins font-bold text-gray-900">
                  $10
                </span>
                <span className="text-lg text-gray-500 font-lato">/month</span>
              </div>

              {/* CTA Button */}
              <button className="w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Features */}
              <div>
                <h6 className="uppercase tracking-wide text-sm text-gray-600 font-poppins font-bold mb-4">
                  What's Included:
                </h6>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">Full Replay Library</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">10% off ALL events</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      10% off ALL private readings
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">Early registration access</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">Monthly newsletter</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Select Bridge Library resources
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Medium - Popular */}
          <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-primary-300 overflow-hidden scale-105">
            {/* Popular badge */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-linear-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-poppins font-semibold text-sm shadow-lg">
                <Star className="w-4 h-4 inline mr-2" />
                Most Popular
              </div>
            </div>

            {/* Decorative top border */}
            <div className="h-1 bg-linear-to-r from-primary-500 to-secondary-500"></div>

            <div className="p-8 pt-12">
              {/* Icon and title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-gray-900">
                    Development Medium
                  </h3>
                  <p className="text-primary-600 font-medium text-sm">
                    Growth Plan
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-lato leading-relaxed mb-6">
                For developing mediums seeking structure, guided practice,
                confidence, and professional growth
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-poppins font-bold text-gray-900">
                  $19
                </span>
                <span className="text-lg text-gray-500 font-lato">/month</span>
              </div>

              {/* CTA Button */}
              <button className="w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2">
                <span>Start Growing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Features */}
              <div>
                <h6 className="uppercase tracking-wide text-sm text-gray-600 font-poppins font-bold mb-4">
                  Everything in General, plus:
                </h6>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-lato">
                      2 free Development Circles/month
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-lato">
                      Demo eligibility (once verified)
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-lato">
                      10% off additional circles/workshops
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-lato">
                      Development resources in Library
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Medium */}
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100 overflow-hidden">
            {/* Decorative top border */}
            <div className="h-1 bg-linear-to-r from-primary-400 to-secondary-400"></div>

            <div className="p-8">
              {/* Icon and title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold text-gray-900">
                    Professional Medium
                  </h3>
                  <p className="text-primary-600 font-medium text-sm">
                    Professional Plan
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-lato leading-relaxed mb-6">
                For active, serving mediums ready for public visibility,
                professional support, and aligned opportunities
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-poppins font-bold text-gray-900">
                  $29
                </span>
                <span className="text-lg text-gray-500 font-lato">/month</span>
              </div>

              {/* CTA Button */}
              <button className="w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Features */}
              <div>
                <h6 className="uppercase tracking-wide text-sm text-gray-600 font-poppins font-bold mb-4">
                  Everything in Development, plus:
                </h6>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Public Medium Profile Page
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Directory listing in "Meet the Mediums"
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Unlimited demonstration eligibility
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Charity reading requirement
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Full Bridge Library access
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="font-lato">
                      Presenter Tools + booking integration
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white">
            <h2 className="text-4xl ">Professional Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 ">
              For active, serving mediums ready for public visibility,
              professional support, and aligned opportunities.
            </p>
            <div className="flex gap-2 ">
              <span className="text-gray-900 text-3xl align-text-top">$</span>
              <span className="text-gray-900 text-5xl">29</span>
              <span className="text-gray-500 text-lg flex items-end ">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-gray-900 text-white py-2 px-3"
              >
                <span>Join – $29/mo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-sm text-gray-600 font-bold mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Everything in Development</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Public Medium Profile Page</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Directory listing in “Meet the Mediums”</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited demonstration eligibility</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Charity reading requirement</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full Bridge Library access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Presenter Tools + booking integration</span>
                </li>
              </ul>
            </div>
          </div> */}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-lato mb-6">
            Not sure which plan is right for you?{' '}
            <span className="text-primary-600 font-semibold">Contact us</span>{' '}
            for a personalized recommendation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-medium rounded-xl transition-all duration-200 transform hover:scale-105">
              <Award className="w-4 h-4" />
              Compare Plans
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-medium rounded-xl transition-all duration-200 transform hover:scale-105">
              <Sparkles className="w-4 h-4" />
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
