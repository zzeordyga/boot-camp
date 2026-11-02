import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin, firebaseErrorMessage } from "../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const v = validateLogin(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      const profile = await login(form.email.trim(), form.password, form.remember);
      const fallback = profile?.role === "admin" ? "/admin/dashboard" : "/user/profile";
      navigate(location.state?.from || fallback, { replace: true });
    } catch (err) {
      setServerError(firebaseErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card form-card">
      <h1>Login</h1>
      {serverError && <div className="alert">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate={false}>
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            required
            minLength={6}
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "invalid" : ""}
          />
          {errors.password && <small className="error">{errors.password}</small>}
        </label>

        <label className="check">
          <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
          Ingat saya (local persistence)
        </label>

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Memproses..." : "Login"}
        </button>
      </form>

      <p className="muted">
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
}
