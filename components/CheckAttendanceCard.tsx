import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../contexts/ThemedText";
import { useRouter } from "expo-router";

export type CheckAttendanceCardProps = {
  course: string;
  open: boolean;
};

const CheckAttendanceCard = ({ course, open }: CheckAttendanceCardProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => (open ? router.navigate("student/Main/settings") : null)}
    >
      <View className="w-full flex mb-4 flex-row gap-3">
        <View
          className={`w-[65%] bg-coffee flex h-28 ${
            open ? "" : "opacity-50"
          } items-center justify-center rounded-lg`}
        >
          <ThemedText type="subtitle" style={{ color: "white" }}>
            {course}
          </ThemedText>
        </View>

        <View
          className={`flex-1 ${
            open ? "" : "opacity-50"
          } bg-coffee flex items-center justify-center rounded-lg`}
        >
          <ThemedText className="text-center flex" style={{ color: "white" }}>
            Session
          </ThemedText>
          <ThemedText style={{ color: "white" }}>
            {open ? "Opened" : "Closed"}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CheckAttendanceCard;
