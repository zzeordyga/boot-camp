import { useState } from "react";

export default function Login({
  isLoading,
  error,
  onSubmitForm,
  onFormTypeChange,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (formData.email.trim() === "") {
      newErrors.email = "Email must be filled";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password must be filled";
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
        <h1 className="text-2xl font-bold">Login</h1>
        {error && (
          <div className="rounded-md bg-red-500 text-white p-2">{error}</div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter your email"
              type="email"
              id="email"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              id="password"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 cursor-pointer hover:bg-blue-400 active:bg-blue-600 transition-all duration-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => onFormTypeChange("REGISTER")}
          >
            Register
          </span>
        </p>
      </div>
      <div className="bg-blue-500 w-1/2 h-full rounded-r-md"></div>
    </>
  );
}
