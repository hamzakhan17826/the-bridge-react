import clsx from 'clsx';

type BillingCycle = 'monthly' | 'yearly';

type BillingToggleProps = {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  className?: string;
};

const BillingToggle = ({
  billingCycle,
  onChange,
  className,
}: BillingToggleProps) => {
  return (
    <section className={clsx('pt-28 pb-20 bg-gray-50', className)}>
      <div className="container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-4 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <button
            onClick={() => onChange('monthly')}
            className={`px-6 py-3 rounded-xl font-poppins font-medium transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onChange('yearly')}
            className={`px-6 py-3 rounded-xl font-poppins font-medium transition-all duration-200 ${
              billingCycle === 'yearly'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
export default BillingToggle;
