import type { FC } from 'react';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';
import { submitContactFormObject } from '../../services/contact-us';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  const year = new Date().getFullYear();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setLoading(true);
    const result = await submitContactFormObject({
      name: 'Newsletter Subscriber',
      email,
      subject: 'Newsletter Subscription',
      message: 'Subscribe to newsletter',
    });
    setLoading(false);

    if (result.success) {
      toast.success(
        'Subscribed to newsletter successfully! Stay tuned for updates.'
      );
      if (emailRef.current) emailRef.current.value = '';
    } else {
      toast.error(result.message);
    }
  };

  const quickLinks = [
    { label: 'Books', href: '/books' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Mediums', href: '/mediums' },
    { label: 'Events', href: '/events' },
  ];

  const services = [
    { label: 'Private Readings', href: '/services/private-readings' },
    { label: 'Group Sessions', href: '/services/group-sessions' },
    { label: 'Workshops', href: '/services/workshops' },
    { label: 'Membership', href: '/membership' },
  ];

  // const resources = [
  //   { label: 'Blog', href: '/blog' },
  //   { label: 'Testimonials', href: '/testimonials' },
  //   { label: 'FAQ', href: '/faq' },
  //   { label: 'Contact Us', href: '/contact' },
  // ];

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
      color: 'hover:bg-secondary-600',
    },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-black' },
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram',
      color: 'hover:bg-gradient-to-r hover:from-primary-500 hover:to-pink-500',
    },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="relative bg-linear-to-br from-slate-900 via-primary-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-white">The Bridge</h3>
                <p className="text-sm text-primary-200 mb-0">
                  Bridging Two Worlds
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A sacred space where sitters, developing mediums, and professional
              mediums connect with spirit through evidence, healing, and
              community.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  to={social.href}
                  className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${social.color} hover:text-white hover:border-transparent`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 inline-block md:block">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-300 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="text-lg text-white mb-6">Services</h4>
            <ul className="space-y-3 inline-block md:block">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-primary-300 transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg text-white mb-6">Connect With Us</h4>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-300 mt-0.5 shrink-0" />
                <div className="text-sm text-center md:text-left">
                  <p className="text-gray-300">123 Spiritual Way</p>
                  <p className="text-gray-300">Metaphysical City, MC 12345</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3">
                <Phone className="w-4 h-4 text-primary-300 shrink-0" />
                <Link
                  to="tel:+15551234567"
                  className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  +1 (555) 123-4567
                </Link>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3">
                <Mail className="w-4 h-4 text-primary-300 shrink-0" />
                <Link
                  to="mailto:hello@thebridge.com"
                  className="text-sm text-gray-300 hover:text-primary-300 transition-colors"
                >
                  hello@thebridge.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-xl text-white mb-3">
              Stay Connected with Spirit
            </h4>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our newsletter for spiritual insights, event updates,
              and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="px-6 py-3 cursor-pointer bg-linear-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-center md:text-left text-gray-400">
              © {year} The Bridge. All rights reserved.{' '}
              <br className="flex md:hidden" /> Made with{' '}
              <Heart className="w-4 h-4 inline text-red-400 mx-1" /> for
              spiritual connection.
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
