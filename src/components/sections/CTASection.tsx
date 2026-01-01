import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Sparkles, ArrowRight, Calendar, Users, Heart } from 'lucide-react';
import { submitContactFormObject } from '../../services/contact-us';

const CallToAction = () => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const interestRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const interest = interestRef.current?.value;

    if (!name || !email || !interest) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const result = await submitContactFormObject({
      name,
      email,
      subject: 'Book a Reading',
      message: interest,
    });
    setLoading(false);

    if (result.success) {
      toast.success(
        'Your booking request has been sent successfully! We will contact you soon.'
      );
      // Reset form
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (interestRef.current) interestRef.current.value = '';
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-linear-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-100 to-blue-100 text-purple-700 font-poppins font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              Join Our Community
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-poppins leading-tight">
              Ready to Connect with the{' '}
              <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Spirit World
              </span>
              ?
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 font-lato leading-relaxed max-w-lg">
              Join our community of seekers and mediums to deepen your spiritual
              journey and access exclusive resources, events, and connections.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                <Users className="w-5 h-5" />
                Join Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-poppins font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                <Heart className="w-5 h-5" />
                Learn More
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600 font-lato">
                  500+ Members
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 font-lato">
                  Weekly Events
                </span>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div className="relative">
            {/* Floating decorative element */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-linear-to-r from-purple-200 to-blue-200 rounded-3xl -z-10 transform rotate-12 opacity-60 animate-pulse"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-linear-to-r from-purple-500 to-blue-500 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-white">
                    Book a Reading
                  </h3>
                </div>
                <p className="text-purple-100 font-lato">
                  Connect with experienced mediums today
                </p>
              </div>

              <div className="p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        className="w-full rounded-xl bg-gray-50 border-2 border-gray-200 p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-lato"
                        placeholder="Enter your full name"
                      />
                      <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        ref={emailRef}
                        type="email"
                        required
                        className="w-full rounded-xl bg-gray-50 border-2 border-gray-200 p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-lato"
                        placeholder="your.email@example.com"
                      />
                      <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                      Your Interest
                    </label>
                    <div className="relative">
                      <select
                        ref={interestRef}
                        required
                        className="w-full rounded-xl bg-gray-50 border-2 border-gray-200 p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-lato appearance-none"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your interest
                        </option>
                        <option value="spiritual-development">
                          Spiritual Development
                        </option>
                        <option value="mediumship-training">
                          Mediumship Training
                        </option>
                        <option value="private-reading">Private Reading</option>
                        <option value="community-events">
                          Community Events
                        </option>
                        <option value="healing-session">Healing Session</option>
                      </select>
                      <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-poppins font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Book Your Session
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Additional info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 font-lato text-center">
                    ✨ Free initial consultation • 📞 Follow-up within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
