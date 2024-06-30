import { API_URL } from "@env";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  school_id: string;
  role: "student" | "lecturer";
  year?: string;
  faculty?: string;
  programme?: string;
}

interface UserRegistrationContextType {
  userData: UserRegistrationData;
  updateUserData: (data: Partial<UserRegistrationData>) => void;
  submitRegistration: () => Promise<void>;
}

const UserRegistrationContext = createContext<
  UserRegistrationContextType | undefined
>(undefined);

export const UserRegistrationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserRegistrationData>({
    name: "",
    email: "",
    password: "",
    school_id: "",
    role: "student",
  });

  const updateUserData = (data: Partial<UserRegistrationData>) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const submitRegistration = async () => {
    console.log("Submitting registration data:", userData);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <UserRegistrationContext.Provider
      value={{ userData, updateUserData, submitRegistration }}
    >
      {children}
    </UserRegistrationContext.Provider>
  );
};

export const useUserRegistration = () => {
  const context = useContext(UserRegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useUserRegistration must be used within a UserRegistrationProvider"
    );
  }
  return context;
};
