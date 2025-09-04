
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState(""); // backend expects "email"
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const action = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(action)) {
        setMessage({ type: "success", text: "Login successful!" });
        navigate("/dashboard", { replace: true });
      } else {
        const errText = action.payload || "Login failed. Please try again.";
        setMessage({ type: "error", text: errText });
      }
    } catch {
      setMessage({ type: "error", text: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <div className="mx-auto w-full max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-8">
              <h1 className="text-[22px] font-semibold text-gray-900">Log In</h1>
              <p className="mt-2 text-sm text-gray-600">
                Log in using your email and password
              </p>
            </div>

            {message && (
              <div
                className={`mb-5 text-sm px-3 py-2 rounded border ${
                  message.type === "success"
                    ? "text-green-600 bg-green-50 border-green-200"
                    : "text-red-600 bg-red-50 border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full h-11 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="block text-[11px] font-medium text-gray-700 mb-2">
                <label className="block text-[11px] font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="........"
                    className="block w-full h-11 rounded-md border border-gray-200 bg-gray-50 px-3 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full h-11 rounded-md bg-[#0C1E5B] text-white text-sm font-medium hover:bg-[#0B1A50] transition-colors disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
