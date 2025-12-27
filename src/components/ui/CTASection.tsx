const CallToAction = () => {
  return (
    <section className="bg-gradient-to-br from-[#8251ac] to-[#643a8a] pt-[150px] pb-[150px]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          {/* Left content */}
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-grotesk-bold mb-4">
              Ready to Connect with the Spirit World?
            </h2>
            <p className="text-white/80 text-lg mb-6 font-grotesk-light">
              Join our community of seekers and mediums to deepen your spiritual
              journey and access exclusive resources.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center rounded-md bg-white text-[#8251ac] font-grotesk-medium px-5 py-3 shadow-sm hover:bg-gray-100 hover:text-[#643a8a]">
                Join Now
              </button>
              <button className="inline-flex items-center rounded-md border border-white text-white font-grotesk-medium px-5 py-3 hover:bg-white hover:text-[#8251ac]">
                Learn More
              </button>
            </div>
          </div>

          {/* Right form card */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-grotesk-bold mb-4 text-gray-900">
                  Book a Reading
                </h3>
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8251ac]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8251ac]"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-6">
                    <select
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8251ac]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your interest
                      </option>
                      <option value={1}>Spiritual Development</option>
                      <option value={2}>Mediumship Training</option>
                      <option value={3}>Private Reading</option>
                      <option value={4}>Community Events</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#8251ac] hover:bg-[#643a8a] text-white font-grotesk-medium py-3"
                  >
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
