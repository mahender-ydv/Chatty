import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          {/* Logo / Heading */}
          <div className="text-center mb-4">
            <div className="bg-light rounded-circle d-inline-flex p-3 mb-2">
              <Mail className="text-primary" size={28} />
            </div>
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card shadow-sm p-4">
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-medium">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Mail size={18} className="text-muted" />
                </span>
                <input type="email" className="form-control" placeholder="you@example.com"
                  value={formData.email} onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value }) }
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock size={18} className="text-muted" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={isLoggingIn} >
                {isLoggingIn ? (
                  <> <Loader2 className="me-2 spinner-border spinner-border-sm" /> Loading... </> ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-3">
            <p className="text-muted">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary fw-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
