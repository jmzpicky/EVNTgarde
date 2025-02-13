import React from "react";

interface AccountCredentialsProps {
  userType: string;
  setUserType: (type: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  businessType: string;
  setBusinessType: (type: string) => void;
}

const AccountCredentials: React.FC<AccountCredentialsProps> = ({
  userType,
  setUserType,
  email,
  setEmail,
  phone,
  setPhone,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  companyName,
  setCompanyName,
  businessName,
  setBusinessName,
  businessType,
  setBusinessType
}) => {
  return (
    <div>
      <label>User Type:</label>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="Customer">Customer</option>
        <option value="Organizer">Organizer</option>
        <option value="Vendor">Vendor</option>
      </select>

      {/* Customer Fields */}
      {userType === "Customer" && (
        <>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </>
      )}

      {/* Organizer Fields */}
      {userType === "Organizer" && (
        <>
          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </>
      )}

      {/* Vendor Fields */}
      {userType === "Vendor" && (
        <>
          <label>Business Name:</label>
          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />

          <label>Business Type:</label>
          <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} required>
            <option value="">Select Business Type</option>
            <option value="solo">Solo Vendor</option>
            <option value="company">Company Vendor</option>
          </select>
        </>
      )}

      {/* Shared Fields */}
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Phone (Optional):</label>
      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
  );
};

export default AccountCredentials;
