import React, { forwardRef, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

export type InputProps = TextInputProps & {
  placeholder?: string;
  lightColor?: string;
  darkColor?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ style, placeholder, lightColor, darkColor, ...rest }, ref) => {
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
      <TextInput
        ref={ref}
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
    );
  }
);

interface OTPInputProps extends TextInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete, ...rest }) => {
  const [otp, setOtp] = React.useState<string[]>(Array(length).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if the current one is filled
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    // Call onComplete if all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputs.current[index] = ref)}
          {...rest}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  input: {
    height: 80,
    width: "22%",
    textAlign: "center",
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
  },
});
