// app/OnboardingScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const router = useRouter();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("./student-lecturer");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Button title="Get Started" onPress={completeOnboarding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default OnboardingScreen;
