import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Video,
  ArrowRight,
  XCircle,
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
  slug?: string;
  mediumName?: string;
  mediumTagline?: string;
  mediumPhotoUrl?: string;
  mediumSpecialty?: string;
};

export default function EventConfirmed() {
  const { state } = useLocation();
  const data = (state || {}) as LocationState;

  const startText = data.startDateTime
    ? new Date(data.startDateTime + 'Z').toLocaleString()
    : 'TBD';

  return (
    <>
      <Helmet>
        <title>Enrollment Confirmed - The Bridge</title>
        <meta
          name="description"
          content="Your event enrollment is confirmed. View details, join live, or watch the recording."
        />
      </Helmet>

      <section className="relative min-h-[70vh] overflow-hidden bg-linear-to-br from-emerald-50 via-white to-amber-50">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg, rgba(16,185,129,0.08), transparent_45%,rgba(251,191,36,0.08))]" />
        <div className="pointer-events-none absolute -top-24 left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.2),transparent_70%)]" />
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-amber-100 text-emerald-700 font-poppins font-medium text-sm shadow-sm">
                <CheckCircle className="w-4 h-4" />
                Enrollment Confirmed
              </div>
              <h1 className="text-3xl md:text-5xl font-poppins font-semibold tracking-tight">
                You&apos;re in for{' '}
                <span className="bg-linear-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
                  {data.title || 'this event'}
                </span>
              </h1>
              <p className="text-lg text-gray-600 font-lato">
                We&apos;ve saved your spot. You&apos;ll receive updates and
                access details below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-emerald-200/60 bg-white/90 backdrop-blur overflow-hidden shadow-lg shadow-emerald-100/40 pt-0">
                <div className="relative h-48 lg:h-56">
                  <img
                    src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600&auto=format&fit=crop"
                    alt="Event banner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-emerald-700 border border-white/80 shadow-sm">
                      Enrolled
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white text-xs uppercase tracking-[0.25em] font-lato">
                      Your ticket
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
                <CardContent className="space-y-6">
                  <div className="divide-y divide-gray-100 rounded-2xl border border-emerald-100 bg-white p-4">
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-gray-500">Start</span>
                      <span className="font-medium text-gray-900">
                        {startText}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-gray-500">Location</span>
                      <span className="font-medium text-gray-900">
                        Live via Zoom
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-gray-500">Credits</span>
                      <span className="font-medium text-gray-900">
                        {typeof data.credits === 'number' ? data.credits : '—'}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-emerald-700">
                      Quick Access
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Button
                        className="bg-linear-to-r from-emerald-600 to-amber-500 text-white shadow-lg shadow-emerald-200 hover:from-emerald-700 hover:to-amber-600 hover:shadow-emerald-300 transition"
                        asChild
                      >
                        <a
                          href={data.zoomLink || '#'}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Join Live
                        </a>
                      </Button>
                      <Button variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Calendar
                      </Button>
                      {data.recordingAvailable && (
                        <Button variant="outline">
                          <Video className="w-4 h-4 mr-2" />
                          Watch Recording
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200/60 bg-white/85 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    What&apos;s Next
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <p>Add the event to your calendar.</p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <p>Join the live session on time.</p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                      <p>Recording access will appear here if enabled.</p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/events">
                        Browse More Events
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-emerald-200/60 bg-white/90 backdrop-blur">
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

            <Card className="border-rose-200 bg-rose-50/70">
              <CardContent className="py-4 flex items-center gap-3 text-rose-700">
                <XCircle className="w-5 h-5" />
                Need to cancel? Contact support or manage your enrollment from
                your dashboard.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
