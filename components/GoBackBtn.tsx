import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export type GoBackBtnProps = {
  path: string;
};

const GoBackBtn = ({ path }: GoBackBtnProps) => {
  const handleBack = () => {
    router.navigate(path);
  };
  return (
    <TouchableOpacity
      style={{ width: "100%", padding: 5 }}
      onPress={handleBack}
    >
      <Ionicons name="arrow-back-circle" size={25} color={"#DC924D"} />
    </TouchableOpacity>
  );
};

export default GoBackBtn;
