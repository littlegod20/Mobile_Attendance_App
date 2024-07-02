import React from "react";
import { View } from "react-native";
import { ThemedText } from "../../../contexts/ThemedText";
import { WeeksProps } from "../../../utils/types";

const Weeks: React.FC<WeeksProps> = ({
  week,
  attendance,
  code,
  attendance_fraction,
}) => {
  return (
    <View className="h-28 items-center flex flex-row justify-between border-t-2 border-gray-400">
      <View className="w-4/5 h-3/4 items-start flex justify-evenly">
        <ThemedText type="subtitle">Week {week}</ThemedText>
        {/* <View>
          <ThemedText>
            {attendance_fraction && (attendance_fraction * 100).toFixed(0)} %
          </ThemedText>
        </View> */}
      </View>

      {code === "yellow" ? (
        <View className="bg-yellow-500 p-3 rounded-lg">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {attendance}
          </ThemedText>
        </View>
      ) : code === "red" ? (
        <View className="bg-red-600 p-3 rounded-lg">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {attendance}
          </ThemedText>
        </View>
      ) : (
        <View className="bg-green-600 p-3 rounded-lg ">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {attendance}
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default Weeks;
