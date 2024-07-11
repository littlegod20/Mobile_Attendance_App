import {
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import GoBackBtn from "../../components/GoBackBtn";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import { useCourseSession } from "../../contexts/CoursesSessionContext";
import SessionCard from "./components/SessionCard";
import getLocation from "../../utils/locationService";

export type LocationCoords = {
  latitude: number;
  longitude: number;
} | null;

const Open_Closed_Session: React.FC = () => {
  const { courses, updateCourseAction } = useCourseSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [location, setLocation] = useState<LocationCoords>(null);

  const fetchLocation = async () => {
    try {
      const loc = await getLocation();
      setLocation(loc);
      const response = await fetchWithAuth(`${API_URL}/lecturer/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: loc,
        }),
      });

      if (!response.ok) {
        throw new Error("Lecturer location was not set");
      }

      Alert.alert("Location set. You are good to go!");
    } catch (error) {
      console.error("Error getting location:", error);
      // alert("Error getting location: " + error.message);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    console.log("Location:", location);
  }, [location]);

  useEffect(() => {
    if (courses.length > 0) {
      setIsLoading(false);
    }
  }, [courses]);

  const toggleSession = async (
    course_code: string,
    course_name: string,
    action: "open" | "close"
  ): Promise<void> => {
    try {
      await fetchLocation();
      if (location) {
        const response = await fetchWithAuth(`${API_URL}/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_name, course_code, action, location }),
        });

        const data = await response.json();

        console.log("response:", data);

        if (response.ok) {
          updateCourseAction(course_code, action);
        } else {
          console.error("Failed to toggle session status");
        }
      }
    } catch (error) {
      console.error("Error toggling session status:", error);
    }
  };

  return (
    <ThemedView className="flex-1 w-full ">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full items-center"
      >
        <View className="h-1/6 flex justify-end items-center w-full mb-8">
          <GoBackBtn path={"/lecturer/LecturerMain/(tabs)"} />
        </View>

        <View className="w-full flex-1 flex items-center gap-7 p-2">
          {isLoading ? (
            <View className="flex-1 flex justify-center items-center">
              <ActivityIndicator size="large" color="#A66d37" />
            </View>
          ) : error ? (
            <ThemedText>Error: {error.message}</ThemedText>
          ) : courses.length > 0 ? (
            <FlatList
              data={courses}
              renderItem={({ item }) => (
                <View className="w-full">
                  <SessionCard
                    course_name={item.course_name}
                    course_code={item.course_code}
                    isOpen={item.action === "open"}
                    onToggleSession={toggleSession}
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
        <ThemedView>
          <ThemedText>
            Location: {location?.latitude}, {location?.longitude}
          </ThemedText>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
};

export default Open_Closed_Session;
