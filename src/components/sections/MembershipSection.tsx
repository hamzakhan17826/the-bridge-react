import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Star,
  Crown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptionTiers } from '../../hooks/useMembership';
import BillingToggle from '../BillingToggle';
import { useState } from 'react';

const MembershipSection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const { data: tiers, isLoading, error } = useSubscriptionTiers();

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
  const displayTiers = freeTier ? [freeTier, ...paidTiers] : paidTiers;

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
      case 'FREETIERMEMBERSHIP':
        return 'Free Plan';
      default:
        return 'Plan';
    }
  };

  // Helper function to check if tier is most popular
  const isMostPopular = (tierCode: string) => tierCode === 'DEVELOPMENTMEDIUM';

  if (isLoading && !tiers) {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading membership plans...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && (!tiers || tiers.length === 0)) {
    // Still show dummy data even on error, but could show a warning
    console.warn('Failed to load membership plans from API, showing demo data');
  }
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

      <div className="container mx-auto px-6 relative z-10">
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

        <BillingToggle
          billingCycle={billingCycle}
          onChange={setBillingCycle}
          className="pt-5!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayTiers.map((tier, index) => {
            const IconComponent = getTierIcon(tier.tierCode);
            const isPopular = isMostPopular(tier.tierCode);
            const previousTier = displayTiers[index - 1];
            const isFree =
              tier.tierCode === 'FREETIERMEMBERSHIP' || tier.basePrice <= 0;
            const monthlyPrice = Math.round(tier.basePrice);
            const yearlyListPrice = Math.round(tier.basePrice * 12);
            const yearlyDiscountPrice = Math.round(tier.basePrice * 12 * 0.83);
            const yearlySavings = Math.round(tier.basePrice * 12 * 0.17);

            return (
              <div
                key={tier.id}
                className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${
                  isPopular
                    ? 'border-primary-300 scale-105'
                    : 'border-primary-100'
                } overflow-hidden`}
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
                  className={`h-1 bg-linear-to-r ${
                    isPopular
                      ? 'from-primary-500 to-secondary-500'
                      : 'from-primary-400 to-secondary-400'
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
                    {!isFree && billingCycle === 'yearly' && (
                      <span className="relative text-2xl text-gray-400 font-lato inline-block">
                        ${yearlyListPrice}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform -rotate-12 origin-center"></div>
                      </span>
                    )}
                    {isFree ? (
                      <span className="text-4xl font-poppins font-bold text-gray-900">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-poppins font-bold text-gray-900">
                          $
                          {billingCycle === 'monthly'
                            ? monthlyPrice
                            : yearlyDiscountPrice}
                        </span>
                        <span className="text-lg text-gray-500 font-lato">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </>
                    )}
                    {!isFree && billingCycle === 'yearly' && (
                      <span className="text-sm text-green-600 font-medium">
                        Save ${yearlySavings}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/dashboard/membership')}
                    className={`w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isFree
                        ? 'bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white focus:ring-emerald-400'
                        : isPopular
                          ? 'bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white focus:ring-primary-400'
                          : 'bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-400'
                    }`}
                  >
                    <span>
                      {tier.tierCode === 'FREETIERMEMBERSHIP'
                        ? 'Get Started Free'
                        : tier.tierCode === 'GENERALMEMBERSHIP'
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
                            <span className="font-lato">{feature.name}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Tier Section and don't remove this freeTier section as I will show it later */}
        {/* {freeTier && (
          <div className="mt-16 max-w-7xl mx-auto">
            <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-emerald-200 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
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

                  <button
                    onClick={() => navigate('/dashboard/membership')}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

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
        )} */}

        {/* Bottom CTA and don't remove this freeTier section as I will show it later */}
        {/* <div className="text-center mt-16">
          <p className="text-gray-600 font-lato mb-6">
            Not sure which plan is right for you?{' '}
            <Link to="/contact" className="text-primary-600 font-semibold">
              Contact us
            </Link>{' '}
            for a personalized recommendation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard/membership')}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white font-poppins font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Award className="w-4 h-4" />
              Compare Plans
            </button>
            <button
              onClick={() => navigate('/dashboard/membership')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-poppins font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              Start Free Trial
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default MembershipSection;
