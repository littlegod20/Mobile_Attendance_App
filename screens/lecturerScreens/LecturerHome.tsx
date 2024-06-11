import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  PanResponder,
  ImageBackground,
  Alert,
  StatusBar,
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
import { useState, useRef } from "react";
import TimeTableCourse from "../../components/TimeTableCourse";
import { TouchableWithoutFeedback } from "react-native";

interface CourseData {
  course_name: string;
  course_code: string;
  start_time: string;
  finish_time: string;
}

const courses: CourseData[] = [
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
  {
    course_name: "Applied Elecricity",
    course_code: "TE 472",
    start_time: "8:15",
    finish_time: "10-15",
  },
];

interface CardData {
  week: string;
  course: string;
  date: string;
  present: boolean;
}

const cards: CardData[] = [
  {
    week: "Week 1",
    course: "Basic Mechanics",
    date: "June 11",
    present: true,
  },
  {
    week: "Week 2",
    course: "Applied Electricity",
    date: "June 11",
    present: false,
  },
  {
    week: "Week 3",
    course: "EMC",
    date: "June 11",
    present: true,
  },
  {
    week: "Week 4",
    course: "Linear Electronics",
    date: "June 11",
    present: false,
  },
];

export default function LecuturerHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sessionOpened, setSessionOpened] = useState(false); // initial session button is open since sessionOpen is false
  const course_name = "Applied Electricity";

  const handleCheckAttendance = () => {
    // router.navigate("/lecturer/");
    Alert.alert(
      `${sessionOpened ? "Close" : "Opened"} Session`,
      `Are you sure you want to ${
        sessionOpened ? "close" : "open"
      } session for ${course_name}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (sessionOpened) {
              setSessionOpened(false);
            } else {
              setSessionOpened(true);
            }
            console.log("OK Pressed");
          },
        },
      ],
      { cancelable: false }
    );
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
          <ThemedText type="default" className="uppercase">
            Lecturer
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
          {sessionOpened ? (
            <Button
              title="Close Session"
              onPress={handleCheckAttendance}
              customStyle={{
                width: "90%",
                backgroundColor: "#A66D37",
                // opacity: 0.7,
              }}
            />
          ) : (
            <Button
              title="Open Session"
              onPress={handleCheckAttendance}
              customStyle={{
                width: "90%",
                backgroundColor: "#DC924D",
              }}
            />
          )}
        </View>
      </View>

      <View className="relative flex justify-start items-start w-11/12 mt-5">
        <ThemedText type="subtitle" customStyle={{ marginBottom: 15 }}>
          Recent Lectures
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
                  {/* <FlatList
                    data={courses}
                    renderItem={({ item, index }) => (
                      <TimeTableCourse
                        course_name={item.course_name}
                        course_code={item.course_code}
                        start_time={item.start_time}
                        finish_time={item.finish_time}
                        key={index}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={true}
                  /> */}
                  <ScrollView>
                    {courses.map((item, index) => (
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
    // backgroundColor: "pink",
  },
  menuContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    // height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
