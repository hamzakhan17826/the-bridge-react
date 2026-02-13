import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { EventStatus } from '../../../constants/enums';
import { useCreateEvent } from '../../../hooks/useEvent';
import EventForm, {
  type EventFormValues,
} from '../../../components/events/EventForm';

const CreateEvent = () => {
  const createEventMutation = useCreateEvent();
  const [resetKey, setResetKey] = useState(0);

  const defaultValues = useMemo<EventFormValues>(
    () => ({
      title: '',
      description: '',
      image: '',
      startDateTime: '',
      enrollmentDeadline: '',
      isPublic: true,
      credits: 0,
      tags: [],
      status: EventStatus.Upcoming,
      zoomLink: '',
      recordingAvailable: false,
    }),
    []
  );

  const onSubmit = async (values: EventFormValues, imageFile: File | null) => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('Title', values.title.trim());
    formData.append('Description', values.description.trim());
    formData.append('Image', imageFile);
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

    await createEventMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        if (data.result) {
          setResetKey((prev) => prev + 1);
        }
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Create Event | The Bridge</title>
        <meta
          name="description"
          content="Create a new event and publish it to the platform."
        />
      </Helmet>

      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-3xl font-bold">Create Event</h1>
          <p className="text-muted-foreground">
            Create a new event and publish it to the platform.
          </p>
        </div>

        <EventForm
          defaultValues={defaultValues}
          requireImage
          resetKey={resetKey}
          isSubmitting={createEventMutation.isPending}
          submitLabel={
            createEventMutation.isPending ? 'Creating...' : 'Create Event'
          }
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default CreateEvent;
