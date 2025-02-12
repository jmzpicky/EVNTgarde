import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebase";
import "./AccountPassword.css";

const AccountPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const validatePassword = (pwd: string): string => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*_]/.test(pwd);

    if (pwd.length < minLength) return "Password must be at least 12 characters.";
    if (!hasUpperCase) return "Password must include at least one uppercase letter.";
    if (!hasNumber) return "Password must include at least one number.";
    if (!hasSpecialChar) return "Password must include at least one special character (!@#$%^&*_).";
    return "";
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(validatePassword(newPassword));
    setConfirmError(newPassword !== confirmPassword ? "Passwords do not match." : "");
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmError(newConfirmPassword !== password ? "Passwords do not match." : "");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!error && !confirmError) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm mx-auto p-4">
          <label htmlFor="email" className="mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="mt-4 mb-2 font-medium">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <label htmlFor="confirm-password" className="mt-4 mb-2 font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {confirmError && <p className="mt-2 text-sm text-red-500">{confirmError}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountPassword;
