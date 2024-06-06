import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

type ButtonComponentProps = {
  lightColor?: string;
  darkColor?: string;
  title: string;
  onPress: any;
  customStyle?: object;
};

const Button = ({
  lightColor,
  darkColor,
  title,
  onPress,
  customStyle,
  ...rest
}: ButtonComponentProps) => {
  const bgcolor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "button"
  );
  const buttonText = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonText"
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: bgcolor,
          display: "flex",
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
        },
        customStyle,
      ]}
      {...rest}
    >
      <ThemedText type="subtitle" customStyle={{ color: "white" }}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default Button;
