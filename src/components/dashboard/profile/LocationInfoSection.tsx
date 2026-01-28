import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { MapPin } from 'lucide-react';
import type { Country, City } from '../../../types/user';

type Opt<T = string> = { value: T; label: string };

interface LocationInfoSectionProps {
  countries: Country[];
  cities: City[];
  selectedCountry: Opt<number> | null;
  selectedCity: Opt<number> | null;
  onCountryChange: (opt: Opt<number> | null) => void;
  onCityChange: (opt: Opt<number> | null) => void;
}

export default function LocationInfoSection({
  countries,
  cities,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}: LocationInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Country</Label>
            <Select
              value={selectedCountry}
              onChange={(opt) => {
                onCountryChange(opt ?? null);
              }}
              options={countries.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              placeholder="Select country"
              className="mt-1"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  borderColor: '#d1d5db',
                  '&:hover': { borderColor: '#9ca3af' },
                  '&:focus-within': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 1px #3b82f6',
                  },
                }),
              }}
              isClearable
            />
          </div>
          <div>
            <Label>City</Label>
            <Select
              value={selectedCity}
              onChange={(opt) => onCityChange(opt ?? null)}
              options={cities.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              placeholder={
                selectedCountry ? 'Select city...' : 'Select country first'
              }
              className="mt-1"
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: '0.375rem',
                  borderColor: '#d1d5db',
                  '&:hover': { borderColor: '#9ca3af' },
                  '&:focus-within': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 1px #3b82f6',
                  },
                }),
              }}
              isDisabled={!selectedCountry}
              isClearable
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
