import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Award } from 'lucide-react';
import MembershipSection from '../components/sections/MembershipSection';

const Memberships = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Membership Plans - The Bridge</title>
        <meta
          name="description"
          content="Choose from our carefully crafted membership tiers designed to support your spiritual journey and development as a medium."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-900 to-secondary-900  text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-poppins font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Membership Plans
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins text-white leading-tight mb-4">
              Choose Your{' '}
              <span className="bg-linear-to-r bg-clip-text">
                Spiritual Path
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-lato max-w-3xl mx-auto mb-8">
              Join our community and unlock your spiritual potential with our
              carefully crafted membership tiers designed for every stage of
              your journey.
            </p>
          </div>
        </section>

        <MembershipSection />

        {/* FAQ Section */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 font-lato">
                  Everything you need to know about our membership plans
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                    Can I change my membership plan at any time?
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Yes! You can upgrade or downgrade your membership at any
                    time. Changes take effect immediately, and we'll prorate any
                    billing adjustments.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                    Is there a free trial available?
                  </h3>
                  <p className="text-gray-600 font-lato">
                    We offer a 7-day free trial for all membership plans. No
                    credit card required to start. Cancel anytime during the
                    trial period.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600 font-lato">
                    We accept all major credit cards, PayPal, and bank
                    transfers. All payments are processed securely through our
                    encrypted payment system.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                    Can I pause my membership?
                  </h3>
                  <p className="text-gray-600 font-lato">
                    Yes, you can pause your membership for up to 3 months per
                    year. During the pause period, you'll retain access to your
                    profile but won't be billed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-linear-to-r from-primary-50 to-secondary-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Ready to Begin Your Spiritual Journey?
              </h2>
              <p className="text-lg text-gray-600 font-lato mb-8 max-w-2xl mx-auto">
                Join our community of spiritual seekers and start your
                transformation today. Choose the plan that resonates with your
                current path and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/dashboard/membership')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </button>
                <button
                  onClick={() => navigate('/dashboard/membership')}
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Award className="w-5 h-5" />
                  Compare Plans
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required • Cancel anytime • 7-day free trial
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Memberships;
