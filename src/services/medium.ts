import api from '../lib/api';
import type {
  MediumProfileFormData,
  MediumProfileResponse,
  Medium,
} from '../types/medium';

export const fetchMediumProfile = async (): Promise<MediumProfileResponse> => {
  const response = await api.get('/Register/Medium');
  return response.data;
};

export const upsertMediumProfile = async (
  data: MediumProfileFormData,
  existingProfile?: MediumProfileResponse | null
): Promise<MediumProfileResponse> => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  if (existingProfile?.id) {
    formData.append('Id', existingProfile.id);
  }

  const response = await api.post('/Register/Medium', formData);
  return response.data;
};

export const fetchMediums = async (mediumId?: string): Promise<Medium[]> => {
  const response = await api.get('/Medium/Mediums', {
    params: mediumId ? { mediumId } : undefined,
  });
  return response.data;
};
