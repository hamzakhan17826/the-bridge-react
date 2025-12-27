const MembershipSection = () => {
  return (
    <section className="pt-[150px] pb-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-2xl md:text-3xl font-grotesk-bold mb-8">
          Choose Your Membership
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* General Medium */}
          <div className="rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white">
            <h2 className="text-xl font-grotesk-medium">General Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 font-grotesk-light">
              For sitters & spiritual seekers looking for insight, healing, and
              meaningful connection
            </p>
            <div className="flex items-end gap-2 font-grotesk-bold text-4xl md:text-5xl">
              <span className="text-gray-700">$</span>
              <span className="text-gray-900">10</span>
              <span className="text-gray-500 text-base">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-gray-900 text-white py-2 px-3"
              >
                Join – $10/mo <i className="bi-arrow-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-xs text-gray-600 font-grotesk-medium mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Full Replay Library</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>10% off ALL events</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>10% off ALL private readings</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Early registration</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Monthly newsletter</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Select Bridge Library resources</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Development Medium */}
          <div className="relative rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white border border-gray-200">
            <span className="absolute right-0 top-0 inline-flex items-center rounded-none px-3 py-1 text-xs uppercase tracking-wide bg-[var(--color-primary)] text-white">
              Popular
            </span>
            <h2 className="text-xl font-grotesk-medium">Development Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 font-grotesk-light">
              For developing mediums seeking structure, guided practice,
              confidence, and professional growth
            </p>
            <div className="flex items-end gap-2 font-grotesk-bold text-4xl md:text-5xl">
              <span className="text-gray-700">$</span>
              <span className="text-gray-900">19</span>
              <span className="text-gray-500 text-base">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-[var(--color-primary)] text-white py-2 px-3"
              >
                Join – $19/mo <i className="bi-arrow-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-xs text-gray-600 font-grotesk-medium mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Everything in General</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>2 free Development Circles/month</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Demo eligibility (once verified)</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span>{' '}
                  <span>10% off additional circles/workshops</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Development resources in Library</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Medium */}
          <div className="rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white">
            <h2 className="text-xl font-grotesk-medium">Professional Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 font-grotesk-light">
              For active, serving mediums ready for public visibility,
              professional support, and aligned opportunities.
            </p>
            <div className="flex items-end gap-2 font-grotesk-bold text-4xl md:text-5xl">
              <span className="text-gray-700">$</span>
              <span className="text-gray-900">29</span>
              <span className="text-gray-500 text-base">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-gray-900 text-white py-2 px-3"
              >
                Join – $29/mo <i className="bi-arrow-right"></i>
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-xs text-gray-600 font-grotesk-medium mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Everything in Development</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Public Medium Profile Page</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span>{' '}
                  <span>Directory listing in “Meet the Mediums”</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span>{' '}
                  <span>Unlimited demonstration eligibility</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Charity reading requirement</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span> <span>Full Bridge Library access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <span>✅</span>{' '}
                  <span>Presenter Tools + booking integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
