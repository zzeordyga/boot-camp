import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateRegister, firebaseErrorMessage } from "../utils/validation";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    const v = validateRegister(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      navigate("/user/profile", { replace: true });
    } catch (err) {
      setServerError(firebaseErrorMessage(err.code));
    } finally {
      setSubmitting(false);
    }
  }

  const field = (name, label, type, extra = {}) => (
    <label>
      {label}
      <input
        type={type}
        name={name}
        required
        value={form[name]}
        onChange={handleChange}
        className={errors[name] ? "invalid" : ""}
        {...extra}
      />
      {errors[name] && <small className="error">{errors[name]}</small>}
    </label>
  );

  return (
    <div className="card form-card">
      <h1>Register</h1>
      {serverError && <div className="alert">{serverError}</div>}

      <form onSubmit={handleSubmit}>
        {field("name", "Nama lengkap", "text", { minLength: 3, maxLength: 50, autoComplete: "name" })}
        {field("email", "Email", "email", { autoComplete: "email" })}
        {field("password", "Password", "password", {
          minLength: 8,
          pattern: "(?=.*[A-Z])(?=.*[0-9]).{8,}",
          title: "Minimal 8 karakter, mengandung huruf besar dan angka",
          autoComplete: "new-password",
        })}
        {field("confirmPassword", "Konfirmasi password", "password", { minLength: 8, autoComplete: "new-password" })}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>

      <p className="muted">
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
