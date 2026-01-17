import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import ReactSelect from 'react-select';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Calendar, Clock } from 'lucide-react';

export default function BookMedium() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<string>('private');
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string | null>(null);

  const slots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
  const serviceOptions = [
    { value: 'private', label: 'Private Reading (60m)' },
    { value: 'coaching', label: 'Development Coaching (45m)' },
  ];

  const confirm = () => {
    // Dummy confirm
    navigate('/dashboard/pm/bookings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Book {slug} | The Bridge</title>
      </Helmet>
      {/* Hero */}
      <section className="relative bg-linear-to-br from-primary-900 to-secondary-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Book a Session
            </h1>
          </div>
          <p className="text-primary-200 mt-2">
            Choose a service, pick a date and time, and confirm your booking.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: selection */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Service & Time
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm mb-2">Service</div>
                  <ReactSelect
                    value={serviceOptions.find((o) => o.value === service)}
                    onChange={(opt: { value: string; label: string } | null) =>
                      setService(opt?.value ?? 'private')
                    }
                    options={serviceOptions}
                    menuPortalTarget={
                      typeof document !== 'undefined'
                        ? document.body
                        : undefined
                    }
                    menuPosition="fixed"
                    menuShouldBlockScroll={false}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 50 }),
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm mb-2">Pick a date</div>
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </div>
                  <div>
                    <div className="text-sm mb-2">Pick a time</div>
                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((s) => (
                        <Button
                          key={s}
                          variant={slot === s ? 'default' : 'outline'}
                          onClick={() => setSlot(s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={confirm} disabled={!date || !slot}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Right: summary */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Medium:</span> {slug}
                </div>
                <div>
                  <span className="text-muted-foreground">Service:</span>{' '}
                  {service === 'private'
                    ? 'Private Reading (60m)'
                    : 'Development Coaching (45m)'}
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>{' '}
                  {date ? date.toDateString() : '—'}
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>{' '}
                  {slot ?? '—'}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
