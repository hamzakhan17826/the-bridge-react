import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCookie } from './auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Decode JWT payload safely; returns null on failure
export function decodeJwtPayload<T = Record<string, unknown>>(
  token?: string
): T | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Attempt to extract userId from JWT payload claims
 */
export function getUserIdFromToken(): string | null {
  try {
    const token = getCookie('jwtToken');
    const payload = decodeJwtPayload<Record<string, unknown>>(token);
    if (!payload) return null;
    const possibleKeys = ['userId', 'sub', 'nameid', 'nameId'];
    for (const key of possibleKeys) {
      const val = payload[key];
      if (typeof val === 'string' && val.length > 0) return val;
    }
    return null;
  } catch {
    return null;
  }
}

// Check if a JWT has expired based on its `exp` claim
export function isJwtExpired(
  token: string | undefined,
  skewMs = 5000
): boolean {
  if (!token) return true;
  try {
    const payload = decodeJwtPayload<{ exp?: number }>(token) ?? {};
    const expMs = (payload.exp ?? 0) * 1000;
    return Date.now() >= expMs - skewMs;
  } catch {
    return true;
  }
}

export function truncateText(
  text: string,
  maxLength: number
): { truncated: string; full: string } {
  if (text.length <= maxLength) {
    return { truncated: text, full: text };
  }
  return {
    truncated: `${text.substring(0, maxLength)}...`,
    full: text,
  };
}
