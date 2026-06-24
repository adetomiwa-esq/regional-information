import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  // Mock credentials
  const validEmail = "admin@gmail.com";
  const validEmail2= "user@gmail.com"
  const validPassword = "12345";

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    setLoading(true);

    setTimeout(() => {
      let hasError = false;

      if (email !== validEmail) {
        setEmailError("Incorrect email address");
        hasError = true;
      }
      if(email == validEmail2){
        hasError = false
      }

      if (password !== validPassword) {
        setPasswordError("Incorrect password");
        hasError = true;
      }

      setLoading(false);

      if (!hasError) {
        localStorage.setItem("user", email)
        navigate("/dashboard");
      }
    }, 2000);
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
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 outline-none transition
                ${
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
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 outline-none transition
                ${
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

          {/* Button */}
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
        </div>
      </div>
    </div>
  );
};

export default Login;