import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateFullName,
  validateEmail,
  validatePassword,
  formatAuthErrorMessage,
} from '../src/auth/validation.ts';

test('Full Name validation', () => {
  assert.equal(validateFullName('').valid, false);
  assert.equal(validateFullName('   ').valid, false);
  assert.equal(validateFullName('a').valid, false);
  assert.equal(validateFullName('1234').valid, false);
  assert.equal(validateFullName('Victor').valid, true);
  assert.equal(validateFullName('Victor Idika').valid, true);
});

test('Email validation', () => {
  assert.equal(validateEmail('').valid, false);
  assert.equal(validateEmail('invalid-email').valid, false);
  assert.equal(validateEmail('missing@domain').valid, false);
  assert.equal(validateEmail('@domain.com').valid, false);
  assert.equal(validateEmail('user@domain.com').valid, true);
  assert.equal(validateEmail('test.user+tag@sub.domain.co.uk').valid, true);
});

test('Password validation requirements', () => {
  // Empty
  const empty = validatePassword('');
  assert.equal(empty.valid, false);
  assert.equal(empty.score, 'weak');

  // Short (less than 8 chars)
  const short = validatePassword('Pass1');
  assert.equal(short.valid, false);
  assert.equal(short.requirements.minLength, false);

  // No numbers
  const noNumbers = validatePassword('PasswordOnly');
  assert.equal(noNumbers.valid, false);
  assert.equal(noNumbers.requirements.hasNumber, false);

  // No letters
  const noLetters = validatePassword('123456789');
  assert.equal(noLetters.valid, false);
  assert.equal(noLetters.requirements.hasLetter, false);

  // Valid medium password
  const validMedium = validatePassword('Password1');
  assert.equal(validMedium.valid, true);
  assert.equal(validMedium.score, 'medium');

  // Valid strong password
  const validStrong = validatePassword('P@ssw0rd2026!');
  assert.equal(validStrong.valid, true);
  assert.equal(validStrong.score, 'strong');
});

test('Format error messages for Supabase', () => {
  const duplicate = formatAuthErrorMessage({ message: 'User already registered' });
  assert.equal(duplicate.isDuplicate, true);
  assert.match(duplicate.message, /already exists/i);

  const invalidCreds = formatAuthErrorMessage({ message: 'Invalid login credentials' });
  assert.match(invalidCreds.message, /invalid email or password/i);

  const rateLimit = formatAuthErrorMessage({ message: 'over_email_send_rate_limit' });
  assert.match(rateLimit.message, /too many requests/i);
});
