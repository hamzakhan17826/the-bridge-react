import type { FC } from 'react';
import { Facebook, Twitter, Chrome, Pin, Linkedin } from 'lucide-react';

const Footer: FC = () => {
  const year = new Date().getFullYear();
  const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Presenters', href: '#' },
    { label: 'Membership', href: '#' },
    { label: 'Offerings', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto py-18 md:py-20">
        <div className="py-10 text-center">
          <img
            src="/images/the-bridge-logo.png"
            alt="The bridge logo"
            className="mx-auto h-24 w-auto mb-5"
          />
          <span className="uppercase text-gray-500 font-grotesk-light">
            The Bridge – Bridging Two Worlds
          </span>

          <nav className="mt-16">
            <ul className="flex flex-wrap justify-center gap-6 list-none">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-gray-500 hover:text-primary font-grotesk-light no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto px-6">
          <div className="py-6 text-center">
            <div className="flex justify-center gap-3 mb-3">
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white hover:opacity-90"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black text-white hover:opacity-90"
                aria-label="X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white hover:opacity-90"
                aria-label="Google"
              >
                <Chrome className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 text-white hover:opacity-90"
                aria-label="Pinterest"
              >
                <Pin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 text-white hover:opacity-90"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <span className="text-gray-600 font-grotesk-light">
              &copy; {year} All Rights Reserved by The Bridge.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
