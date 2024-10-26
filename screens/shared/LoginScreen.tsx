import { useState } from "react";
import { View, ImageBackground, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";
import KeyboardAvoidanceContainer from "../../components/KeyboardAvoidance";
import { API_URL } from "@env";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { InputConfig } from "../../utils/types";
import Toast from "react-native-toast-message";

const LogIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
    try {
      setLoading(true);
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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || `HTTP error! status: ${response.status}`);
      }

      if (data.access_token) {
        // Store the token in state
        setAuthToken(data.access_token);

        // storing the token in localStorage for persistence across page reloads
        await SecureStore.setItemAsync("authToken", data.access_token);
        await SecureStore.setItemAsync("email", data.user.email);
        await SecureStore.setItemAsync("faculty", data.user.faculty);
        await SecureStore.setItemAsync("name", data.user.name);
        await SecureStore.setItemAsync("programme", data.user.programme);
        await SecureStore.setItemAsync("role", data.user.role);
        await SecureStore.setItemAsync(
          "school_id",
          String(data.user.school_id)
        );
        await SecureStore.setItemAsync("year", String(data.user.year));
        await SecureStore.setItemAsync("password", data.user.password);

        console.log("Login successful");
        setLoading(true);
        // Redirect user or update UI to reflect logged-in state
        if (data.user.role === "student") {
          router.navigate({ pathname: "/student/Main/(tabs)" });
        } else {
          router.navigate({ pathname: "/lecturer/LecturerMain/(tabs)" });
        }
      } else {
        setLoading(false);
        console.error("Login failed: No token received");
      }
    } catch (error: any) {
      // console.error("Login error:", error);
      Toast.show({
        type: "error",
        text1: `Login Failed`,
        text1Style: { fontSize: 14, color: "red" },
        text2: `${error}` || "An unknown error occurred",
        text2Style: { fontSize: 14, color: "black" },
      });
      console.log(
        "login email>password:",
        formValues.email,
        formValues.password
      );
      // Handle login error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full flex-col justify-center"
      >
        {loading === false ? (
          <ThemedView className="flex-1">
            <View className="h-1/4 p-[20px] flex flex-col justify-end  items-start w-full">
              <ThemedText type="title">Log in to your account</ThemedText>
              <ThemedText type="smalldefault" className="text-gray-300">
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
                link_path="shared_screens/sign_up"
              />
            </KeyboardAvoidanceContainer>
          </ThemedView>
        ) : (
          <View className="flex-1 flex justify-center items-center">
            <ActivityIndicator size="large" color="#A66d37" />
          </View>
        )}
      </ImageBackground>
    </ThemedView>
  );
};

export default LogIn;
