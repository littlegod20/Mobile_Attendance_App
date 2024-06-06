import { View, type ViewProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  customStyles?: object;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  customStyles,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={[{ backgroundColor }, style, customStyles]} {...otherProps} />
  );
}
