import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  CreditCard,
  ArrowRight,
  Info,
  CheckCircle,
  MapPin,
  Mic,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type LocationState = {
  title?: string;
  startDateTime?: string;
  credits?: number;
  zoomLink?: string;
  recordingAvailable?: boolean;
  tags?: string[];
  slug?: string;
  mediumName?: string;
  mediumTagline?: string;
  mediumPhotoUrl?: string;
  mediumSpecialty?: string;
};

export default function EventConfirmation() {
  const { state } = useLocation();
  const data = (state || {}) as LocationState;

  const startText = data.startDateTime
    ? new Date(data.startDateTime + 'Z').toLocaleString()
    : 'TBD';

  return (
    <>
      <Helmet>
        <title>Confirm Enrollment - The Bridge</title>
        <meta
          name="description"
          content="Review event details and confirm your enrollment."
        />
      </Helmet>

      <section className="relative min-h-[70vh] overflow-hidden bg-linear-to-br from-[#f6f2ff] via-white to-[#e9f4ff]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_70%)]" />
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-100 to-sky-100 text-primary-700 font-poppins font-medium text-sm shadow-sm">
                <Info className="w-4 h-4" />
                Confirm Enrollment
              </div>
              <h1 className="text-3xl md:text-5xl font-poppins font-semibold tracking-tight">
                Ready to join{' '}
                <span className="bg-linear-to-r from-primary-700 to-sky-600 bg-clip-text text-transparent">
                  {data.title || 'this event'}
                </span>
                ?
              </h1>
              <p className="text-lg text-gray-600 font-lato">
                Review the details below, then confirm to complete your
                enrollment.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-primary/10 overflow-hidden bg-white/80 backdrop-blur pt-0">
                <div className="relative h-48 lg:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600&auto=format&fit=crop"
                    alt="Event banner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 border border-white/80 shadow-sm">
                      Pending
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white text-sm uppercase tracking-[0.2em] font-lato">
                      Enrollment
                    </div>
                    <div className="text-white text-2xl font-poppins font-semibold">
                      {data.title || 'Event Session'}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-sm font-medium text-gray-900">
                          Pending
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                      <div className="text-xs text-gray-500">Credits</div>
                      <div className="mt-2 text-lg font-poppins font-semibold text-gray-900">
                        {typeof data.credits === 'number' ? data.credits : '—'}
                      </div>
                    </div>
                    <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                      <div className="text-xs text-gray-500">Start</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        {startText}
                      </div>
                    </div>
                    <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="mt-2 text-sm font-medium text-gray-900">
                        Live via Zoom
                      </div>
                    </div>
                    <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm sm:col-span-2">
                      <div className="text-xs text-gray-500">Recording</div>
                      <div className="mt-2">
                        {data.recordingAvailable ? (
                          <Badge className="bg-emerald-600 text-white">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not available</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {Array.isArray(data.tags) && data.tags.length > 0 && (
                    <div className="pt-1">
                      <div className="text-sm text-gray-500 mb-2">Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {data.tags.slice(0, 8).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-2 text-sm text-gray-600">
                    By confirming, we&apos;ll reserve your seat and send a
                    confirmation email.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/10 bg-white/85 backdrop-blur border border-primary-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    Final Step
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-600">
                  <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      Steps
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <p>1. Confirm enrollment</p>
                      <p>2. Receive email confirmation</p>
                      <p>3. Access the live link or recording</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <Button
                      className="w-full bg-linear-to-r from-primary-600 to-sky-600 text-white shadow-lg shadow-primary/25 hover:from-primary-700 hover:to-sky-700 hover:shadow-primary/40 transition"
                      asChild
                    >
                      <Link to="/events/confirmed" state={data}>
                        Confirm & Join
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="pt-2">
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/events">Back to Events</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Safe checkout and instant access
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/10 bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary-600" />
                  Your Medium
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={
                      data.mediumPhotoUrl ||
                      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop'
                    }
                    alt="Medium"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-poppins font-semibold text-gray-900">
                    {data.mediumName || 'Sophia Lane'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {data.mediumTagline ||
                      'Evidence-based mediumship with heart'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    Specialty:{' '}
                    {data.mediumSpecialty || 'Grief & healing support'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    Online Sessions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
