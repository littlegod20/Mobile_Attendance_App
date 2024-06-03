import { TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

export type CustomInputProps = TextInputProps & {
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
  //   title?: string;
};

const CustomInput = ({
  style,
  placeholder,
  lightColor,
  darkColor,
  //   title,
  ...rest
}: CustomInputProps) => {
  const borderColor = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "inputBorder"
  );

  const color = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "text"
  );

  const height = 50;
  const borderWidth = 1;
  const borderRadius = 5;
  const paddingHorizontal = 10;
  const marginBottom = 10;
  const width = "100%";
  const fontFamily = "Montserrat-Regular";

  return (
    <View>
      <TextInput
        style={[
          {
            borderColor,
            height,
            borderWidth,
            borderRadius,
            paddingHorizontal,
            marginBottom,
            color,
            width,
            fontFamily,
          },
          style,
        ]}
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
};

export default CustomInput;
