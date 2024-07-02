import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../../../contexts/ThemedText";

export interface SessionCardProps {
  course_code: string;
  course_name: string;
  isOpen: boolean;
  onToggleSession: (
    course_code: string,
    course_name: string,
    action: "open" | "close"
  ) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  course_code,
  course_name,
  isOpen,
  onToggleSession,
}) => {
  const handlePress = () => {
    const action = isOpen ? "close" : "open";
    onToggleSession(course_code, course_name, action);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="w-full flex mb-4 flex-row gap-3">
        <View
          className={`w-[65%] bg-coffee flex h-28 ${
            isOpen ? "opacity-50" : ""
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
            isOpen ? "opacity-50" : ""
          } bg-coffee flex items-center justify-center rounded-lg`}
        >
          <ThemedText style={{ color: "white" }}>
            {isOpen ? "Close" : "Open"}
          </ThemedText>
          <ThemedText className="text-center flex" style={{ color: "white" }}>
            session
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SessionCard;
