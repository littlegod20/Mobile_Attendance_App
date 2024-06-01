import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const StudentLecturerScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Student/Lecturer Screen</Text>
      <Link href="/student/registration">Go to Student SignUp</Link>
      <Link href="/lecturer">Go to Lecturer SignUp</Link>
    </View>
  );
};

export default StudentLecturerScreen;
