const CallToAction = () => {
  return (
    <section className="bg-linear-to-br from-primary to-primary-dark py-24 md:py-36">
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
              <button className="inline-flex items-center rounded-md bg-white text-primary font-grotesk-medium px-5 py-3 shadow-sm hover:bg-gray-100 hover:text-primary-dark">
                Join Now
              </button>
              <button className="inline-flex items-center rounded-md border border-white text-white font-grotesk-medium px-5 py-3 hover:bg-white hover:text-primary">
                Learn More
              </button>
            </div>
          </div>

          {/* Right form card */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-6 md:p-8">
                <h3 className="text-3xl font-grotesk-bold mb-4 text-gray-800">
                  Book a Reading
                </h3>
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-6">
                    <select
                      className="w-full rounded-lg bg-gray-100 border-none p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full rounded-lg bg-primary hover:bg-primary-dark text-white font-grotesk-medium py-3"
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
