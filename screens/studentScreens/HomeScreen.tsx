import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { ThemedText } from "../../contexts/ThemedText";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { darkTheme } from "../../themes/themes";
import { ThemedView } from "../../contexts/ThemedView";
import { FontAwesome5 } from "@expo/vector-icons";
import RecentCard from "../../components/RecentsCard";
import { FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import TimeTableCourse from "../../components/TimeTableCourse";
import { TouchableWithoutFeedback } from "react-native";
import CarouselCardItem from "../../components/AttendanceProgress";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import fetchWithAuth from "../../services/fetchWithAuth";
import { User } from "../../utils/types";

export type Course = {
  course_name: string;
  course_code: string;
  credits: string;
};

export type Recents = {
  course_name: string;
  course_code: string;
  timestamp: string;
};

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState<boolean>(true);
  const [coursesError, setCoursesError] = useState<Error | null>(null);
  const [recentData, setRecentData] = useState<Recents[]>([]);
  const [isRecentLoading, setIsRecentLoading] = useState<boolean>(true);
  const [recentError, setRecentError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRecentsData();
      fetchCoursesData(
        user.programme ? user.programme : "",
        user.year ? user.year : ""
      );
    }
  }, [user]);

  // useEffect(() => {
  //   console.log("Courses loading:", isCoursesLoading);
  //   console.log("Courses data:", coursesData);
  //   console.log("Courses error:", coursesError);
  // }, [isCoursesLoading, coursesData, coursesError]);

  const fetchUserData = async () => {
    try {
      const programme = await SecureStore.getItemAsync("programme");
      const year = await SecureStore.getItemAsync("year");
      const name = await SecureStore.getItemAsync("name");

      if (programme && year && name) {
        setUser({
          programme,
          year,
          name,
        });
      } else {
        console.error("Some user data is missing from secure storage");
        // console.log("SecureData:", programme, year);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCoursesData = async (programme: string, year: string) => {
    try {
      setIsCoursesLoading(true);
      const response = await fetchWithAuth(
        `${API_URL}/student/courses?programme=${programme}&year=${year}`
      );
      const courses = await response.json();
      setCoursesData(courses);
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
        recents.recent_checkins &&
        recents.recent_checkins.length > 0
      ) {
        setRecentData(recents.recent_checkins);
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

  const handleCheckAttendance = () => {
    router.navigate("/student/check_attendance");
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
          <ThemedText type="subtitle" style={{ fontSize: 20 }}>
            Hello
          </ThemedText>
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
            className="w-44"
          >
            {user?.name}
          </ThemedText>
        </View>
      </View>

      <View className="mt-10 h-[25%] w-full flex justify-center items-center">
        <CarouselCardItem />
      </View>

      <View className="mt-3 w-full px-3 flex justify-start items-center h-[80px]">
        <View className="border-b-2 border-b-gray-400 w-full flex justify-between h-full items-center">
          <Button
            title="Check Attendance"
            onPress={handleCheckAttendance}
            customStyle={{ width: "90%" }}
          />
        </View>
      </View>

      <View className="relative flex justify-start items-start w-11/12 mt-[10px]">
        <ThemedText type="subtitle" customStyle={{ marginBottom: 15 }}>
          Recents
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
                  course_code={item.course_code}
                  time={item.timestamp}
                  course_name={item.course_name}
                />
              )}
              keyExtractor={(_i, index) => index.toString()}
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

                  {isCoursesLoading ? (
                    <View className="flex-1 flex justify-center items-center">
                      <ActivityIndicator size="large" color="#A66d37" />
                    </View>
                  ) : coursesError ? (
                    <ThemedText>Error: {coursesError.message}</ThemedText>
                  ) : coursesData.length > 0 ? (
                    <ScrollView>
                      {coursesData.map((item, index) => (
                        <TimeTableCourse
                          course_name={item.course_name}
                          course_code={item.course_code}
                          credits={item.credits}
                          key={index}
                        />
                      ))}
                    </ScrollView>
                  ) : (
                    <ThemedText
                      type="mediumSemi"
                      className="text-gray-500 italic"
                    >
                      No courses available
                    </ThemedText>
                  )}
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
};

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

export default Home;
