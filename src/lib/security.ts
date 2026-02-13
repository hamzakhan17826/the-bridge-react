// Security patterns to block common XSS vectors
export const SECURITY_PATTERNS = {
  scriptTag: /<script\b[^>]*>([\s\S]*?)<\/script>/im,
  onEvent: /on\w+\s*=/im,
  javascriptHref: /href\s*=\s*['"]?javascript:/im,
  iframe: /<iframe\b[^>]*>([\s\S]*?)<\/iframe>/im,
};

/**
 * Validates a string against common XSS patterns.
 * Returns true if safe, or a descriptive error message if unsafe.
 */
export const validateSecurity = (
  value: string | undefined | null
): boolean | string => {
  if (!value) return true;

  if (SECURITY_PATTERNS.scriptTag.test(value))
    return 'Scripts are not allowed for security reasons.';

  if (SECURITY_PATTERNS.onEvent.test(value))
    return 'Inline event handlers (like onclick) are not allowed.';

  if (SECURITY_PATTERNS.javascriptHref.test(value))
    return 'JavaScript links are not allowed.';

  if (SECURITY_PATTERNS.iframe.test(value)) return 'Iframes are not allowed.';

  return true;
};
