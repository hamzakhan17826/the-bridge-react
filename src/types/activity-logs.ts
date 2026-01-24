export interface ActivityLog {
  id: number;
  userId: string;
  email: string;
  activityType: string;
  details: string;
  timestamp: string;
}

export interface ActivityLogsResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  activityLogs: ActivityLog[];
}

export interface ActivityLogsFilters {
  email?: string;
  activityType?: string;
  fromTimestamp?: string;
  toTimestamp?: string;
}

export type ListActivityUniqueTypes = string[];
