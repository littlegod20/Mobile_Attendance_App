import {
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomDropDown from "../../components/CustomDropDown";
import CenterTabBar from "../../components/CenterTab";
import { Octicons } from "@expo/vector-icons";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { CourseData, Option, User } from "../../utils/types";

type StudentsProps = {
  id: number;
  student_name: string;
  attendance_count: number;
  attendance_percentage: number;
  total_sessions: number;
  student_id: string;
};

const { width } = Dimensions.get("window");

const LecturerHistory = () => {
  const [user, setUser] = useState<User | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option>();
  const [studentError, setStudentError] = useState<Error | null>(null);
  const [isStudentLoading, setStudentLoading] = useState<boolean>(false);

  const [students, setStudents] = useState<StudentsProps[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;

  const tabs = [
    {
      id: 1,
      label: `All ${students && students.length ? `(${students.length})` : ""}`,
    },
    {
      id: 2,
      label: `50% & Above ${
        students && students.length > 0
          ? `(${
              students.filter((item) => item.attendance_percentage >= 50).length
            })`
          : ""
      }`,
    },
    {
      id: 3,
      label: `Below 50% ${
        students && students.length > 0
          ? `(${
              students.filter((item) => item.attendance_percentage < 50).length
            })`
          : ""
      }`,
    },
  ];
  const handleTabPress = (tabId: number) => {
    setActiveTab(tabId);
    scrollToTab(tabId);
  };

  const scrollToTab = (tabId: number) => {
    const offsetX = (tabId - 1) * width;
    scrollViewRef.current?.scrollTo({ x: offsetX, animated: true });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchLectOptions();
    }
  }, [user]);

  useEffect(() => {
    console.log("Lecturer options:", options);
    console.log("lecturer history:", students);
  }, [options, students]);

  const fetchUserData = async () => {
    try {
      const school_id = await SecureStore.getItemAsync("school_id");

      if (school_id) {
        setUser({ school_id });
      } else {
        console.log("school id is missing from secure storage");
      }
    } catch (error) {
      console.error("Error fetching lecturer's school id:", error);
    }
  };

  const fetchLectOptions = async () => {
    try {
      setStudentLoading(true);
      const options = await fetchWithAuth(
        `${API_URL}/lecturer/courses?school_id=${user?.school_id}`
      );
      const data = await options.json();
      // console.log("courses:", data[0].assigned_courses);
      setOptions(
        data[0].assigned_courses.map((course: CourseData) => ({
          label: course.course_name,
          value: course.course_code,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch student course options", error);
    } finally {
      setStudentLoading(false);
    }
  };

  const handleOptionsSelect = async (option: Option) => {
    try {
      setStudentLoading(true);
      const response = await fetchWithAuth(
        `${API_URL}/lecturer/attendance?course_code=${option.value}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch option value");
      }

      const data = await response.json();
      setSelectedOption(option);
      setStudents(data);
    } catch (error) {
      console.error(
        "Failed to fetch lecturer's data for selected options:",
        error
      );
      setStudentError(
        error instanceof Error ? error : new Error(String(error))
      );
    } finally {
      setStudentLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full"
      >
        <ThemedView className="mt-10 flex justify-end items-end w-full p-4">
          <ThemedView className="w-4/5">
            <CustomDropDown
              options={options}
              options_type="Class"
              onSelectOption2={handleOptionsSelect}
              selectedOption={selectedOption}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView className="mt-14">
          <CenterTabBar
            tabData={tabs}
            handleTabPress={handleTabPress}
            scrollX={scrollX}
            width={width}
            activeTab={activeTab} // Pass activeTab as a prop
          />
        </ThemedView>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: width * tabs.length,
          }}
          className="flex-1"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* All(200) Section */}
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              // backgroundColor: "#DC924D",
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isStudentLoading ? (
              <View className="flex-1 flex justify-center items-center">
                <ActivityIndicator size="large" color="#A66d37" />
              </View>
            ) : studentError ? (
              <ThemedText>Error: {studentError.message}</ThemedText>
            ) : students && students.length > 0 ? (
              <>
                <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
                  <View className="flex-1 w-1/2">
                    <ThemedText>Name</ThemedText>
                  </View>
                  <View className="w-1/3 ">
                    <ThemedText>Index No.</ThemedText>
                  </View>
                  <View className="">
                    <ThemedText>Status</ThemedText>
                  </View>
                </View>
                <FlatList
                  data={students}
                  renderItem={({ item }) => (
                    <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                      <View className="flex-1 w-1/2">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 150 }}
                        >
                          {item.student_name}
                        </ThemedText>
                      </View>
                      <View className="w-1/3 mr-5">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100 }}
                        >
                          {item.student_id}
                        </ThemedText>
                      </View>
                      <View className="">
                        <ThemedText
                          className={`${
                            item.attendance_percentage < 50
                              ? "bg-red-600"
                              : item.attendance_percentage >= 70
                              ? "bg-green-600"
                              : item.attendance_percentage >= 50
                              ? "bg-yellow-500"
                              : ""
                          } p-2 rounded-md`}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100, color: "white" }}
                        >
                          {`${item.attendance_count}/${item.total_sessions}`}
                        </ThemedText>
                      </View>
                    </View>
                  )}
                  keyExtractor={(_i, index) => index.toString()}
                  // showsVerticalScrollIndicator={false}
                  style={{ marginBottom: 80 }}
                />
              </>
            ) : (
              <ThemedView className="w-full flex justify-center items-center">
                <ThemedText>No student history here</ThemedText>
              </ThemedView>
            )}
          </View>

          {/*  50% & Above Section */}
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {students && students.length > 0 ? (
              <>
                <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
                  <View className="flex-1 w-1/2">
                    <ThemedText>Name</ThemedText>
                  </View>
                  <View className="w-1/3 ">
                    <ThemedText>Index No.</ThemedText>
                  </View>
                  <View className="">
                    <ThemedText>Status</ThemedText>
                  </View>
                </View>

                <FlatList
                  data={students.filter(
                    (item) => item.attendance_percentage >= 50
                  )}
                  renderItem={({ item }) => (
                    <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                      <View className="flex-1 w-1/2">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 150 }}
                        >
                          {item.student_name}
                        </ThemedText>
                      </View>
                      <View className="w-1/3 mr-5 flex justify-center items-center">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100 }}
                        >
                          {item.student_id}
                        </ThemedText>
                      </View>
                      <View className="">
                        <ThemedText
                          className={`${
                            item.attendance_percentage < 50
                              ? "bg-red-600"
                              : item.attendance_percentage >= 70
                              ? "bg-green-600"
                              : item.attendance_percentage >= 50
                              ? "bg-yellow-500"
                              : ""
                          } p-2 rounded-md`}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100, color: "white" }}
                        >
                          {item.attendance_percentage.toFixed(0)}%
                        </ThemedText>
                      </View>
                    </View>
                  )}
                  keyExtractor={(_i, index) => index.toString()}
                  style={{ marginBottom: 80 }}
                />
              </>
            ) : (
              <ThemedView className="w-full flex justify-center items-center">
                <ThemedText>No student history here</ThemedText>
              </ThemedView>
            )}
          </View>

          {/* Below 50% Section */}
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {students && students.length > 0 ? (
              <>
                <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
                  <View className="flex-1 w-1/2">
                    <ThemedText>Name</ThemedText>
                  </View>
                  <View className="w-1/3 ">
                    <ThemedText>Index No.</ThemedText>
                  </View>
                  <View className="">
                    <ThemedText>Status</ThemedText>
                  </View>
                </View>
                <FlatList
                  data={students.filter(
                    (item) => item.attendance_percentage < 50
                  )}
                  renderItem={({ item }) => (
                    <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                      <View className="flex-1 w-1/2 ">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 150 }}
                        >
                          {item.student_name}
                        </ThemedText>
                      </View>
                      <View className="w-1/3 mr-5 flex justify-center items-center">
                        <ThemedText
                          className=""
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100 }}
                        >
                          {item.student_id}
                        </ThemedText>
                      </View>
                      <View className="">
                        <ThemedText
                          className="p-2 rounded-md bg-red-600"
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 100, color: "white" }}
                        >
                          {item.attendance_percentage.toFixed(0)}%
                        </ThemedText>
                      </View>
                    </View>
                  )}
                  keyExtractor={(_i, index) => index.toString()}
                  // showsVerticalScrollIndicator={false}
                  style={{ marginBottom: 80 }}
                />
              </>
            ) : (
              <ThemedView className="w-full flex justify-center items-center">
                <ThemedText>No student history here</ThemedText>
              </ThemedView>
            )}
          </View>
        </Animated.ScrollView>
        <StatusBar barStyle={"dark-content"} />
      </ImageBackground>
    </ThemedView>
  );
};

export default LecturerHistory;
