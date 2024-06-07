import { View, ImageBackground, FlatList } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CheckAttendanceCard from "../../components/CheckAttendanceCard";
import GoBackBtn from "../../components/GoBackBtn";

type AttendanceData = {
  course: string;
  open: boolean;
};

const checkattendance: AttendanceData[] = [
  {
    course: "Basic Mechanics",
    open: false,
  },
  {
    course: "Applied Electricity",
    open: false,
  },
  {
    course: "EMC",
    open: true,
  },
  {
    course: "Computer Networking",
    open: false,
  },
  {
    course: "Linear Electronics",
    open: false,
  },
  {
    course: "Mechanics",
    open: false,
  },
];

const Check_AttendanceScreen = () => {
  return (
    <ThemedView className="flex-1 w-full ">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full items-center"
      >
        <View className="h-1/6 flex justify-end items-center w-full mb-8">
          <GoBackBtn path={"/student/Main/(tabs)"} />
          <ThemedText type="subtitle" className="text-black uppercase">
            Wednesday, 12th june, 2023
          </ThemedText>
        </View>

        <View className="w-full flex-1 flex items-center gap-7 p-2">
          <FlatList
            data={checkattendance}
            renderItem={({ item }) => (
              <View className="w-full">
                <CheckAttendanceCard course={item.course} open={item.open} />
              </View>
            )}
            keyExtractor={(item) => item.course}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          />
        </View>
      </ImageBackground>
    </ThemedView>
  );
};

export default Check_AttendanceScreen;
