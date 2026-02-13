import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { EventStatus } from '../../../constants/enums';
import { useEditEvent, useMyEvent } from '../../../hooks/useEvent';
import EventForm, {
  type EventFormValues,
} from '../../../components/events/EventForm';
import { Button } from '../../../components/ui/button';

const toLocalDateTimeInput = (value?: string | null) => {
  if (!value) return '';
  const date = new Date(value.endsWith('Z') ? value : `${value}Z`);
  const pad = (num: number) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const EditEvent = () => {
  const { eventId } = useParams();
  const numericEventId = Number(eventId);
  const { data: event, isLoading, isError } = useMyEvent(numericEventId);
  const editEventMutation = useEditEvent();

  const defaultValues = useMemo<EventFormValues>(
    () => ({
      title: event?.title ?? '',
      description: event?.description ?? '',
      image: '',
      startDateTime: toLocalDateTimeInput(event?.startDateTime),
      enrollmentDeadline: toLocalDateTimeInput(event?.enrollmentDeadline),
      isPublic: Boolean(event?.isPublic),
      credits: event?.credits ?? 0,
      tags: event?.tags ?? [],
      status: event?.status ?? EventStatus.Upcoming,
      zoomLink: event?.zoomLink ?? '',
      recordingAvailable: Boolean(event?.recordingAvailable),
    }),
    [event]
  );

  const onSubmit = async (values: EventFormValues, imageFile: File | null) => {
    if (!Number.isFinite(numericEventId)) return;

    const formData = new FormData();
    formData.append('Id', String(numericEventId));
    formData.append('Title', values.title.trim());
    formData.append('Description', values.description.trim());

    if (imageFile) {
      formData.append('Image', imageFile);
    }

    formData.append(
      'StartDateTime',
      new Date(values.startDateTime).toISOString()
    );

    if (values.enrollmentDeadline) {
      formData.append(
        'EnrollmentDeadline',
        new Date(values.enrollmentDeadline).toISOString()
      );
    }

    formData.append('IsPublic', String(values.isPublic));
    formData.append('Credits', String(values.credits ?? 0));

    (values.tags ?? []).forEach((tag) => {
      formData.append('Tags', String(tag));
    });

    formData.append('Status', String(values.status));

    if (values.zoomLink?.trim()) {
      formData.append('ZoomLink', values.zoomLink.trim());
    }

    formData.append('RecordingAvailable', String(values.recordingAvailable));

    await editEventMutation.mutateAsync(formData);
  };

  if (!Number.isFinite(numericEventId)) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Invalid event ID.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Event | The Bridge</title>
        <meta
          name="description"
          content="Update your event details and publish changes."
        />
      </Helmet>

      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <p className="text-muted-foreground">
            Update the details of your event.
          </p>
        </div>

        {isLoading && (
          <div className="text-sm text-muted-foreground">Loading...</div>
        )}
        {isError && (
          <div className="text-sm text-destructive">Failed to load event.</div>
        )}
        {!isLoading && !isError && !event && (
          <div className="text-sm text-muted-foreground">Event not found.</div>
        )}

        {event && (
          <EventForm
            defaultValues={defaultValues}
            initialImageUrl={event.image || null}
            submitLabel={
              editEventMutation.isPending ? 'Updating...' : 'Update Event'
            }
            isSubmitting={editEventMutation.isPending}
            extraActions={
              <Button variant="ghost" asChild size="sm">
                <Link to="/dashboard/events">Cancel</Link>
              </Button>
            }
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
};

export default EditEvent;
