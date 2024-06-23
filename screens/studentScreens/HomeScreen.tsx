import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";
import { Avatar } from "react-native-paper";
import { ThemedText } from "../../contexts/ThemedText";
import Button from "../../components/Button";
import { Link, router } from "expo-router";
import { darkTheme } from "../../themes/themes";
import { ThemedView } from "../../contexts/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RecentCard from "../../components/RecentsCard";
import { FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import TimeTableCourse from "../../components/TimeTableCourse";
import { TouchableWithoutFeedback } from "react-native";
import { courses, cards } from "../../data";
import CarouselCardItem from "../../components/AttendanceProgress";
import { API_URL } from "@env";

type Course = {
  course_name: string;
  course_code: string;
  start_time: string;
  finish_time: string;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coursesData, setCoursesData] = useState<Course[]>([]);

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);
      const data = await response.json();
      setCoursesData(data);
    } catch (error) {
      console.error("Error fetching courses data:", error);
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
          <ThemedText type="subtitle" style={{ fontSize: 25 }}>
            Hello
          </ThemedText>
          <ThemedText type="default">AKWASI NTIM</ThemedText>
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

        <View className="relative h-1/2">
          <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
            <MaterialCommunityIcons name="timetable" size={24} color="white" />
          </TouchableOpacity>
          <FlatList
            data={cards}
            renderItem={({ item }) => (
              <RecentCard
                week={item.week}
                date={item.date}
                course={item.course}
                present={item.present}
              />
            )}
            keyExtractor={(item) => item.week}
            showsVerticalScrollIndicator={false}
          />
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
                    Timetable
                  </ThemedText>
                  <ScrollView>
                    {coursesData.map((item, index) => (
                      <TimeTableCourse
                        course_name={item.course_name}
                        course_code={item.course_code}
                        start_time={item.start_time}
                        finish_time={item.finish_time}
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
