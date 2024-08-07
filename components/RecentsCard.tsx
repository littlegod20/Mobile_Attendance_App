import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../contexts/ThemedText";

export type RecentCardProps = {
  course_code: string;
  course_name: string;
  time: string;
};

const RecentCard = ({ course_name, course_code, time }: RecentCardProps) => {
  return (
    <TouchableOpacity>
      <View className="flex flex-row w-full bg-white shadow-sm shadow-gray-300 h-28 p-2 rounded-lg mb-4">
        <View className="flex flex-col w-4/5 p-2 justify-center">
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-64"
          >
            {course_name}
          </ThemedText>
          <View className="w-[55%]">
            <ThemedText type="smallbold" className="mb-3 capitalize">
              {time}
            </ThemedText>
          </View>
        </View>

        <View className="h-full p-2 border-l-2 border-[#FF7A00] flex justify-center items-center">
          <ThemedText type="defaultSemiBold">{course_code}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentCard;
