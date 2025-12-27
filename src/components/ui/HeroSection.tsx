import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Text & Actions */}
          <div className="w-full lg:w-1/2 pt-4 lg:pt-8">
            <div className="relative z-10">
              <div className="uppercase tracking-widest mb-4 text-gray-600">
                Bridging Two Worlds
              </div>
              <h1 className="mb-2 text-3xl md:text-5xl lg:text-6xl leading-tight">
                A modern stage where{' '}
                <span className="font-playfair italic font-semibold text-primary lowercase md:text-6xl">
                  mediums
                </span>{' '}
                rise together
              </h1>
              <p className="mt-3 text-lg md:text-lg text-gray-700">
                The Bridge is a sacred space where sitters, developing mediums,
                and professional mediums connect with spirit through evidence,
                healing, and community.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 mb-8 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-white hover:opacity-90 transition"
              >
                View Events
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-5 py-3 text-gray-900 hover:border-primary transition dark:text-gray-100 dark:border-gray-600"
              >
                Join Membership
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div>
                <h3
                  className="font-playfair text-5xl md:text-4xl mb-0"
                  style={{ lineHeight: '0.85' }}
                >
                  137K
                </h3>
                <small className="text-sm opacity-80">Listeners</small>
              </div>
              <span className="mx-2 md:mx-5 text-4xl opacity-30 leading-none">
                ·
              </span>
              <div>
                <h3
                  className="font-playfair text-5xl md:text-4xl mb-0"
                  style={{ lineHeight: '0.85' }}
                >
                  2.1M
                </h3>
                <small className="text-sm opacity-80">Followers</small>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center w-full lg:w-1/2 lg:flex lg:justify-end">
            <img
              src="/images/people-connection-on-bridge.png"
              alt="People connecting on a bridge"
              className="w-3/4 lg:w-4/5 h-auto rounded-lg"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
