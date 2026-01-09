import Select from 'react-select';
import { MapPin } from 'lucide-react';
import type { LocationInfoSectionProps, Opt } from '../../types/user';

const LocationInfoSection = ({
  countries,
  cities,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
  fetchCities,
}: LocationInfoSectionProps) => {
  const countryOptions: Opt<number>[] = countries.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const cityOptions: Opt<number>[] = cities.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary-600" />
        Location Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Select<Opt<number>, false>
              options={countryOptions}
              value={selectedCountry}
              onChange={async (opt) => {
                onCountryChange(opt ?? null);
                if (opt?.value) {
                  await fetchCities(opt.value);
                  // Note: cities state update should be handled in parent
                } else {
                  // Note: cities reset should be handled in parent
                }
              }}
              placeholder="Select country..."
              classNamePrefix="select"
              className="mt-1"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  borderColor: '#d1d5db',
                  '&:hover': { borderColor: '#9333ea' },
                  '&:focus-within': {
                    borderColor: '#9333ea',
                    boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)',
                  },
                  paddingLeft: '2.5rem',
                  minHeight: '48px',
                }),
                placeholder: (base) => ({ ...base, color: '#9ca3af' }),
              }}
              isClearable
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <Select<Opt<number>, false>
              options={cityOptions}
              value={selectedCity}
              onChange={(opt) => onCityChange(opt ?? null)}
              placeholder={
                selectedCountry ? 'Select city...' : 'Select country first'
              }
              classNamePrefix="select"
              className="mt-1"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  borderColor: '#d1d5db',
                  '&:hover': { borderColor: '#9333ea' },
                  '&:focus-within': {
                    borderColor: '#9333ea',
                    boxShadow: '0 0 0 3px rgba(147, 51, 234, 0.1)',
                  },
                  paddingLeft: '2.5rem',
                  minHeight: '48px',
                }),
                placeholder: (base) => ({ ...base, color: '#9ca3af' }),
              }}
              isDisabled={!selectedCountry}
              isClearable
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoSection;
