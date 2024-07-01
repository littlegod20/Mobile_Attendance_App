import {
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CheckAttendanceCard from "../../components/CheckAttendanceCard";
import GoBackBtn from "../../components/GoBackBtn";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import { User } from "../../utils/types";
import * as SecureStore from "expo-secure-store";

type AttendanceData = {
  course: string;
  open: boolean;
};

const checkattendance: AttendanceData[] = [
  {
    course: "Basic Mechanics",
    open: false,
  },
  {
    course: "Applied Electricity",
    open: false,
  },
  {
    course: "EMC",
    open: true,
  },
  {
    course: "Computer Networking",
    open: false,
  },
  {
    course: "Linear Electronics",
    open: false,
  },
  {
    course: "Mechanics",
    open: false,
  },
];

interface CourseSessionProps {
  course_name: string;
  course_code: string;
  session_status: string;
}

const Check_AttendanceScreen = () => {
  const [courseSession, setCourseSession] = useState<CourseSessionProps[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Updated sessions data:", courseSession);
  }, [courseSession]);

  // Use the fetched data
  useEffect(() => {
    if (user) {
      fetchCoursesSession(user.programme, user.year);
    }
  }, [user]);

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
        console.log("SecureData:", programme, year);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCoursesSession = async (programme: string, year: string) => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth(
        `${API_URL}/student/courses?programme=${programme}&year=${year}`
      );

      const data = await response.json();
      // Set the courses data to state
      console.log("Response:", data);
      setCourseSession(data);
    } catch (error) {
      console.error("Error fetching sessions data:", error);
      // setError(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1 w-full ">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full items-center"
      >
        <View className="h-1/6 flex justify-end items-center w-full mb-8">
          <GoBackBtn path={"/student/Main/(tabs)"} />
          {/* <ThemedText type="subtitle" className="text-black uppercase">
            Wednesday, 12th june, 2023
          </ThemedText> */}
        </View>

        <View className="w-full flex-1 flex items-center gap-7 p-2">
          {isLoading ? (
            <View className="flex-1 flex justify-center items-center">
              <ActivityIndicator size="large" color="#A66d37" />
            </View>
          ) : error ? (
            <ThemedText>Error: {error.message}</ThemedText>
          ) : courseSession.length > 0 ? (
            <FlatList
              data={courseSession}
              renderItem={({ item }) => (
                <View className="w-full">
                  <CheckAttendanceCard
                    course_name={item.course_name}
                    action={item.session_status}
                    course_code={item.course_code}
                  />
                </View>
              )}
              keyExtractor={(item) => item.course_code}
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            />
          ) : (
            <ThemedText>No courses available</ThemedText>
          )}
        </View>
      </ImageBackground>
    </ThemedView>
  );
};

export default Check_AttendanceScreen;
