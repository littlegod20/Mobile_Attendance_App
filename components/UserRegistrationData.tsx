import { API_URL } from "@env";
import { CameraCapturedPicture } from "expo-camera";
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
  capturedImage?: CameraCapturedPicture | null;
}

interface UserRegistrationContextType {
  userData: UserRegistrationData;
  updateUserData: (data: Partial<UserRegistrationData>) => void;
  submitRegistration: () => Promise<void | string | boolean>;
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
      const formData = new FormData();

      //Appending the non-file fields
      // Append the non-file fields
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("school_id", userData.school_id);
      formData.append("role", userData.role);
      if (userData.year) formData.append("year", userData.year);
      if (userData.faculty) formData.append("faculty", userData.faculty);
      if (userData.programme) formData.append("programme", userData.programme);

      // Append the captured image if available
      if (userData.capturedImage) {
        formData.append("image", {
          uri: userData.capturedImage.uri,
          type: "image/jpeg", // or the appropriate MIME type for your image
          name: `${userData.name}.jpg`, // or a dynamic name
        } as any);
      }

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("Registration successful:", result);
      return true;
    } catch (error) {
      // console.error("Registration failed:", error);
      return false;
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
