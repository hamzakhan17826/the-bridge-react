type ContactFormState = {
  success: boolean;
  message: string;
  errors?: string[];
  fields?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};

export async function submitContactForm(
  formData: FormData
): Promise<ContactFormState> {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}/EmailSubscription/ContactUs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: result.message || 'Message sent successfully!',
      };
    } else {
      const errorResult = await response.json();
      const errorMessages = Object.values(
        errorResult.errors
      ).flat() as string[];

      return {
        success: false,
        message: errorResult.title || 'Please correct the errors below.',
        errors:
          errorMessages.length > 0
            ? errorMessages
            : ['An unknown validation error occurred.'],
        fields: data,
      };
    }
  } catch (error) {
    console.error('ContactUs API call failed', error);
    return {
      success: false,
      message: 'Could not connect to the server. Please try again later.',
      errors: ['Server connection failed.'],
      fields: data,
    };
  }
}

export async function submitContactFormObject(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactFormState> {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}/EmailSubscription/ContactUs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: result.message || 'Message sent successfully!',
      };
    } else {
      const errorResult = await response.json();
      const errorMessages = Object.values(
        errorResult.errors
      ).flat() as string[];

      return {
        success: false,
        message: errorResult.title || 'Please correct the errors below.',
        errors:
          errorMessages.length > 0
            ? errorMessages
            : ['An unknown validation error occurred.'],
        fields: data,
      };
    }
  } catch (error) {
    console.error('ContactUs API call failed', error);
    return {
      success: false,
      message: 'Could not connect to the server. Please try again later.',
      errors: ['Server connection failed.'],
      fields: data,
    };
  }
}
