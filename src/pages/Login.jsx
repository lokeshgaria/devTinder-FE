import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { addUser } from "../utils/redux/feature/userSlice";
import { showSuccess, showError, showInfo, showWarning } from "../utils/notifications";
import AXIOS_API from "../utils/axios";
 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "lokesh@gmail.com",
    password: "Lokesh@12345",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
setErrors({})
      // Simulate API call
      const { data, status } = await AXIOS_API.post("/login", formData, {
        withCredentials: true,
      });

      // Handle login logic here

     
      if (data.success) {
        dispatch(addUser(data.data));
        navigate("/");
      }
      // Reset form after successful login
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log("Login attempt with:", error.message);
      setErrors({
        apiError: error.message
      })
      showError(`${error.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
          {/* Decorative Top Bar */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <LogIn className="w-8 h-8 text-base-100" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-base-content/60 mt-2">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input input-bordered w-full pl-12 transition-all duration-200 focus:input-primary ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="you@example.com"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <div className="flex justify-between items-center mb-2">
                  <label className="label-text font-semibold text-base-content flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-primary-focus transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input input-bordered w-full pl-12 pr-12 transition-all duration-200 focus:input-primary ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40">
                    <Lock className="w-5 h-5" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>
   {errors.apiError && <p className="text-sm text-red-500 ">{errors.apiError}</p> }
              {/* Remember Me */}
              {/* <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary checkbox-sm" 
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary w-full ${
                  isLoading ? "loading" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Social Login */}
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-6 border-t border-base-300">
              <p className="text-base-content/60">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-focus font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
      </div>
    </div>
  );
};

export default Login;
