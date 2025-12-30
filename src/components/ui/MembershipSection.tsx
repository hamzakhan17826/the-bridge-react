import { CheckCircle, ArrowRight } from 'lucide-react';

const MembershipSection = () => {
  return (
    <section className="py-24 md:py-32 mt-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl md:text-6xl  text-center mb-12">
          Choose Your Membership
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* General Medium */}
          <div className="rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white">
            <h2 className="text-4xl ">General Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 ">
              For sitters & spiritual seekers looking for insight, healing, and
              meaningful connection
            </p>
            <div className="flex gap-2 ">
              <span className="text-gray-900 text-3xl align-text-top">$</span>
              <span className="text-gray-900 text-5xl">10</span>
              <span className="text-gray-500 text-lg flex items-end ">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-gray-900 text-white py-2 px-3"
              >
                <span>Join – $10/mo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-sm text-gray-600 font-bold mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full Replay Library</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>10% off ALL events</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>10% off ALL private readings</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Early registration</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Monthly newsletter</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Select Bridge Library resources</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Development Medium */}
          <div className="relative rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white border border-primary">
            <span className="absolute right-0 top-0 inline-flex items-center rounded-tr-xl px-3 py-1 text-xs uppercase tracking-wide bg-primary text-white">
              Popular
            </span>
            <h2 className="text-4xl ">Development Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 ">
              For developing mediums seeking structure, guided practice,
              confidence, and professional growth
            </p>
            <div className="flex gap-2 ">
              <span className="text-gray-900 text-3xl align-text-top">$</span>
              <span className="text-gray-900 text-5xl">19</span>
              <span className="text-gray-500 text-lg flex items-end ">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-primary text-white py-2 px-3"
              >
                <span>Join – $19/mo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-sm text-gray-600 font-bold mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Everything in General</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>2 free Development Circles/month</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Demo eligibility (once verified)</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>10% off additional circles/workshops</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Development resources in Library</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Medium */}
          <div className="rounded-2xl shadow-sm hover:shadow px-5 py-4 bg-white">
            <h2 className="text-4xl ">Professional Medium</h2>
            <p className="mt-3 mb-2 text-gray-700 ">
              For active, serving mediums ready for public visibility,
              professional support, and aligned opportunities.
            </p>
            <div className="flex gap-2 ">
              <span className="text-gray-900 text-3xl align-text-top">$</span>
              <span className="text-gray-900 text-5xl">29</span>
              <span className="text-gray-500 text-lg flex items-end ">/mo</span>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="inline-flex w-full items-center justify-between rounded-md bg-gray-900 text-white py-2 px-3"
              >
                <span>Join – $29/mo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4">
              <h6 className="uppercase tracking-wide text-sm text-gray-600 font-bold mb-3">
                Includes:
              </h6>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Everything in Development</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Public Medium Profile Page</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Directory listing in “Meet the Mediums”</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Unlimited demonstration eligibility</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Charity reading requirement</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full Bridge Library access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-800">
                  <CheckCircle className="h-4 w-4 text-green-500" />
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
