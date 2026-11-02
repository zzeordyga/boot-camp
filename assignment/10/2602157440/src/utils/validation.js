// Manual (JS) validation, on top of the HTML5 attributes in the forms.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email)) errors.email = "Format email tidak valid.";

  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 6) errors.password = "Password minimal 6 karakter.";
  return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = {};
  const trimmed = name.trim();
  if (!trimmed) errors.name = "Nama wajib diisi.";
  else if (trimmed.length < 3) errors.name = "Nama minimal 3 karakter.";
  else if (trimmed.length > 50) errors.name = "Nama maksimal 50 karakter.";

  if (!email.trim()) errors.email = "Email wajib diisi.";
  else if (!EMAIL_RE.test(email)) errors.email = "Format email tidak valid.";

  if (!password) errors.password = "Password wajib diisi.";
  else if (password.length < 8) errors.password = "Password minimal 8 karakter.";
  else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
    errors.password = "Password harus mengandung huruf besar dan angka.";

  if (confirmPassword !== password) errors.confirmPassword = "Konfirmasi password tidak sama.";
  return errors;
}

// Map Firebase error codes to readable messages
export function firebaseErrorMessage(code) {
  const map = {
    "auth/email-already-in-use": "Email sudah terdaftar.",
    "auth/invalid-email": "Format email tidak valid.",
    "auth/weak-password": "Password terlalu lemah.",
    "auth/invalid-credential": "Email atau password salah.",
    "auth/user-not-found": "Akun tidak ditemukan.",
    "auth/wrong-password": "Email atau password salah.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
    "auth/network-request-failed": "Gagal terhubung ke jaringan.",
    "permission-denied": "Akses ditolak oleh Firestore Security Rules.",
  };
  return map[code] || "Terjadi kesalahan. Silakan coba lagi.";
}
