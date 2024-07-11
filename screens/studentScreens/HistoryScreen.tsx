import { View, ImageBackground, StatusBar, FlatList } from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomDropDown from "../../components/CustomDropDown";
import Weeks from "./components/Weeks";
import { useEffect, useState } from "react";
import { API_URL } from "@env";
import fetchWithAuth from "../../services/fetchWithAuth";
import * as SecureStore from "expo-secure-store";
import { CourseData, Option, User, WeeksProps } from "../../utils/types";
import { ActivityIndicator } from "react-native";

export default function History() {
  const [user, setUser] = useState<User | null>(null);
  const [weeks, setWeeks] = useState<WeeksProps[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option>();
  const [studentHistory, setStudentHistory] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchOptions();
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("Updating options:", options);
  // }, [options]);

  const fetchUserData = async () => {
    try {
      const programme = await SecureStore.getItemAsync("programme");
      const year = await SecureStore.getItemAsync("year");

      if (programme && year) {
        setUser({
          programme,
          year,
        });
      } else {
        console.error("Some user data is missing from secure storage");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const response = await fetchWithAuth(
        `${API_URL}/student/courses?programme=${user?.programme}&year=${user?.year}`
      );
      const data = await response.json();
      console.log("data:", data);
      setOptions(
        data.map((course: CourseData) => ({
          label: course.course_name,
          value: course.course_code,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch student course options", error);
    }
  };

  const handleOptionSelect = async (option: Option) => {
    try {
      setStudentHistory(true);
      const response = await fetchWithAuth(
        `${API_URL}/student/attendance?course_code=${option.value}&course_name=${option.label}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch option value");
      }
      const data = await response.json();
      setSelectedOption(option);
      setWeeks(data);
    } catch (error) {
      console.error(
        "Failed to fetch student's data for selected options:",
        error
      );
    } finally {
      setStudentHistory(false);
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
            onSelectOption2={handleOptionSelect}
            selectedOption={selectedOption}
          />
        </View>

        <View className="p-3"></View>
        {studentHistory ? (
          <View className="flex-1 flex justify-center items-center">
            <ActivityIndicator size="large" color="#A66d37" />
          </View>
        ) : weeks.length > 0 ? (
          <FlatList
            data={weeks}
            renderItem={({ item }) => (
              <Weeks
                week={item.week}
                attendance={item.attendance}
                code={item.code}
                // attendance_fraction={item.attendance_fraction}
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
