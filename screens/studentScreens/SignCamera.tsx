import {
  CameraView,
  useCameraPermissions,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import Toast from "react-native-toast-message";
import { useUserRegistration } from "../../components/UserRegistrationData";
import { router } from "expo-router";
import { ThemedText } from "../../contexts/ThemedText";

const FaceRegistration = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const { updateUserData, submitRegistration, userData } =
    useUserRegistration();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Lighting Tip",
      text2: "Please stand in a well-lit area for the best picture quality.",
      position: "top",
      visibilityTime: 8000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }, []);

  useEffect(() => {
    console.log("userData:", userData);
  }, [userData]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          updateUserData({ ...userData, capturedImage: photo });
        } else {
          console.error("Failed to capture image: photo is undefined");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  const retakePicture = () => {
    updateUserData({ ...userData, capturedImage: null });
  };

  const handleFinish = async () => {
    setIsLoading(true);
    const isSuccess = await submitRegistration();

    setIsLoading(false);

    if (isSuccess) {
      Toast.show({
        type: "success",
        text1: "Sign Up Successful",
        text2: "Continue by logging into your account",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      router.push("shared_screens/log_in");
    } else {
      console.log("Sign up failed. Please try again.");
      Toast.show({
        type: "error",
        text1: "Sign Up Failed",
        text2: "Please check your details and try again.",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      {userData.capturedImage ? (
        <>
          {isLoading ? (
            <View className="flex-1 flex justify-center items-center">
              <ThemedText>Preparing your data, Please wait</ThemedText>
              <ActivityIndicator size="large" color="#A66d37" />
            </View>
          ) : (
            <>
              <Image
                source={{ uri: userData.capturedImage.uri }}
                style={styles.preview}
              />
              <View className="flex flex-col gap-8 justify-around h-[25%] p-6">
                <Button
                  title="Re-take"
                  onPress={retakePicture}
                  customStyle={styles.button}
                />
                <Button
                  title="Submit"
                  onPress={handleFinish}
                  customStyle={styles.button}
                />
              </View>
            </>
          )}
        </>
      ) : (
        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button
              title="Snap Picture"
              onPress={takePicture}
              customStyle={styles.button}
            />
          </View>
        </CameraView>
      )}
    </View>
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

export default FaceRegistration;
