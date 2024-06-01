// /app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Slot, Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global.css";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const router = useRouter();

  const isDevelopment = true; // Setting this to true for development, 'false' for production

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (isDevelopment) {
        setIsOnboardingCompleted(false);
      } else {
        const completed = await AsyncStorage.getItem("onboardingCompleted");
        setIsOnboardingCompleted(completed === "true");
      }
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, [isDevelopment]);

  useEffect(() => {
    if (!isLoading && !isOnboardingCompleted) {
      router.replace("/shared_screens");
    }
  }, [isLoading, isOnboardingCompleted]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
};

export default Layout;
