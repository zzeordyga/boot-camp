const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

export function validateField(field, value) {
  if (field === "username") {
    const trimmed = value.trim();
    if (!trimmed) return "Username wajib diisi";
    if (trimmed.length < 3) return "Username minimal 3 karakter";
    if (!usernameRegex.test(trimmed)) {
      return "Username hanya boleh huruf, angka, dan underscore (_)";
    }
    return "";
  }

  if (field === "email") {
    const trimmed = value.trim();
    if (!trimmed) return "Email wajib diisi";
    if (!emailRegex.test(trimmed)) {
      return "Format email tidak valid (contoh: nama@gmail.com)";
    }
    return "";
  }

  if (field === "password") {
    if (!value) return "Password wajib diisi";
    if (value.length < 6) return "Password minimal 6 karakter";
    return "";
  }

  return "";
}

export function validateAuthForm(
  { username = "", email, password },
  { requireUsername = false } = {}
) {
  const errors = {};

  if (requireUsername) {
    const usernameError = validateField("username", username);
    if (usernameError) errors.username = usernameError;
  }

  const emailError = validateField("email", email);
  if (emailError) errors.email = emailError;

  const passwordError = validateField("password", password);
  if (passwordError) errors.password = passwordError;

  return errors;
}
