import { ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { Appearance, useColorScheme } from "react-native";
import { getThemedStyles } from "../../themes/themedStyles";
import { darkTheme, lightTheme } from "../../themes/themes";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const StudentLecturerScreen = () => {
  // let colorScheme = useColorScheme();
  // let themedStyles;

  // if (colorScheme === "dark") {
  //   themedStyles = getThemedStyles(darkTheme);
  // } else if (colorScheme === "light") {
  //   themedStyles = getThemedStyles(lightTheme);
  // }

  const router = useRouter();

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 justify-center items-center "
        // style={themedStyles?.container}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.navigate({ pathname: "student/faculty_dept" })}
        >
          <FontAwesome6 name="user-graduate" size={24} color="white" />
          <ThemedText
            type="subtitle"
            className="ml-3"
            style={{ color: "white" }}
          >
            I'm a Student
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.navigate({ pathname: "lecturer/faculty_dept" })}
        >
          <FontAwesome5 name="chalkboard-teacher" size={24} color="white" />
          <ThemedText
            type="subtitle"
            className="ml-3"
            style={{ color: "white" }}
          >
            I'm a Lecturer
          </ThemedText>
        </TouchableOpacity>
      </ImageBackground>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#DC924D",
    display: "flex",
    flexDirection: "row",
    padding: 22,
    marginBottom: 35,
    width: 250,
    justifyContent: "center",
    borderRadius: 6,
  },
});

export default StudentLecturerScreen;
