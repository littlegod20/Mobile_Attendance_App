import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ResetPasswordScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>ResetPasswordScreen</Text>
      <Link href="/student/Main">Home</Link>
    </View>
  );
};

export default ResetPasswordScreen;
