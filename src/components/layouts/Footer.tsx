import type { FC } from 'react';

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
      <div className="container mx-auto px-6">
        <div className="py-10 text-center">
          <a href="#" className="inline-block mb-3">
            <img
              src="/images/the-bridge-logo.png"
              alt="The bridge logo"
              className="mx-auto h-16 w-auto"
            />
          </a>
          <span className="uppercase text-gray-500 font-grotesk-medium">
            The Bridge – Bridging Two Worlds
          </span>

          <nav className="mt-8">
            <ul className="flex flex-wrap justify-center gap-6">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-gray-800 hover:text-[var(--color-primary)] font-grotesk-medium"
                  >
                    <u>{l.label}</u>
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
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black text-white hover:opacity-90"
                aria-label="X"
              >
                <i className="fa-brands fa-x-twitter" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white hover:opacity-90"
                aria-label="Google"
              >
                <i className="fa-brands fa-google" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 text-white hover:opacity-90"
                aria-label="Pinterest"
              >
                <i className="fa-brands fa-pinterest-p" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-700 text-white hover:opacity-90"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin" />
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
