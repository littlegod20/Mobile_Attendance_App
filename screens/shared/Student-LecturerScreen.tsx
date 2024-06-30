import {
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { useUserRegistration } from "../../components/UserRegistrationData";

const StudentLecturerScreen = () => {
  const { updateUserData } = useUserRegistration();
  const router = useRouter();

  const handleRoleSelection = (role: "student" | "lecturer") => {
    updateUserData({ role });
    router.navigate({
      pathname:
        role === "student" ? "student/faculty_dept" : "lecturer/faculty_dept",
    });
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 justify-center items-center"
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleRoleSelection("student")}
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
          onPress={() => handleRoleSelection("lecturer")}
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
