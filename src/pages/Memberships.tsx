import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Award,
  Star,
  Crown,
  Shield,
  Heart,
  Zap,
} from 'lucide-react';

const Memberships = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const plans = [
    {
      id: 'general',
      name: 'General Medium',
      subtitle: 'Starter Plan',
      icon: Users,
      description:
        'For sitters & spiritual seekers looking for insight, healing, and meaningful connection',
      monthlyPrice: 10,
      yearlyPrice: 100,
      popular: false,
      features: [
        'Full Replay Library',
        '10% off ALL events',
        '10% off ALL private readings',
        'Early registration access',
        'Monthly newsletter',
        'Select Bridge Library resources',
      ],
    },
    {
      id: 'development',
      name: 'Development Medium',
      subtitle: 'Growth Plan',
      icon: BookOpen,
      description:
        'For developing mediums seeking structure, guided practice, confidence, and professional growth',
      monthlyPrice: 19,
      yearlyPrice: 190,
      popular: true,
      features: [
        'Everything in General Medium',
        '2 free Development Circles/month',
        'Demo eligibility (once verified)',
        '10% off additional circles/workshops',
        'Development resources in Library',
        'Priority support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional Medium',
      subtitle: 'Professional Plan',
      icon: Crown,
      description:
        'For active, serving mediums ready for public visibility, professional support, and aligned opportunities',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      features: [
        'Everything in Development Medium',
        'Public Medium Profile Page',
        'Directory listing in "Meet the Mediums"',
        'Unlimited demonstration eligibility',
        'Charity reading requirement',
        'Full Bridge Library access',
        'Presenter Tools + booking integration',
        'Professional networking opportunities',
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description:
        'Your spiritual journey is protected with enterprise-grade security and privacy measures.',
    },
    {
      icon: Heart,
      title: 'Community Support',
      description:
        'Connect with like-minded individuals and build lasting relationships in our supportive community.',
    },
    {
      icon: Zap,
      title: 'Continuous Growth',
      description:
        'Access to ongoing education, workshops, and resources to support your spiritual development.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description:
        'Learn from experienced mediums and spiritual teachers through exclusive content and events.',
    },
  ];

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
        <section className="pb-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const price =
                  billingCycle === 'monthly'
                    ? plan.monthlyPrice
                    : plan.yearlyPrice;

                return (
                  <div
                    key={plan.id}
                    className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border overflow-hidden ${
                      plan.popular
                        ? 'border-primary-300 scale-105 shadow-2xl'
                        : 'border-gray-100'
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
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
                        plan.popular
                          ? 'bg-linear-to-r from-primary-500 to-secondary-500'
                          : 'bg-linear-to-r from-primary-400 to-secondary-400'
                      }`}
                    ></div>

                    <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                      {/* Icon and title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            plan.popular
                              ? 'bg-linear-to-r from-primary-500 to-secondary-500'
                              : 'bg-linear-to-r from-primary-400 to-secondary-400'
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-poppins font-semibold text-gray-900">
                            {plan.name}
                          </h3>
                          <p className="text-primary-600 font-medium text-sm">
                            {plan.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 font-lato leading-relaxed mb-6">
                        {plan.description}
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
                            Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full group mb-8 inline-flex items-center justify-center gap-3 px-6 py-4 font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          plan.popular
                            ? 'bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white focus:ring-primary-400'
                            : 'bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white focus:ring-gray-400'
                        }`}
                      >
                        <span>
                          {plan.popular ? 'Start Growing' : 'Join Now'}
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Features */}
                      <div>
                        <h6 className="uppercase tracking-wide text-sm text-gray-600 font-poppins font-bold mb-4">
                          What's Included:
                        </h6>
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                              <span className="font-lato">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
                Why Choose{' '}
                <span className="bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  The Bridge
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-lato max-w-3xl mx-auto">
                Join thousands of spiritual seekers who have found their path
                through our comprehensive membership community and resources.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-linear-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 font-lato leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
