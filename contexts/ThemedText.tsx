import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "smalldefault"
    | "smallbold"
    | "mediumRegular"
    | "mediumSemi";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "smalldefault" ? styles.smalldefault : undefined,
        type === "smallbold" ? styles.smallbold : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "mediumSemi" ? styles.mediumSemi : undefined,
        type === "mediumRegular" ? styles.mediumRegular : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Montserrat-Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Montserrat-SemiBold",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
    fontFamily: "Montserrat-SemiBold",
  },
  mediumRegular: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  mediumSemi: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  smalldefault: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: "gray",
  },
  smallbold: {
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
  },
});
