import { isFirebaseConfigured } from './firebase';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(value) {
  const name = value.trim();
  if (!name) return 'Name is required.';
  if (name.length > 50) return 'Name must be 50 characters or fewer.';
  return '';
}

export function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'Email is required.';
  if (!emailPattern.test(email)) return 'Enter a valid email address, like name@example.com.';
  return '';
}

export function validateNewPassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must contain at least one letter and one number.';
  return '';
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Please confirm your password.';
  if (password !== confirm) return 'Passwords do not match.';
  return '';
}

function withoutEmpty(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}

export function validateRegister(values) {
  return withoutEmpty({
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validateNewPassword(values.password),
    confirm: validateConfirm(values.password, values.confirm),
  });
}

export function validateLogin(values) {
  return withoutEmpty({
    email: validateEmail(values.email),
    password: values.password ? '' : 'Password is required.',
  });
}

const authMessages = {
  'auth/email-already-in-use': 'That email is already registered. Try logging in instead.',
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/user-not-found': 'Wrong email or password.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/weak-password': 'That password is too weak. Use at least 8 characters with a letter and a number.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/network-request-failed': 'Could not reach Firebase. Check your internet connection.',
  'auth/operation-not-allowed': 'Email/password sign-in is not enabled for this Firebase project.',
  'auth/configuration-not-found': 'Firebase Authentication is not set up for this project yet.',
  'auth/invalid-api-key': 'The Firebase API key is invalid. Check your .env.local file.',
  'permission-denied': 'Firestore rejected the request because of its security rules.',
  unavailable: 'Could not reach Firestore. Check your internet connection.',
};

export function describeError(error) {
  if (!isFirebaseConfigured) {
    return 'Firebase is not configured. Copy .env.local.example to .env.local and fill in your firebaseConfig values.';
  }
  return authMessages[error?.code] ?? error?.message ?? 'Something went wrong. Please try again.';
}

export function safeRedirect(target, fallback) {
  if (typeof target === 'string' && target.startsWith('/') && !target.startsWith('//')) return target;
  return fallback;
}
