// themeStyles.ts
import { StyleSheet } from "react-native";
import { Theme } from "./themes";

export const getThemedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.bg,
    },
    text: {
      fontSize: 16,
      //   color: theme.colors.secondary
    },
    link: {
      fontSize: 16,
      color: theme.colors.secondary,
    },
    button: {
      fontSize: 16,
      color: theme.colors.primary,
    },
  });
};
