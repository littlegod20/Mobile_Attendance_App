import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export type RecentCardProps = {
  week: string;
  course: string;
  date: string;
  present: boolean;
};

const RecentCard = ({ week, course, date, present }: RecentCardProps) => {
  return (
    <TouchableOpacity>
      <View className="flex flex-row w-full bg-white shadow-sm shadow-gray-300 h-28 p-2 rounded-lg mb-4">
        <View className="flex flex-col w-4/5 p-2">
          <ThemedText type="mediumSemi">{week}</ThemedText>
          <ThemedText>{course}</ThemedText>
        </View>

        <View className="h-full p-2 border-l-2 border-[#FF7A00] flex justify-start items-center">
          <ThemedText type="mediumSemi" className="mb-3 capitalize">
            {date}
          </ThemedText>
          {present ? (
            <FontAwesome name="check-square" size={24} color="green" />
          ) : (
            <MaterialIcons name="cancel" size={24} color="red" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentCard;
