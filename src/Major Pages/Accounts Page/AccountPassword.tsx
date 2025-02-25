import React, { useState, ChangeEvent } from "react";

interface AccountPasswordProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>; 
}

const AccountPassword: React.FC<AccountPasswordProps> = ({ 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword,
  setPasswordError
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pwd: string, confirmPwd: string) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*_]/.test(pwd);

    if (pwd.length < minLength) return "Password must be at least 12 characters long.";
    if (!hasUpperCase) return "Password must include at least one uppercase letter.";
    if (!hasNumber) return "Password must include at least one number.";
    if (!hasSpecialChar) return "Password must include at least one special character (!@#$%^&*_).";
    if (confirmPwd && pwd !== confirmPwd) return "Passwords do not match.";

    return "";
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword, confirmPassword));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError(validatePassword(password, newConfirmPassword));
  };

  return (
    <div>
      <label>Password:</label>
      <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} required />
      <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>

      <label>Confirm Password:</label>
      <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleConfirmPasswordChange} required />
      <button className="password-toggle" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default AccountPassword;
