import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Text>SignUp</Text>
      <Link href="./log_in">SignUP</Link>
    </View>
  );
};

export default SignUp;
