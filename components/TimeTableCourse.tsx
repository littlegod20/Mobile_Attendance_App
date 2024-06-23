import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "../contexts/ThemedText";

type TimeTableCourseProps = {
  course_name: string;
  course_code: string;
  start_time: string;
  finish_time: string;
};

const TimeTableCourse = ({
  start_time,
  finish_time,
  course_name,
  course_code,
}: TimeTableCourseProps) => {
  return (
    <View className="w-full justify-evenly items-center mb-4 flex flex-row h-28 border-coffee_light border-[1px] rounded-md">
      <View className="p-3 w-64 border-gray-600 border-r-[1px]">
        <ThemedText type="defaultSemiBold">{course_name}</ThemedText>
        <ThemedText type="defaultSemiBold">({course_code})</ThemedText>
      </View>

      <View className="p-2 h-full flex w-[20%] items-center justify-center ">
        <ThemedText type="defaultSemiBold">{start_time}</ThemedText>
        <Text>-</Text>
        <ThemedText type="defaultSemiBold">{finish_time}</ThemedText>
      </View>
    </View>
  );
};

export default TimeTableCourse;
