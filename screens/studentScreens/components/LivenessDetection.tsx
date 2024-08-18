import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  useCameraDevice,
  Camera,
  PhotoFile,
  useCameraPermission,
} from "react-native-vision-camera";
import PermissionPage from "./CameraPermissionPage";
import NoCameraDeviceError from "./NoCameraDeviceError";
import Button from "../../../components/Button";

const LivenessDetection: React.FC = () => {
  const device = useCameraDevice("front");
  const [images, setImages] = useState<PhotoFile[] | null>(null);
  const camera = useRef<Camera>(null);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  const { hasPermission } = useCameraPermission();

  if (!hasPermission) return <PermissionPage />;
  if (device == null) return <NoCameraDeviceError />;

  const actions = ["Turn head left", "Turn head right", "Blink slowly"];

  const takePhoto = async () => {
    console.log("starting liveness detection");
    if (camera && camera.current) {
      try {
        setImages(null);
        setOverallProgress(0);
        for (let i = 0; i < actions.length; i++) {
          setCurrentAction(actions[i]);
          setOverallProgress((i + 1) * 33.33);

          for (let j = 0; j < 3; j++) {
            // Wait for 2 seconds before taking each photo
            for (let k = 0; k < 4; k++) {
              await new Promise((res) => setTimeout(res, 100));
            }

            const photo = await camera.current.takeSnapshot({
              quality: 100,
            });
            setImages((prev) => (prev ? [...prev, photo] : [photo]));
          }
        }
        setCurrentAction(null);
        setOverallProgress(100);
      } catch (error) {
        console.error("Error during liveness detection:", error);
      }
    } else {
      console.log("Camera not ready");
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {device != null && hasPermission && (
        <View className="relative flex-1 flex justify-end">
          {currentAction && (
            <View className="absolute z-30 top-0 p-5 flex justify-center w-full">
              <Text style={styles.actionText}>{currentAction}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, { width: `${overallProgress}%` }]}
                />
              </View>
            </View>
          )}
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            photo={true}
            photoQualityBalance="speed"
            ref={camera}
          />
          <View className="absolute p-5 flex justify-center w-full">
            <Button title="Capture and Analyze" onPress={takePhoto} />
          </View>
        </View>
      )}
      {images && images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: `file://${img.path}` }}
              style={styles.image}
            />
          ))}
          <Text>{images.length} Photo(s) captured!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  // actionContainer: {
  //   position: "absolute",
  //   top: 20,
  //   left: 0,
  //   right: 0,
  //   alignItems: "center",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   padding: 10,
  // },
  actionText: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  progressBar: {
    width: "80%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default LivenessDetection;
