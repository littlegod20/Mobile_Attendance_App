import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const LogIn = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>LogIn</Text>
      <Link href="/shared_screens/forgot_password">Forgot Password?</Link>
    </View>
  );
};

export default LogIn;
