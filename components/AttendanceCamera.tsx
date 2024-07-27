import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import Button from "./Button";
import { Svg, Ellipse } from "react-native-svg";

const { width, height } = Dimensions.get("window");

type AttendanceCameraProps = {
  onCapture: (image: CameraCapturedPicture | null) => void;
};

const AttendanceCamera = ({ onCapture }: AttendanceCameraProps) => {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          console.log("Captured");
          onCapture(photo);
        } else {
          console.error("Failed to capture image: photo is undefined");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  const retakePicture = () => {
    onCapture(null);
  };
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <View />;
  }
  return (
    <View className="flex-1 w-full bg-yellow-400 ">
      <CameraView style={styles.camera} facing="front" ref={cameraRef}>
        <Svg height={height} width={width} style={styles.overlay}>
          <Ellipse
            cx="50%"
            cy="50%"
            rx="35%"
            ry="25%"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="5,5"
            fill="none"
          />
        </Svg>
        <View className="w-full">
          <Button title="Snap Picture" onPress={takePicture} />
        </View>
      </CameraView>
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
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 64,
    zIndex: 999,
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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

export default AttendanceCamera;
