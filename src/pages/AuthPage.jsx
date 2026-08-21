import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import AXIOS_API from "../utils/axios";
import "../Auth.css";
import Logo from "../components/Logo";
import { API_END_POINTS } from "../utils/constants";
// import { supabase } from '../lib/supabase';
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { addUser } from "../utils/redux/feature/userSlice";
import { showError, showSuccess, showInfo } from "../utils/notifications";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  const INITIAL_STATE = {
    email: "lokesh@gmail.com",
    password: "Lokesh@12345",
    name: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const validateForm = () => {
    const newErrors = {};
    const { email, password, name, lastName } = formData;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    setParallax({
      x: dx * 6,
      y: dy * 4,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (mode === "signup") {
        if (!validateForm()) return;
        console.log("Attempting signup with:", formData);

        // if (err) throw err;
        const PAYLOAD = {
          email: formData.email,
          password: formData.password,
          lastName: formData.lastName,
          firstName: formData.name,
        };

        const { data } = await AXIOS_API.post(
          `${API_END_POINTS.AUTH}/signup`,
          PAYLOAD,
        );

        // Handle login logic here

        if (data.success) {
          setFormData(INITIAL_STATE);
          showInfo(data.message);

          setTimeout(() => {
            setMode("login");
          }, 1500);
        }
        // Reset form after successful login
      } else {
        const PAYLOAD = {
          email: formData.email,
          password: formData.password,
        };
        const { data, status } = await AXIOS_API.post(
          `${API_END_POINTS.AUTH}/login`,
          PAYLOAD,
          {
            withCredentials: true,
          },
        );

        if (data.success) {
          setFormData(INITIAL_STATE);
          dispatch(addUser(data.data));
          showSuccess(data.message || "Logged in successfully!");
          setTimeout(() => {
            navigate("/");
          }, 1500);
          //
        }
      }
    } catch (err) {
      console.log("Auth attempt with:", err);

      showError(err.error.message);
    } finally {
      setLoading(false);
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
    <div
      ref={containerRef}
      className="auth-root"
      style={{
        "--px": `${parallax.x}px`,
        "--py": `${parallax.y}px`,
        backgroundImage:
          "url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200)",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Your JSX remains exactly same */}
      {/* Dark overlay for contrast */}
      <div className="auth-overlay" />

      {/* Floating background objects */}
      <div
        className="float-obj float-obj-heart1"
        style={{
          transform: `translate(calc(-50% + var(--px, 0px) * 1.8), calc(-50% + var(--py, 0px) * 1.8))`,
        }}
      >
        <Heart className="text-blue-200/20" size={56} strokeWidth={1.5} />
      </div>
      <div
        className="float-obj float-obj-heart2"
        style={{
          transform: `translate(calc(-50% + var(--px, 0px) * -1.2), calc(-50% + var(--py, 0px) * -1.4))`,
        }}
      >
        <Heart className="text-white/10" size={38} strokeWidth={1.5} />
      </div>
      <div
        className="float-obj float-obj-spark"
        style={{
          transform: `translate(calc(-50% + var(--px, 0px) * 2.2), calc(-50% + var(--py, 0px) * 1))`,
        }}
      >
        <Sparkles className="text-blue-100/15" size={44} strokeWidth={1.5} />
      </div>

      {/* Scribble ring */}
      <div className="scribble-ring">
        <svg
          className="scribble-svg"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 8 C90 6, 114 28, 112 60 C110 90, 88 114, 58 112 C28 110, 6 88, 8 58 C10 28, 32 10, 60 8Z"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="400"
            className="scribble-path"
          />
          <path
            d="M60 18 C84 16, 104 36, 102 60 C100 84, 80 104, 56 102 C32 100, 16 80, 18 56 C20 32, 38 20, 60 18Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 8"
          />
        </svg>
      </div>

      {/* Main card — iOS Glass Style */}
      <div
        className={`auth-card ${mounted ? "auth-card--visible" : ""}`}
        style={{
          transform: `translate(calc(-50% + var(--px, 0px) * 0.3), calc(-50% + var(--py, 0px) * 0.2))`,
        }}
      >
        {/* Form panel */}
        <div className="auth-form-panel">
          {/* Logo */}
          <div
            className={`hero-el hero-logo ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.05s" }}
          >
            <div className="logo-mark">
              <Logo />
            </div>
            <span className="logo-text">Amore</span>
          </div>

          {/* Headline */}
          <div
            className={`hero-el ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.12s" }}
          >
            <h1 className="form-headline">
              {mode === "login" ? "Welcome back" : "Find your person"}
            </h1>
            <p className="form-subheadline">
              {mode === "login"
                ? "Log in to continue your story."
                : "Create your account and start connecting."}
            </p>
          </div>

          {/* Tab switcher */}
          <div
            className={`hero-el tab-switcher ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.18s" }}
          >
            <button
              className={`tab-btn ${mode === "login" ? "tab-btn--active" : ""}`}
              onClick={() => switchMode("login")}
            >
              Log in
            </button>
            <button
              className={`tab-btn ${mode === "signup" ? "tab-btn--active" : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`hero-el auth-form ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.26s" }}
          >
            {mode === "signup" && (
              <>
                <div className="field-group">
                  <label className="field-label">First name</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error ">
                        {errors.name}
                      </span>
                    </label>
                  )}
                </div>
                <div className="field-group">
                  <label className="field-label">Last name</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="Your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.lastName}
                      </span>
                    </label>
                  )}
                </div>
              </>
            )}

            <div className="field-group">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="password-wrap">
                <input
                  className="field-input field-input--password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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

            {mode === "login" && (
              <div className="form-row-helper">
                <label className="remember-label">
                  <input type="checkbox" className="remember-check" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-link">
                  Forgot password?
                </button>
              </div>
            )}

            {/* {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>} */}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <>
                  <span>{mode === "login" ? "Log in" : "Create account"}</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            className={`hero-el divider-row ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.34s" }}
          >
            <span className="divider-line" />
            <span className="divider-text">or continue with</span>
            <span className="divider-line" />
          </div>

          {/* Social row */}
          <div
            className={`hero-el social-row ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.40s" }}
          >
            <button className="social-btn" aria-label="Google">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="social-btn" aria-label="Apple">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          <p
            className={`hero-el footer-note ${mounted ? "hero-el--visible" : ""}`}
            style={{ transitionDelay: "0.46s" }}
          >
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              className="switch-link"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
