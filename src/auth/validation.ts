/**
 * User authentication validation utilities for Vizid
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface PasswordValidationResult extends ValidationResult {
  score: 'weak' | 'medium' | 'strong';
  requirements: {
    minLength: boolean;
    hasLetter: boolean;
    hasNumber: boolean;
    hasSpecialOrUpper?: boolean;
  };
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates a user's full name.
 */
export function validateFullName(name: string): ValidationResult {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Full name is required.' };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters.' };
  }
  if (!/[a-zA-Z]/.test(trimmed)) {
    return { valid: false, error: 'Full name must contain letters.' };
  }
  return { valid: true };
}

/**
 * Validates email format.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Email address is required.' };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

/**
 * Validates password strength:
 * - At least 8 characters
 * - Contains at least one letter
 * - Contains at least one number
 */
export function validatePassword(password: string): PasswordValidationResult {
  const val = password || '';
  const minLength = val.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  const hasUpper = /[A-Z]/.test(val);
  const hasLower = /[a-z]/.test(val);
  const hasSpecial = /[^a-zA-Z0-9]/.test(val);

  const requirements = {
    minLength,
    hasLetter,
    hasNumber,
    hasSpecialOrUpper: (hasUpper && hasLower) || hasSpecial,
  };

  if (!val) {
    return {
      valid: false,
      error: 'Password is required.',
      score: 'weak',
      requirements,
    };
  }

  if (!minLength) {
    return {
      valid: false,
      error: 'Password must be at least 8 characters long.',
      score: 'weak',
      requirements,
    };
  }

  if (!hasLetter || !hasNumber) {
    return {
      valid: false,
      error: 'Password must contain both letters and numbers.',
      score: 'weak',
      requirements,
    };
  }

  // Calculate score
  let score: 'medium' | 'strong' = 'medium';
  if (val.length >= 10 && hasUpper && hasLower && hasNumber && hasSpecial) {
    score = 'strong';
  } else if (val.length >= 10 && (hasSpecial || (hasUpper && hasLower))) {
    score = 'strong';
  }

  return {
    valid: true,
    score,
    requirements,
  };
}

/**
 * Maps Supabase error responses to user-friendly messages.
 */
export function formatAuthErrorMessage(error: any): { message: string; isDuplicate?: boolean } {
  if (!error) return { message: 'An unknown error occurred.' };

  const rawMessage = (error.message || error.error_description || String(error)).toLowerCase();

  if (rawMessage.includes('already registered') || rawMessage.includes('user already exists') || rawMessage.includes('email address already taken')) {
    return {
      message: 'An account with this email address already exists. Please sign in instead.',
      isDuplicate: true,
    };
  }

  if (rawMessage.includes('invalid login credentials') || rawMessage.includes('invalid grant') || rawMessage.includes('wrong password')) {
    return {
      message: 'Invalid email or password. Please verify your details and try again.',
    };
  }

  if (rawMessage.includes('email not confirmed')) {
    return {
      message: 'Your email address has not been confirmed yet. Please check your inbox for the confirmation link.',
    };
  }

  if (rawMessage.includes('rate limit') || rawMessage.includes('too many requests') || rawMessage.includes('over_email_send_rate_limit')) {
    return {
      message: 'Too many requests. Please wait a few moments before trying again.',
    };
  }

  if (rawMessage.includes('password should be at least')) {
    return {
      message: 'Password must be at least 8 characters long and contain both letters and numbers.',
    };
  }

  // Fallback to original or clean string
  return {
    message: error.message || 'Authentication error occurred. Please try again.',
  };
}
