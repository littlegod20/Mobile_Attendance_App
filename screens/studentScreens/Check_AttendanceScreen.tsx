import {
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CheckAttendanceCard from "../../components/CheckAttendanceCard";
import GoBackBtn from "../../components/GoBackBtn";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import { CourseData, User } from "../../utils/types";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { LocationObjectCoords } from "expo-location";
import { LocationCoords } from "../lecturerScreens/Open_Close_Session";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "expo-router";

interface CourseSessionProps {
  course_name: string;
  course_code: string;
  session_status: string;
  attendance_checked: boolean;
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

      const data: CourseSessionProps[] = await response.json();
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
      // location greater than 50 meters
      // const location: LocationCoords = {
      //   latitude: 37.4224983,
      //   longitude: -122.0845,
      // };

      // location lesser that 50 meters
      const location: LocationCoords = {
        latitude: 37.4220383,
        longitude: -122.08404,
      };

      const response = await fetchWithAuth(`${API_URL}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_code,
          course_name,
          location,
          attendance_checked: true,
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
      if (data.msg === "Attendance recorded successfully") {
        // Alert.alert("Attendance checked successfully!");
        Toast.show({
          type: "success",
          text1: "Sucess!",
          text1Style: { fontSize: 14, color: "green" },
          text2: `Attendance for ${course_name} recorded successfully`,
          position: "top",
          visibilityTime: 20000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

        await refreshCourseSessions();
        console.log(data.msg);
      } else if (data.msg === "You are not within the required location") {
        // Alert.alert(
        //   "You are not within the required location. Failed to check attendance."
        // );
        Toast.show({
          type: "error",
          text1: "Failed to check attendance",
          text1Style: { fontSize: 14, color: "red" },
          text2: "You are not within the required location",
          position: "top",
          visibilityTime: 5000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        console.log("Reason:", data.msg);
      } else {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: `${data.msg}`,
          position: "top",
          visibilityTime: 5000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        console.log(data.msg);
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      // Alert.alert("Error checking attendance. Please try again.");
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: `${error}`,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  // function to refresh the course sessions
  const refreshCourseSessions = async () => {
    if (user) {
      await fetchCoursesSession(
        user.programme ? user.programme : "",
        user.year ? user.year : ""
      );
    }
  };

  // using this function in useEffect and adding it to refresh control
  useEffect(() => {
    refreshCourseSessions();
  }, [user]);

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
                    attendance_checked={item.attendance_checked}
                    handleClick={authenticateWithFingerprint}
                  />
                </View>
              )}
              keyExtractor={(item) => item.course_code}
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refreshCourseSessions}
                />
              }
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
