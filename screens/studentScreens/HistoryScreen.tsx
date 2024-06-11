import { View, Text, ImageBackground, ScrollView } from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import GoBackBtn from "../../components/GoBackBtn";
import { AntDesign } from "@expo/vector-icons";
import CustomDropDown from "../../components/CustomDropDown";
import Weeks from "../../components/Weeks";

export default function History() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const weeks = [
    {
      week: "Week One",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "yellow",
    },
    {
      week: "Week two",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "red",
    },
    {
      week: "Week three",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "yellow",
    },
    {
      week: "Week four",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "green",
    },
    {
      week: "Week two",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "red",
    },
    {
      week: "Week three",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "yellow",
    },
    {
      week: "Week four",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "green",
    },
    {
      week: "Week two",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "red",
    },
    {
      week: "Week three",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "yellow",
    },
    {
      week: "Week four",
      days: ["23rd Jan", "20th May", "4th June"],
      rating: "1/2",
      code: "green",
    },
  ];
  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full p-4"
      >
        <View className="h-[15%] flex justify-center mt-10">
          {/* <GoBackBtn path="./index" /> */}
          <CustomDropDown options={options} options_type="options" />
        </View>

        <View className="p-3"></View>

        {/* // Use FlatList instead */}
        <ScrollView
          className="flex-1 mb-20"
          showsVerticalScrollIndicator={false}
        >
          {weeks.map((item, index) => (
            <Weeks
              week={item.week}
              days={item.days}
              rating={item.rating}
              code={item.code}
              key={index}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </ThemedView>
  );
}
