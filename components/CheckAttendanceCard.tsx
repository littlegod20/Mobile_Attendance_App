import { View, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../contexts/ThemedText";

export type CheckAttendanceCardProps = {
  course_code: string;
  course_name: string;
  action: string;
  attendance_checked: boolean;
  handleClick: (val: string, val2: string) => void;
};

const CheckAttendanceCard = ({
  course_code,
  course_name,
  action,
  attendance_checked,
  handleClick,
}: CheckAttendanceCardProps) => {
  const isActive = action === "open" && !attendance_checked;

  return (
    <TouchableOpacity
      onPress={() => (isActive ? handleClick(course_name, course_code) : null)}
      disabled={!isActive}
    >
      <View className="w-full flex mb-4 flex-row gap-3">
        <View
          className={`w-[65%] bg-coffee flex h-28 ${
            isActive ? "" : "opacity-50"
          } items-center justify-center rounded-lg`}
        >
          <ThemedText
            type="subtitle"
            style={{ color: "white" }}
            className="w-44 text-center"
          >
            {course_name}
          </ThemedText>
        </View>
        <View
          className={`flex-1 ${
            isActive ? "" : "opacity-50"
          } bg-coffee flex items-center justify-center rounded-lg`}
        >
          <ThemedText className="text-center flex" style={{ color: "white" }}>
            {attendance_checked ? "Checked" : "Session"}
          </ThemedText>
          <ThemedText style={{ color: "white" }}>
            {attendance_checked ? "In" : action}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckAttendanceCard;
