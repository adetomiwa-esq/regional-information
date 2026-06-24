import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://regional-info-api.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      // Store auth data if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      localStorage.setItem("user", email);

      // Admin check
      if (email === "admin@gmail.com") {
        localStorage.setItem("role", "admin");
      } else {
        localStorage.setItem("role", "user");
      }

      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Invalid email or password";

      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-950">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>
        </div>

        {generalError && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-600 p-3 rounded-lg">
            {generalError}
          </div>
        )}

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                emailError
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-900"
              }`}
            />

            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className={`w-full border rounded-lg px-4 py-3 outline-none transition ${
                passwordError
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-900"
              }`}
            />

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-950 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;