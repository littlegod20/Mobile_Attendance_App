import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const OTP_Screen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>OTP_Screen</Text>
      <Link href="./reset_password">Reset Password</Link>
    </View>
  );
};

export default OTP_Screen;
