import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCookie } from './auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Attempt to extract userId from JWT payload claims
 */
export function getUserIdFromToken(): string | null {
  try {
    const token = getCookie('jwtToken');
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const payload = JSON.parse(jsonPayload) as Record<string, unknown>;
    const possibleKeys = ['userId', 'sub', 'nameid', 'nameId'];
    console.log(
      `Extracting userId from JWT payload using keys: ${jsonPayload}`
    );

    for (const key of possibleKeys) {
      const val = payload[key];
      if (typeof val === 'string' && val.length > 0) return val;
      console.log(`JWT payload key "${key}" not found or invalid`);
    }

    return null;
  } catch {
    return null;
  }
}
