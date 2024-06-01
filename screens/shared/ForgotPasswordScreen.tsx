import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ForgotPasswordScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Forgot Password Screen</Text>
      <Link href="./otp">OTP Screen</Link>
    </View>
  );
};

export default ForgotPasswordScreen;
