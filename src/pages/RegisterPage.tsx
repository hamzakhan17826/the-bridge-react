import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import type { EmailPreference, Country, City } from '../types/types';
import SubmitButton from '../components/ui/SubmitButton';
import {
  fetchEmailPreferences,
  fetchCountries,
  fetchCities,
  resendVerificationEmail,
  registerUser,
  type RegisterPayload,
} from '../services/register';

const ResendVerificationForm = () => {
  const resendFormRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const formData = new FormData(resendFormRef.current!);
    const email = (formData.get('email') as string) || '';
    setLoading(true);
    const res = await resendVerificationEmail(email);
    setLoading(false);
    if (res.success) {
      toast.success(res.message);
      resendFormRef.current?.reset();
    } else {
      toast.error(res.errors?.join(', ') || res.message);
    }
  };

  return (
    <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50">
      <p className="font-bold">
        Already registered but didn’t get a verification email?
      </p>
      <form ref={resendFormRef} onSubmit={onSubmit} className="mt-2 flex gap-2">
        <input
          type="email"
          name="email"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
          placeholder="Enter your email"
          required
        />
        <SubmitButton
          text={loading ? 'Sending…' : 'Resend'}
          className="w-auto px-4"
        />
      </form>
    </div>
  );
};

export default function RegisterPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [emailPreferences, setEmailPreferences] = useState<EmailPreference[]>(
    []
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  type Opt<T = string> = { value: T; label: string };
  const [selectedEmailPreferences, setSelectedEmailPreferences] = useState<
    Opt<string>[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<Opt<number> | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Opt<number> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadInit = async () => {
      const [prefs, ctrs] = await Promise.all([
        fetchEmailPreferences(),
        fetchCountries(),
      ]);
      setEmailPreferences(prefs);
      setCountries(ctrs);
      const allOptions = prefs.map((pref) => ({
        value: pref.emailPreferencesID,
        label: pref.displayName,
      }));
      setSelectedEmailPreferences(allOptions);
    };
    loadInit();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (!selectedCountry) {
        setCities([]);
        setSelectedCity(null);
        return;
      }
      console.log('Selected country changed:', selectedCountry.value);
      const data = await fetchCities(selectedCountry.value);
      console.log('Fetched cities:', data);
      setCities(data);
      setSelectedCity(null);
    };
    loadCities();
  }, [selectedCountry]);
  const preferenceOptions: Opt<string>[] = emailPreferences.map((pref) => ({
    value: pref.emailPreferencesID,
    label: pref.displayName,
  }));
  const countryOptions: Opt<number>[] = countries.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const cityOptions: Opt<number>[] = cities.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const multiStyles: StylesConfig<Opt<string>, true> = {
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--color-primary)',
      borderRadius: '4px',
    }),
    multiValueLabel: (base) => ({ ...base, color: 'white' }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'white',
      ':hover': { backgroundColor: 'var(--color-primary)', color: 'white' },
    }),
  };
  const singleStyles: StylesConfig<Opt<number>, false> = {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(formRef.current!);
    const payload: RegisterPayload = {
      email: (fd.get('email') as string) || '',
      password: (fd.get('password') as string) || '',
      confirmPassword: (fd.get('confirmPassword') as string) || '',
      isUserAgeedToTerms: fd.get('isUserAgeedToTerms') === 'on',
      countryId: selectedCountry?.value ?? 0,
      cityId: selectedCity?.value ?? 0,
      selectedEmailPreferences: selectedEmailPreferences.map((p) => p.value),
    };
    setSubmitting(true);
    const result = await registerUser(payload);
    setSubmitting(false);
    if (result.success) {
      toast.success(
        result.message || 'Registration successful! Please verify your email.'
      );
      formRef.current?.reset();
      const allOptions = emailPreferences.map((pref) => ({
        value: pref.emailPreferencesID,
        label: pref.displayName,
      }));
      setSelectedEmailPreferences(allOptions);
      setSelectedCountry(null);
      setSelectedCity(null);
    } else {
      toast.error(result.errors?.join(', ') || result.message);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 mt-4">
            <ResendVerificationForm />

            <h3 className="text-2xl md:text-3xl font-grotesk-bold mb-6">
              Register an Account
            </h3>

            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Country
                </label>
                <Select<Opt<number>, false>
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={(opt) => setSelectedCountry(opt ?? null)}
                  placeholder="Select country..."
                  classNamePrefix="select"
                  className="mt-2"
                  styles={singleStyles}
                  isClearable
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  City
                </label>
                <Select<Opt<number>, false>
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(opt) => setSelectedCity(opt ?? null)}
                  placeholder={
                    selectedCountry ? 'Select city...' : 'Select country first'
                  }
                  classNamePrefix="select"
                  className="mt-2"
                  styles={singleStyles}
                  isDisabled={!selectedCountry}
                  isClearable
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="termsCheck"
                  className="rounded border-gray-300"
                  type="checkbox"
                  name="isUserAgeedToTerms"
                  required
                />
                <label className="text-sm text-gray-700" htmlFor="termsCheck">
                  I agree to the{' '}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-primary"
                  >
                    Terms and Conditions
                  </a>
                  .
                </label>
              </div>

              <div>
                <label className="block font-grotesk-light text-gray-700 mt-5">
                  Email Preferences (Optional)
                </label>
                <Select<Opt<string>, true>
                  isMulti
                  options={preferenceOptions}
                  value={selectedEmailPreferences}
                  onChange={(selected) =>
                    setSelectedEmailPreferences(selected as Opt<string>[])
                  }
                  placeholder="Select email preferences..."
                  classNamePrefix="select"
                  styles={multiStyles}
                  className="mt-2"
                />
              </div>
              <SubmitButton
                text={submitting ? 'Registering…' : 'Register'}
                className="w-full"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
