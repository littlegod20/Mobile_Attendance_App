import { useState } from "react";
import { View, ImageBackground } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";
import KeyboardAvoidanceContainer from "../../components/KeyboardAvoidance";
import { InputConfig } from "./SignUpScreen";
import { API_URL } from "@env";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const LogIn = () => {
  const inputConfigs: InputConfig[] = [
    {
      name: "email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      secureTextEntry: true,
    },
  ];

  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleFormSubmit = async (formValues: { [key: string]: string }) => {
    // console.log("Form Values:", formValues);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.access_token) {
        // Store the token in state
        setAuthToken(data.access_token);

        // storing the token in localStorage for persistence across page reloads
        await SecureStore.setItemAsync("authToken", data.access_token);
        await SecureStore.setItemAsync("email", data.user.email);
        // await SecureStore.setItemAsync("faculty", data.user.faculty);
        await SecureStore.setItemAsync("name", data.user.name);
        await SecureStore.setItemAsync("programme", data.user.programme);
        await SecureStore.setItemAsync("role", data.user.role);
        // await SecureStore.setItemAsync("school_id", data.user.school_id);
        await SecureStore.setItemAsync("year", data.user.year);

        console.log("Login successful");
        // Redirect user or update UI to reflect logged-in state
        router.navigate({ pathname: "/shared_screens/forgot_password" });
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      console.log(
        "login email>password:",
        formValues.email,
        formValues.password
      );
      // Handle login error (e.g., show error message to user)
    }
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full  justify-center items-center"
      >
        <View className="h-1/4 p-[20px] flex flex-col justify-end  items-start w-full">
          <ThemedText type="title">Log in to your account</ThemedText>
          <ThemedText type="smalldefault" className="text--300">
            Welcome, please enter your details
          </ThemedText>
        </View>

        <KeyboardAvoidanceContainer>
          <CustomForm
            inputs={inputConfigs}
            onSubmit={handleFormSubmit}
            buttonTitle="Log In"
            // path={"/shared_screens/forgot_password"}
            message="Don't have an account?"
            link_name="Sign Up"
            link_path="student/registration"
          />
        </KeyboardAvoidanceContainer>
      </ImageBackground>
    </ThemedView>
  );
};

export default LogIn;
