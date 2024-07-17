import {
  CameraView,
  useCameraPermissions,
  CameraType,
  CameraCapturedPicture,
} from "expo-camera";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../../components/Button";
import Toast from "react-native-toast-message";
import { useUserRegistration } from "../../components/UserRegistrationData";
import { router } from "expo-router";

const FaceRegistration = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const { updateUserData, submitRegistration, userData } =
    useUserRegistration();

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
      visibilityTime: 10000,
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
    await submitRegistration();
    // router.push("shared_screens/log_in");
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
