import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();

  // Thêm các state cho form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [state, setState] = useState("login"); // Hoặc "register" nếu muốn dạng hai form

  // Hàm thay đổi value input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "login") {
      try {
        const res = await axios.post("http://localhost:3000/api/v1/login", {
          email: formData.email,
          password: formData.password,
        });
        const accessToken = res.data.accessToken;
        const user = res.data.user;
        if (accessToken && user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", accessToken);
          toast.success("Đăng nhập thành công!");
          window.location.href = "/"; // chuyển hướng về trang chủ
        } else {
          toast.error("Không nhận được accessToken hoặc thông tin user!");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Đăng nhập thất bại!");
      }
    } else {
      // Đăng ký tài khoản mới
      try {
        const res = await axios.post("http://localhost:3000/api/v1/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Tạo tài khoản thành công! Bạn hãy đăng nhập.");
        setState("login"); // chuyển về form đăng nhập
      } catch (error) {
        toast.error(error?.response?.data?.message || "Đăng ký thất bại!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Nút quay về trang chủ */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors font-medium group"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex justify-center pt-6 pb-1 border-b border-gray-100/50">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Fruit
              </span>
              Hub
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-8 pt-4 pb-2 text-center border-b border-gray-100">
              <h1 className="text-gray-800 text-3xl font-bold tracking-tight">
                {state === "login" ? "Login Form" : "Sign Up Form"}
              </h1>
            </div>

            <div className="px-8 py-6 space-y-5">
              {state !== "login" && (
                <div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      className="w-full mb-3 pl-3 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 text-sm"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      className="w-full pl-3 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 text-sm"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-3 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-bold rounded-xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
              >
                {state === "login" ? "Sign In" : "Create Account"}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">
                  {state === "login"
                    ? "New to FruitHub?"
                    : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) =>
                      prev === "login" ? "register" : "login"
                    )
                  }
                  className="text-green-600 hover:text-green-700 font-semibold transition-all duration-300"
                >
                  {state === "login" ? "Create Account" : "Sign In Instead"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
