import { ImageBackground } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Appearance, useColorScheme } from "react-native";
import { getThemedStyles } from "../../themes/themedStyles";
import { darkTheme, lightTheme } from "../../themes/themes";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";

const StudentLecturerScreen = () => {
  // let colorScheme = useColorScheme();
  // let themedStyles;

  // if (colorScheme === "dark") {
  //   themedStyles = getThemedStyles(darkTheme);
  // } else if (colorScheme === "light") {
  //   themedStyles = getThemedStyles(lightTheme);
  // }

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 justify-center items-center "
        // style={themedStyles?.container}
      >
        <ThemedText
          type="subtitle"
          className="bg-coffee_light p-5  rounded-lg  mb-4"
        >
          <Link href="./log_in" className="text-white">
            I'm a Student
          </Link>
        </ThemedText>

        <ThemedText type="subtitle" className="bg-coffee_light  p-5 rounded-lg">
          <Link href="./log_in" className="text-white">
            I'm a Lecturer
          </Link>
        </ThemedText>
      </ImageBackground>
    </ThemedView>
  );
};

export default StudentLecturerScreen;
