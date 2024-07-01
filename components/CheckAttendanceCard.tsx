import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../contexts/ThemedText";
import { useRouter } from "expo-router";

export type CheckAttendanceCardProps = {
  course_code: string;
  course_name: string;
  action: string;
};

const CheckAttendanceCard = ({
  course_code,
  course_name,
  action,
}: CheckAttendanceCardProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        action === "open" ? router.navigate("student/Main/settings") : null
      }
    >
      <View className="w-full flex mb-4 flex-row gap-3">
        <View
          className={`w-[65%] bg-coffee flex h-28 ${
            action === "open" ? "" : "opacity-50"
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
            action === "open" ? "" : "opacity-50"
          } bg-coffee flex items-center justify-center rounded-lg`}
        >
          <ThemedText className="text-center flex" style={{ color: "white" }}>
            Session
          </ThemedText>
          <ThemedText style={{ color: "white" }}>
            {action === "open" ? "opened" : "closed"}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckAttendanceCard;
