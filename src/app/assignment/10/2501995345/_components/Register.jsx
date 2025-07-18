import { useState } from "react";

export default function Register({
  isLoading,
  error,
  onSubmitForm,
  onFormTypeChange,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (formData.email.trim() === "") {
      newErrors.email = "Email must be filled";
    } else {
      newErrors.email = "";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password must be filled";
    } else {
      newErrors.password = "";
    }

    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm password must be filled";
    } else {
      newErrors.confirmPassword = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      if (formData.confirmPassword.trim() !== "") {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onSubmitForm(formData);
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-1/2  p-6">
        <h1 className="text-2xl font-bold">Register</h1>
        {error && (
          <div className="rounded-md bg-red-500 text-white p-2">{error}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter an email"
              type="email"
              id="email"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter a password"
              type="password"
              id="password"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              placeholder="Enter password again"
              type="password"
              id="confirmPassword"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-400 active:bg-blue-600 transition-all duration-300"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => onFormTypeChange("LOGIN")}
          >
            Login
          </span>
        </p>
      </div>
      <div className="bg-blue-500 w-1/2 h-full rounded-l-md"></div>
    </>
  );
}
