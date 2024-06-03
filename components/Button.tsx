import { Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../contexts/ThemedText";

type ButtonComponentProps = {
  title: string;
  onPress: any;
};

const Button = ({ title, onPress, ...rest }: ButtonComponentProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FFC107",
        display: "flex",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        // width: "100%",
      }}
      {...rest}
    >
      <ThemedText type="subtitle">{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default Button;
