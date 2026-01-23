import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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
import { useSubscriptionTiers } from '../hooks/useMembership';

const Memberships = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  // React Query hook for data fetching
  const { data: tiers = [], isLoading: tiersLoading } = useSubscriptionTiers();

  // Sort tiers by displayOrder (service already provides fallback data)
  const sortedTiers =
    tiers?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  // Separate paid tiers and free tier
  const paidTiers = sortedTiers.filter(
    (tier) => tier.tierCode !== 'FREETIERMEMBERSHIP'
  );
  const freeTier = sortedTiers.find(
    (tier) => tier.tierCode === 'FREETIERMEMBERSHIP'
  );

  // Helper function to get tier icon
  const getTierIcon = (tierCode: string) => {
    switch (tierCode) {
      case 'GENERALMEMBERSHIP':
        return Users;
      case 'DEVELOPMENTMEDIUM':
        return BookOpen;
      case 'PROFESSIONALMEDIUM':
        return Crown;
      case 'FREETIERMEMBERSHIP':
        return Star;
      default:
        return Users;
    }
  };

  // Helper function to get tier subtitle
  const getTierSubtitle = (tierCode: string) => {
    switch (tierCode) {
      case 'GENERALMEMBERSHIP':
        return 'Starter Plan';
      case 'DEVELOPMENTMEDIUM':
        return 'Growth Plan';
      case 'PROFESSIONALMEDIUM':
        return 'Professional Plan';
      default:
        return 'Plan';
    }
  };

  // Helper function to check if tier is most popular
  const isMostPopular = (tierCode: string) => tierCode === 'DEVELOPMENTMEDIUM';

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

        {/* Billing Toggle Section */}
        <section className="pt-28 pb-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-4 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-poppins font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-poppins font-medium transition-all duration-200 ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-6">
            {tiersLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading membership plans...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {paidTiers.map((tier, index) => {
                  const IconComponent = getTierIcon(tier.tierCode);
                  const price = tier.basePrice;
                  const isPopular = isMostPopular(tier.tierCode);
                  const previousTier = paidTiers[index - 1];

                  return (
                    <div
                      key={tier.id}
                      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border overflow-hidden ${
                        isPopular
                          ? 'border-primary-300 scale-105 shadow-2xl'
                          : 'border-gray-100'
                      }`}
                    >
                      {/* Popular badge */}
                      {isPopular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                          <div className="bg-linear-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full font-poppins font-semibold text-sm shadow-lg">
                            <Star className="w-4 h-4 inline mr-2" />
                            Most Popular
                          </div>
                        </div>
                      )}

                      {/* Decorative top border */}
                      <div
                        className={`h-1 ${
                          isPopular
                            ? 'bg-linear-to-r from-primary-500 to-secondary-500'
                            : 'bg-linear-to-r from-primary-400 to-secondary-400'
                        }`}
                      ></div>

                      <div className={`p-8 ${isPopular ? 'pt-12' : ''}`}>
                        {/* Icon and title */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-linear-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-poppins font-semibold text-gray-900">
                              {tier.tierName}
                            </h3>
                            <p className="text-primary-600 font-medium text-sm mb-0">
                              {getTierSubtitle(tier.tierCode)}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 font-lato leading-relaxed mb-6">
                          {tier.description}
                        </p>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mb-8">
                          <span className="text-4xl font-poppins font-bold text-gray-900">
                            ${price}
                          </span>
                          <span className="text-lg text-gray-500 font-lato">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                          {billingCycle === 'yearly' && (
                            <span className="text-sm text-green-600 font-medium">
                              Save ${Math.round(price * 12 * 0.17)}
                            </span>
                          )}
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => navigate(`/dashboard/membership`)}
                          className={`w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isPopular
                              ? 'bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white focus:ring-primary-400'
                              : 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-400'
                          }`}
                        >
                          <span>
                            {tier.tierCode === 'GENERALMEMBERSHIP'
                              ? 'Join Now'
                              : tier.tierCode === 'DEVELOPMENTMEDIUM'
                                ? 'Start Growing'
                                : 'Join Now'}
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Features */}
                        <div>
                          <h6 className="uppercase tracking-wide text-sm text-gray-600 font-poppins font-bold mb-4">
                            {previousTier
                              ? `Everything in ${previousTier.tierName}, plus:`
                              : "What's Included:"}
                          </h6>
                          <ul className="space-y-3">
                            {tier.features
                              .sort((a, b) => a.displayOrder - b.displayOrder)
                              .map((feature) => (
                                <li
                                  key={feature.id}
                                  className="flex items-start gap-3 text-gray-700"
                                >
                                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                  <span className="font-lato">
                                    {feature.name}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Free Tier Section */}
        {freeTier && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-7xl mx-auto">
                <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-emerald-200 shadow-xl">
                  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Free Badge */}
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-poppins font-bold text-lg shadow-lg">
                          <Sparkles className="w-5 h-5 inline mr-2" />
                          FREE TIER
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Star className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-2">
                            {freeTier.tierName}
                          </h3>
                          <p className="text-emerald-600 font-semibold text-lg">
                            Start Your Spiritual Journey Today
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 font-lato text-lg leading-relaxed mb-6 max-w-2xl">
                        {freeTier.description} Experience our community with no
                        commitment required.
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {freeTier.features
                          .sort((a, b) => a.displayOrder - b.displayOrder)
                          .slice(0, 4) // Show only first 4 features to keep it clean
                          .map((feature) => (
                            <div
                              key={feature.id}
                              className="flex items-center gap-3 text-gray-700"
                            >
                              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                              <span className="font-lato">{feature.name}</span>
                            </div>
                          ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => navigate(`/dashboard/membership`)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                      >
                        <span>Get Started Free</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="shrink-0 hidden lg:block">
                      <div className="relative">
                        <div className="w-32 h-32 bg-linear-to-r from-emerald-200 to-teal-200 rounded-full opacity-30 animate-pulse"></div>
                        <div
                          className="absolute inset-4 bg-linear-to-r from-emerald-300 to-teal-300 rounded-full opacity-50 animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        ></div>
                        <div
                          className="absolute inset-8 bg-linear-to-r from-emerald-400 to-teal-400 rounded-full opacity-70 animate-pulse"
                          style={{ animationDelay: '1s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Sparkles className="w-5 h-5" />
                  Start Free Trial
                </button>
                <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
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
