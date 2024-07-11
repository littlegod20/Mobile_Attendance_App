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
import CheckAttendanceCard from "../../components/CheckAttendanceCard";
import GoBackBtn from "../../components/GoBackBtn";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import { User } from "../../utils/types";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

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

  // useEffect(() => {
  //   console.log("Updated sessions data:", courseSession);
  // }, [courseSession]);

  useEffect(() => {
    if (user) {
      fetchCoursesSession(
        user.programme ? user.programme : "",
        user.year ? user.year : ""
      );
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
      console.log("Response:", data);
      setCourseSession(data);
    } catch (error) {
      console.error("Error fetching sessions data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithFingerprint = async (
    course_code: string,
    course_name: string
  ) => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("This device does not support biometric authentication");
        return;
      }

      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (
        !supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        Alert.alert(
          "Fingerprint authentication is not supported on this device."
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert("No fingerprints are enrolled on this device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with fingerprint to check attendance",
      });

      if (!result.success) {
        Alert.alert("Authentication failed. Please try again.");
        return;
      }

      await checkAttendance(course_name, course_code);
    } catch (error) {
      console.error("Error during fingerprint authentication:", error);
    }
  };

  const checkAttendance = async (course_code: string, course_name: string) => {
    try {
      const response = await fetchWithAuth(`${API_URL}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_code: course_code,
          course_name: course_name,
          location: {
            lat: 37.7749, // Replace with actual latitude
            long: -122.4194, // Replace with actual longitude
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
        Alert.alert(`Error checking attendance: ${errorText}`);
        return;
      }

      const data = await response.json();
      if (data.msg) {
        Alert.alert("Attendance checked successfully!");
      } else {
        Alert.alert("Failed to check attendance. Please try again.");
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      Alert.alert("Error checking attendance. Please try again.");
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
                    handleClick={authenticateWithFingerprint}
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
