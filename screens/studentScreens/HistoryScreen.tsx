import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import GoBackBtn from "../../components/GoBackBtn";
import { AntDesign } from "@expo/vector-icons";
import CustomDropDown from "../../components/CustomDropDown";
import Weeks from "../../components/Weeks";
import { useEffect, useState } from "react";
import { API_URL } from "@env";

type WeeksProps = {
  week: string;
  days: string[];
  rating: string;
  code: string;
};
[];

type OptionsProps = {
  label: string;
  value: string;
};

export default function History() {
  const [weeks, setWeeks] = useState<WeeksProps[]>([]);
  const [options, setOptions] = useState<OptionsProps[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionsProps>();

  useEffect(() => {
    // fetchHistory();client/screens/studentScreens/HistoryScreen.tsx
    fetchOptions();
  }, []);

  // Fetching data from server
  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API_URL}/student_options`);
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Failed to fetch student course options", error);
    }
  };

  const handleOptionSelect = async (option: OptionsProps) => {
    try {
      const response = await fetch(
        `${API_URL}/student/attendance?${option.value}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch option value");
      }
      const data = await response.json();
      setSelectedOption(option);
      setWeeks(data);
      // console.log(data);
      // console.log("Weeks Data:", weeks);
    } catch (error) {
      console.error(
        "Failed to fetch student's data for selected options:",
        error
      );
    }
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full p-4"
      >
        <View className="h-[15%] flex justify-center mt-10">
          <CustomDropDown
            options={options}
            options_type="Programme"
            onSelectOption={handleOptionSelect}
            selectedOption={selectedOption}
          />
        </View>

        <View className="p-3"></View>
        {weeks.length > 0 ? (
          <FlatList
            data={weeks}
            renderItem={({ item }) => (
              <Weeks
                week={item.week}
                days={item.days}
                rating={item.rating}
                code={item.code}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            className="mb-20"
          />
        ) : (
          <View className="flex w-full flex-1 justify-center items-center">
            <ThemedText style={{ color: "gray" }} className="italic ">
              No history for this course
            </ThemedText>
          </View>
        )}
        <StatusBar barStyle={"dark-content"} />
      </ImageBackground>
    </ThemedView>
  );
}
