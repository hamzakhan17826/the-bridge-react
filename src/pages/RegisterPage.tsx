import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import type { StylesConfig } from 'react-select';
import { toast } from 'react-toastify';
import type { EmailPreference, Country, City } from '../types/types';
import SubmitButton from '../components/ui/SubmitButton';
import { Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import {
  fetchEmailPreferences,
  fetchCountries,
  fetchCities,
  resendVerificationEmail,
  registerUser,
  type RegisterPayload,
} from '../services/register';
import { Link } from 'react-router-dom';

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
    <div className="mb-6 p-4 bg-secondary-50 border border-secondary-200 rounded-xl">
      <p className="font-semibold text-secondary-900 mb-3">
        Already registered but didn't get a verification email?
      </p>
      <form ref={resendFormRef} onSubmit={onSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-secondary-400" />
          </div>
          <input
            type="email"
            name="email"
            className="w-full pl-9 pr-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        <SubmitButton
          text={loading ? 'Sending…' : 'Resend'}
          className="px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white text-sm rounded-lg transition-colors"
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-secondary-50 relative overflow-hidden py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Logo/Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-primary-600 to-secondary-600 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join The Bridge community</p>
          </div>

          <ResendVerificationForm />

          <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select<Opt<number>, false>
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(opt) => setSelectedCountry(opt ?? null)}
                    placeholder="Select country..."
                    classNamePrefix="select"
                    className="text-sm"
                    styles={{
                      ...singleStyles,
                      control: (base) => ({
                        ...base,
                        paddingLeft: '2.5rem',
                        borderRadius: '0.75rem',
                        borderColor: '#d1d5db',
                        '&:hover': { borderColor: '#9ca3af' },
                        '&:focus-within': {
                          borderColor: '#a855f7',
                          boxShadow: '0 0 0 1px #a855f7',
                        },
                      }),
                    }}
                    isClearable
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Select<Opt<number>, false>
                    options={cityOptions}
                    value={selectedCity}
                    onChange={(opt) => setSelectedCity(opt ?? null)}
                    placeholder={
                      selectedCountry
                        ? 'Select city...'
                        : 'Select country first'
                    }
                    classNamePrefix="select"
                    className="text-sm"
                    styles={{
                      ...singleStyles,
                      control: (base) => ({
                        ...base,
                        paddingLeft: '2.5rem',
                        borderRadius: '0.75rem',
                        borderColor: '#d1d5db',
                        '&:hover': { borderColor: '#9ca3af' },
                        '&:focus-within': {
                          borderColor: '#a855f7',
                          boxShadow: '0 0 0 1px #a855f7',
                        },
                      }),
                    }}
                    isDisabled={!selectedCountry}
                    isClearable
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                styles={{
                  ...multiStyles,
                  control: (base) => ({
                    ...base,
                    borderRadius: '0.75rem',
                    borderColor: '#d1d5db',
                    '&:hover': { borderColor: '#9ca3af' },
                    '&:focus-within': {
                      borderColor: '#a855f7',
                      boxShadow: '0 0 0 1px #a855f7',
                    },
                  }),
                }}
                className="text-sm"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="termsCheck"
                className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                type="checkbox"
                name="isUserAgeedToTerms"
                required
              />
              <label className="text-sm text-gray-700" htmlFor="termsCheck">
                I agree to the{' '}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Terms and Conditions
                </a>
                .
              </label>
            </div>

            <SubmitButton
              text={submitting ? 'Creating account…' : 'Create Account'}
              className="w-full py-3 bg-linear-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
