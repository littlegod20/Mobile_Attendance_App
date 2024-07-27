import {
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CheckAttendanceCard from "../../components/CheckAttendanceCard";
import GoBackBtn from "../../components/GoBackBtn";
import fetchWithAuth from "../../services/fetchWithAuth";
import { API_URL } from "@env";
import { CourseData, User } from "../../utils/types";
import * as SecureStore from "expo-secure-store";
import { LocationCoords } from "../lecturerScreens/Open_Close_Session";
import Toast from "react-native-toast-message";
import authenticateWithFingerprint from "../../services/fingerPrint";
import getLocation from "../../services/locationService";
import io, { Socket } from "socket.io-client";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import Button from "../../components/Button";
import AttendanceCamera from "../../components/AttendanceCamera";

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
  // const [location, setLocation] = useState<LocationCoords>(null);
  // const [locationLoading, setLocationLoading] = useState(true);
  const [isLivenessCheckActive, setIsLivenessCheckActive] = useState(false);
  const socketRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  const [isAttendanceLoading, setIsAttendanceLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (isLivenessCheckActive) {
  //     socketRef.current = io(`ws://${API_URL}/socket.io`);
  //     socketRef.current.on("liveness_result", handleLivenessResult);

  //     return () => {
  //       socketRef.current.off("liveness_result", handleLivenessResult);
  //       socketRef.current.disconnect();
  //     };
  //   }
  // }, [isLivenessCheckActive]);

  // const startLivenessCheck = async () => {
  //   setIsLivenessCheckActive(true);
  //   sendFrames();
  // };

  // const sendFrames = async () => {
  //   if (cameraRef.current && isLivenessCheckActive) {
  //     const photo = await cameraRef.current.takePictureAsync({ base64: true });
  //     socketRef.current.emit("liveness_check", { image: photo.base64 });

  //     // Send frames every 500ms
  //     setTimeout(sendFrames, 500);
  //   }
  // };

  // const handleLivenessResult = (result) => {
  //   if (result.success) {
  //     setIsLivenessCheckActive(false);
  //     // Proceed with attendance checking
  //     checkAttendance();
  //   } else {
  //     Alert.alert("Liveness Check Failed", result.message);
  //     setIsLivenessCheckActive(false);
  //   }
  // };
  // getting location of student
  // useEffect(() => {
  //   const geo = async () => {
  //     const loc = await getLocation();
  //     setLocation(loc);
  //   };
  //   geo();
  // }, []);

  // useEffect(() => {
  //   console.log("Updating location:", location);
  // }, [location]);

  // useEffect(() => {
  //   if (location) {
  //     setLocationLoading(false);
  //     Toast.show({
  //       type: "success",
  //       text1: "Location Set",
  //       text1Style: { color: "green", fontSize: 14 },
  //       text2: "Your location has been successfully set!",
  //       text2Style: { fontSize: 13, color: "black" },
  //       visibilityTime: 7000,
  //       autoHide: true,
  //       position: "top",
  //       bottomOffset: 30,
  //       topOffset: 40,
  //     });
  //   }
  // }, [location]);

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
      console.log("programe", programme, "\nyear:", year);
    } finally {
      setIsLoading(false);
    }
  };

  // const Authenticate = async (course_code: string, course_name: string) => {
  //   try {
  //     const isFingerPrintChecked = await authenticateWithFingerprint();
  //     if (isFingerPrintChecked) {
  //       await checkAttendance(course_name, course_code);
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error during fingerprint authentication:", error);
  //   }
  // };

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
  const attendance_checked = true;

  const handleCardClick = (course_name: string, course_code: string) => {
    setSelectedCourse({ course_name, course_code });
    setShowCamera(true);
  };

  const handleCapture = (image: CameraCapturedPicture | null) => {
    setCapturedImage(image);
    setShowCamera(false);
    setIsAttendanceLoading(true);
    // Now you can use the captured image and selected course data
    if (selectedCourse) {
      checkAttendance(
        selectedCourse.course_code,
        selectedCourse.course_name,
        image,
        attendance_checked,
        location
      );
    }
  };

  const checkAttendance = async (
    course_code: string,
    course_name: string,
    image: CameraCapturedPicture | null,
    attendance_checked: boolean,
    location: LocationCoords
  ) => {
    try {
      const formData = new FormData();
      formData.append("course_name", course_name);
      formData.append("course_code", course_code);
      formData.append("location", JSON.stringify(location));
      formData.append("attendance_checked", attendance_checked.toString());
      formData.append("course_name", course_name);

      if (image) {
        formData.append("image", {
          uri: image.uri,
          type: "image/jpeg",
          name: `${user?.name}.jpeg`,
        } as any);
      }

      console.log("Sending request to:", `${API_URL}/attendance`);
      console.log("Request body:", formData);

      const response = await fetchWithAuth(`${API_URL}/attendance`, {
        method: "POST",
        body: formData,
      });

      console.log("sent successfully");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.msg || "An error occurred while checking attendance"
        );
      }

      if (data.msg === "Attendance recorded successfully.") {
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
        console.log("successful:", data.msg);
      } else if (data.msg === "You are not within the required location") {
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
        console.log("location error:", data.msg);
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
        console.log("other:", data.msg);
      }
    } catch (error: any) {
      // console.error("Error checking attendance:", error.msg || error);
      Toast.show({
        type: "error",
        text1: "Recognition error!",
        text2: `Face recognition failed. Please try again.`,
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } finally {
      setIsAttendanceLoading(false); // Reset loading state after completion
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

  if (isLoading || isAttendanceLoading) {
    return (
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full items-center"
      >
        <View className="flex-1 justify-center items-center">
          <ThemedText>Just a moment...</ThemedText>
          <ActivityIndicator size="large" color="#A66d37" className="pt-3" />
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }

  return (
    <ThemedView className="flex-1 w-full ">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full items-center"
      >
        {showCamera === false && (
          <View className="h-1/6 flex justify-end items-center w-full mb-8">
            <GoBackBtn path={"/student/Main/(tabs)"} />
          </View>
        )}

        <View className="w-full flex-1 flex items-center gap-7 p-2">
          {/* || locationLoading */}
          {showCamera ? (
            <AttendanceCamera onCapture={handleCapture} />
          ) : (
            <>
              {courseSession.length > 0 ? (
                <FlatList
                  data={courseSession}
                  renderItem={({ item }) => (
                    <View className="w-full">
                      <CheckAttendanceCard
                        course_name={item.course_name}
                        action={item.session_status}
                        course_code={item.course_code}
                        attendance_checked={item.attendance_checked}
                        handleClick={handleCardClick}
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
            </>
          )}
        </View>
      </ImageBackground>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 64,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "80%",
  },
});

export default Check_AttendanceScreen;
