import CountUp from 'react-countup';

const AboutSection = () => {
  return (
    <div className="bg-transparent m-0 relative pb-24 lg:pb-44 mt-20">
      {/* decorative background for large screens */}
      <div
        aria-hidden
        className="hidden lg:block absolute inset-0 -rotate-180"
        style={{
          backgroundImage: "url('/images/dots-1.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
          backgroundSize: '40%',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="mb-0">
              <span className="relative inline-block top-[-1px] rounded-sm px-2 py-1 bg-primary text-white font-grotesk-medium">
                About Us
              </span>
            </h4>
            <div>
              <h2 className="mb-2 mt-4 text-3xl md:text-6xl font-grotesk-bold">
                Where the seen meets the unseen
              </h2>
              <div className="opacity-80 border-b-2 border-primary w-24" />
            </div>
            <p className="mt-4 text-lg font-grotesk-light">
              <strong>The Bridge</strong> is a modern digital platform for
              evidential mediumship, spiritual development, and community
              connection. It serves three core groups: <strong>Sitters</strong>,{' '}
              <strong>Developing Mediums</strong>, and{' '}
              <strong>Professional Mediums</strong>.
            </p>

            <ul className="text-lg space-y-2">
              <li>
                <strong>Sitters:</strong> Book readings, attend live
                demonstrations, and access event replays.
              </li>
              <li>
                <strong>Developing Mediums:</strong> Build skills through
                circles, workshops, and mentorship.
              </li>
              <li>
                <strong>Professional Mediums:</strong> Showcase services, grow a
                client base, and connect with a like-minded community.
              </li>
            </ul>
            <a
              href="#"
              className="inline-flex mt-3 items-center rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90"
            >
              Learn More
            </a>
          </div>
          <div className="mt-8 lg:mt-0 flex justify-center items-center">
            <div className="relative rounded-full h-[300px] w-[300px] border-2 border-[rgba(12,28,204,0.05)] lg:h-[400px] lg:w-[400px]">
              <div className="w-[350px] h-[350px] -ml-[30px] -mt-[25px] lg:w-[500px] lg:h-[500px] lg:-ml-[50px] lg:-mt-[50px]">
                <div className="flex items-center justify-between h-full">
                  <div>
                    <div className="rounded-full min-w-20 min-h-20 lg:min-w-28 lg:min-h-28 p-1 lg:p-2 bg-white shadow-[0_0_35px_rgba(140,152,164,0.2)] flex items-center justify-center dark:bg-slate-50 dark:shadow-none">
                      <div className="text-center">
                        <div className="text-primary lg:text-[28px]">
                          <CountUp start={1} end={500} duration={2} />
                        </div>
                        <p className="font-bold text-gray-500 mb-0">Mediums</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full flex-col justify-between">
                    <div className="rounded-full min-w-20 min-h-20 lg:min-w-28 lg:min-h-28 p-1 lg:p-2 bg-white shadow-[0_0_35px_rgba(140,152,164,0.2)] flex items-center justify-center dark:bg-slate-50 dark:shadow-none">
                      <div className="text-center">
                        <div className="text-sky-500 lg:text-[28px]">
                          <CountUp start={1} end={2000} duration={1.4} />
                        </div>
                        <p className="font-bold text-gray-500 mb-0">Sitters</p>
                      </div>
                    </div>
                    <div className="rounded-full min-w-20 min-h-20 lg:min-w-28 lg:min-h-28 p-1 lg:p-2 bg-white shadow-[0_0_35px_rgba(140,152,164,0.2)] flex items-center justify-center dark:bg-slate-50 dark:shadow-none">
                      <div className="text-center">
                        <div className="text-red-500 lg:text-[28px]">
                          <CountUp start={1} end={150} duration={2.1} />
                        </div>
                        <p className="font-bold text-gray-500 mb-0">Events</p>
                      </div>
                    </div>
                    <div className="rounded-full min-w-20 min-h-20 lg:min-w-28 lg:min-h-28 p-1 lg:p-2 bg-white shadow-[0_0_35px_rgba(140,152,164,0.2)] flex items-center justify-center dark:bg-slate-50 dark:shadow-none">
                      <div className="text-center">
                        <div className="text-amber-500 lg:text-[28px]">
                          <CountUp start={1} end={5000} duration={2.4} />
                        </div>
                        <p className="font-bold text-gray-500 mb-0">Members</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="rounded-full min-w-20 min-h-20 lg:min-w-28 lg:min-h-28 p-1 lg:p-2 bg-white shadow-[0_0_35px_rgba(140,152,164,0.2)] flex items-center justify-center dark:bg-slate-50 dark:shadow-none">
                      <div className="text-center">
                        <div className="text-primary lg:text-[28px]">
                          <CountUp start={1} end={1000} duration={2.4} />
                        </div>
                        <p className="font-bold text-gray-500 mb-0">Replays</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
