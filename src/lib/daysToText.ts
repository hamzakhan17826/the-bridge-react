import { addDays, formatDistanceStrict } from 'date-fns';

/**
 * Convert a number of days into a human-friendly duration string.
 * Examples: 3 -> "3 days", 30 -> "1 month", 180 -> "6 months", 365 -> "1 year"
 */
export default function daysToText(days?: number | string | null): string {
  if (days == null || days === '') return '';

  const n = Number(days);
  if (Number.isNaN(n)) return '';

  try {
    // Special-case common durations to return short labels
    if (n === 7) return 'week';
    if (n === 30) return 'month';
    if (n === 365) return 'year';
    const now = new Date();
    const future = addDays(now, n);
    // formatDistanceStrict chooses the best unit (days, months, years)
    return formatDistanceStrict(now, future, { roundingMethod: 'floor' });
  } catch (err) {
    return `${n} days`;
  }
}
