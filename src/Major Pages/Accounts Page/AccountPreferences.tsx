import React from "react";

interface AccountPreferencesProps {
    userType: string;
    industry: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
    services: string;
    setServices: React.Dispatch<React.SetStateAction<string>>;
    preferences: string[];
    setPreferences: React.Dispatch<React.SetStateAction<string[]>>; 
  }
  
const AccountPreferences: React.FC<AccountPreferencesProps> = ({
  userType,
  industry,
  setIndustry,
  services,
  setServices,
  preferences,
  setPreferences,
}) => {
  if (userType === "Customer") return null;

  // Define available system preferences
  const systemPreferences = ["Procurement", "Inventory", "Reservations", "Logistics"];

  // Handle checkbox selection for preferences
  const handlePreferenceChange = (preference: string) => {
    setPreferences((prevPreferences: string[]): string[] => 
        prevPreferences.includes(preference)
          ? prevPreferences.filter((p: string) => p !== preference)
          : [...prevPreferences, preference]
      );
      
  };
  
  

  return (
    <div>
      {/* Organizer: Select Industry */}
      {userType === "Organizer" && (
        <div>
          <label>Industry:</label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
            <option value="">Select an Industry</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Retail">Retail</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Transportation">Transportation</option>
          </select>
        </div>
      )}

      {/* Vendor: Select Services */}
      {userType === "Vendor" && (
        <div>
          <label>Services:</label>
          <select value={services} onChange={(e) => setServices(e.target.value)} required>
            <option value="">Select a Service</option>
            <option value="Procurement">Procurement</option>
            <option value="Inventory">Inventory</option>
            <option value="Reservations">Reservations</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>
      )}

      {/* System Preferences for Organizers and Vendors */}
      <div>
        <label>System Preferences:</label>
        {systemPreferences.map((preference) => (
          <div key={preference}>
            <input
              type="checkbox"
              value={preference}
              checked={preferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
            />
            <label>{preference}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountPreferences;
