import api from '../lib/api';

export type MediumRegistrationFormState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type MediumRegistrationPayload = {
  photo: File | null;
  experienceInYears: string;
  philosophy: string;
  bio: string;
  availabilityStatus: string;
  slug: string;
  focus: string;
  tagline: string;
  specialty: string;
};

export async function registerMedium(
  payload: MediumRegistrationPayload
): Promise<MediumRegistrationFormState> {
  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const res = await api.post('/Register/Medium', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.status === 200) {
      const result = res.data;
      return {
        success: true,
        message: result?.message || 'Medium registration successful!',
      };
    }

    const errorResult = res.data;
    const errorMessages = Object.values(
      errorResult?.errors || {}
    ).flat() as string[];
    return {
      success: false,
      message: errorResult?.title || 'Please correct the errors below.',
      errors: errorMessages.length
        ? errorMessages
        : ['An unknown validation error occurred.'],
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { errors?: Record<string, string[]>; title?: string };
      };
    };
    const data = err?.response?.data ?? {};
    const errorMessages = Object.values(data.errors || {}).flat();
    return {
      success: false,
      message:
        data.title ||
        'Could not connect to the server. Please try again later.',
      errors: errorMessages.length
        ? (errorMessages as string[])
        : ['Server connection failed.'],
    };
  }
}
