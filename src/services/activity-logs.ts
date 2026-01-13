import api from '../lib/api';
import type { ActivityLogsFilters } from '../types/activity-logs';

export async function fetchActivityLogs(
  pageNumber: number,
  pageSize: number,
  filters?: ActivityLogsFilters
) {
  try {
    const requestData = {
      pageNumber,
      pageSize,
      ...(filters?.email && { email: filters.email }),
      ...(filters?.activityType && { activityType: filters.activityType }),
      ...(filters?.timestamp && { timestamp: filters.timestamp }),
    };

    const response = await api.post('/System/ActivityLogs', requestData);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs: ', error);
    throw error;
  }
}

export async function fetchListActivityUniqueTypes() {
  try {
    const response = await api.get('/System/ListActivityUniqueTypes');
    return response.data;
  } catch (error) {
    console.error('Error fetching list activity unique types', error);
    throw error;
  }
}
