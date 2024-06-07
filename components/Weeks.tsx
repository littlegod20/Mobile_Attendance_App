import React from "react";
import { View } from "react-native";
import { ThemedText } from "../contexts/ThemedText";

interface Day {
  date: string;
  value: string;
}

interface WeeksProps {
  week: string;
  days: string[];
  rating: string;
  code?: string;
}

const Weeks: React.FC<WeeksProps> = ({ week, days, rating, code }) => {
  return (
    <View className="h-28 items-center flex flex-row justify-between border-t-2 border-gray-400">
      <View className="w-4/5 h-3/4 items-start flex justify-evenly">
        <ThemedText type="subtitle">{week}</ThemedText>

        <View className="flex flex-row w-full justify-evenly">
          {days.map((item, index) => (
            <ThemedText key={index}>{item}</ThemedText>
          ))}
        </View>
      </View>

      {code === "yellow" ? (
        <View className="bg-yellow-500 p-3 rounded-lg">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {rating}
          </ThemedText>
        </View>
      ) : code === "red" ? (
        <View className="bg-red-600 p-3 rounded-lg">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {rating}
          </ThemedText>
        </View>
      ) : (
        <View className="bg-green-600 p-3 rounded-lg ">
          <ThemedText type="smallbold" style={{ color: "white" }}>
            {rating}
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default Weeks;
