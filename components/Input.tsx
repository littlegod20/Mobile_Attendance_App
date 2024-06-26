import {
  KeyboardTypeOptions,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export type CustomInputProps = TextInputProps & {
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

const CustomInput = ({
  style,
  placeholder,
  lightColor,
  darkColor,
  secureTextEntry,
  keyboardType,
  multiline,
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

  const height = multiline ? 100 : 50;
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
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        {...rest}
      />
    </View>
  );
};

export default CustomInput;
