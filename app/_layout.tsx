// /app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserRegistrationProvider } from "../components/UserRegistrationData";
import { CourseSessionProvider } from "../contexts/CoursesSessionContext";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const router = useRouter();

  const isDevelopment = true; // Setting this to true for development, 'false' for production

  useEffect(() => {
    // Loading custom fonts
    const loadFonts = async () => {
      await Font.loadAsync({
        "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        ...FontAwesome5.font,
      });
      setFontsLoaded(true);
    };

    // Checking if Onboarding has already been completed
    const checkOnboardingStatus = async () => {
      if (isDevelopment) {
        setIsOnboardingCompleted(false);
      } else {
        const completed = await AsyncStorage.getItem("onboardingCompleted");
        setIsOnboardingCompleted(completed === "true");
      }
    };

    const prepareApp = async () => {
      await loadFonts();
      await checkOnboardingStatus();
      SplashScreen.hideAsync(); // Hide the splash screen once everything is ready
    };

    prepareApp();
  }, [isDevelopment]);

  useEffect(() => {
    if (fontsLoaded && !isOnboardingCompleted) {
      router.replace("/");
    }
  }, [fontsLoaded, isOnboardingCompleted]);

  if (!fontsLoaded) {
    return null; // Optionally, you can render a loading spinner or placeholder here
  }

  return (
    <React.StrictMode>
      <UserRegistrationProvider>
        <CourseSessionProvider>
          <Slot />
          <Toast />
        </CourseSessionProvider>
      </UserRegistrationProvider>
    </React.StrictMode>
  );
};

export default RootLayout;
