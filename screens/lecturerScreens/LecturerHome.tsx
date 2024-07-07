import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { ThemedText } from "../../contexts/ThemedText";
import Button from "../../components/Button";
import { router, useFocusEffect } from "expo-router";
import { darkTheme } from "../../themes/themes";
import { ThemedView } from "../../contexts/ThemedView";
import RecentCard from "../../components/RecentsCard";
import { FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import TimeTableCourse from "../../components/TimeTableCourse";
import { TouchableWithoutFeedback } from "react-native";
import { User } from "../../utils/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { Recents } from "../studentScreens/HomeScreen";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { useCourseSession } from "../../contexts/CoursesSessionContext";

export default function LecturerHome() {
  const { courses, setCourses } = useCourseSession();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesLoading, setIsCoursesLoading] = useState<boolean>(true);
  const [coursesError, setCoursesError] = useState<Error | null>(null);
  const [recentData, setRecentData] = useState<Recents[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState<boolean>(true);
  const [recentError, setRecentError] = useState<Error | null>(null);
  const [isAnyCourseSessionOpen, setIsAnyCourseSessionOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRecentsData();
      if (courses.length === 0) {
        fetchCoursesData(user.school_id ? user.school_id : "");
      }
    }
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      checkIfAnyCourseSessionOpen();
    }, [courses])
  );

  const fetchUserData = async () => {
    try {
      const programme = await SecureStore.getItemAsync("programme");
      const school_id = await SecureStore.getItemAsync("school_id");
      const name = await SecureStore.getItemAsync("name");

      if (programme && school_id && name) {
        setUser({
          programme,
          school_id,
          name,
        });
      } else {
        console.error("Some user data is missing from secure storage");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCoursesData = async (school_id: string) => {
    try {
      setIsCoursesLoading(true);
      const response = await fetchWithAuth(
        `${API_URL}/lecturer/courses?school_id=${school_id}`
      );
      const data = await response.json();
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        Array.isArray(data[0].assigned_courses)
      ) {
        setCourses(data[0].assigned_courses);
      } else {
        throw new Error("Unexpected data structure received from the server");
      }
    } catch (error) {
      console.error("Error fetching courses data:", error);
      setCoursesError(
        error instanceof Error ? error : new Error(String(error))
      );
    } finally {
      setIsCoursesLoading(false);
    }
  };

  const fetchRecentsData = async () => {
    try {
      setIsRecentLoading(true);
      const response = await fetchWithAuth(`${API_URL}/`);
      const recents = await response.json();

      if (
        recents &&
        recents.recent_sessions &&
        recents.recent_sessions.length > 0
      ) {
        setRecentData(recents.recent_sessions);
      } else {
        setRecentData([]);
      }
    } catch (error) {
      console.error("Error fetching recents data:", error);
      setRecentError(error instanceof Error ? error : new Error(String(error)));
      setRecentData([]);
    } finally {
      setIsRecentLoading(false);
    }
  };

  const checkIfAnyCourseSessionOpen = () => {
    const isOpen = courses.some((course) => course.action === "open");
    setIsAnyCourseSessionOpen(isOpen);
  };

  const handleOpenSession = () => {
    router.navigate("/lecturer/open_close_session");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <ThemedView className="flex flex-1 items-center justify-start">
      <View className=" h-[10%] w-11/12 flex-row items-center justify-start">
        <Avatar.Image
          size={60}
          source={require("../../assets/images/icon.png")}
          theme={darkTheme}
        />
        <View className="ml-3">
          <ThemedText type="subtitle" style={{ fontSize: 25 }}>
            Hello
          </ThemedText>
          <ThemedText
            type="default"
            className="uppercase w-44"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user?.name}
          </ThemedText>
        </View>
      </View>

      <View className="mt-10 h-[20%] w-full flex justify-center items-center">
        <View className="h-full bg-[#ddd1c5] opacity-70 flex items-center justify-center w-11/12 rounded-lg">
          <ThemedText style={{ color: "gray" }}>Upcoming Events</ThemedText>
        </View>
      </View>

      <View className="mt-6 w-full px-3 flex justify-start items-center h-[80px]">
        <View className="border-b-2 border-b-gray-400 w-full flex justify-between h-full items-center">
          <Button
            title={isAnyCourseSessionOpen ? "Close Session" : "Open Session"}
            onPress={handleOpenSession}
            customStyle={{
              width: "90%",
              backgroundColor: isAnyCourseSessionOpen ? "#A66D37" : "#DC924D",
            }}
          />
        </View>
      </View>

      <View className="relative flex justify-start items-start w-11/12 mt-5">
        <ThemedText type="subtitle" customStyle={{ marginBottom: 15 }}>
          Recent Sessions
        </ThemedText>

        <View className="relative h-1/2 w-full">
          <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
            <FontAwesome5 name="book-reader" size={24} color="white" />
          </TouchableOpacity>
          {isRecentLoading ? (
            <View className="flex-1 flex justify-center items-center">
              <ActivityIndicator size="large" color="#A66d37" />
            </View>
          ) : recentError ? (
            <ThemedText>Error: {recentError.message}</ThemedText>
          ) : recentData && recentData.length > 0 ? (
            <FlatList
              data={recentData}
              renderItem={({ item }) => (
                <RecentCard
                  course_name={item.course_name}
                  course_code={item.course_code}
                  time={item.timestamp}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="w-full flex-1 flex justify-center items-center">
              <ThemedText type="mediumSemi" className="text-gray-500 italic">
                No recent history available
              </ThemedText>
            </View>
          )}
        </View>
      </View>

      <Modal visible={isMenuOpen} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <ImageBackground
                  style={styles.menuContent}
                  source={require("../../assets/images/screen_deco.png")}
                >
                  <ThemedText type="subtitle" className="uppercase mb-8">
                    Courses
                  </ThemedText>
                  <ScrollView>
                    {courses.map((item, index) => (
                      <TimeTableCourse
                        course_name={item.course_name}
                        course_code={item.course_code}
                        credits={item.credits}
                        key={index}
                      />
                    ))}
                  </ScrollView>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: "35%",
    right: 0,
    backgroundColor: "#DC924D",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 600,
  },
  menuContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
