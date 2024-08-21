import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  useCameraDevice,
  Camera,
  PhotoFile,
  useCameraPermission,
} from "react-native-vision-camera";
import axios from "axios";
import PermissionPage from "./CameraPermissionPage";
import NoCameraDeviceError from "./NoCameraDeviceError";
import Button from "../../../components/Button";
import * as FileSystem from "expo-file-system";

type LivenessProps = {
  onLiveness: (val: boolean) => void;
};

const LivenessDetection = ({ onLiveness }: LivenessProps) => {
  const device = useCameraDevice("front");
  const camera = useRef<Camera>(null);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [livenessResult, setLivenessResult] = useState<any | null>(null);
  const [images, setImages] = useState<PhotoFile[]>([]);

  const { hasPermission } = useCameraPermission();

  if (!hasPermission) return <PermissionPage />;
  if (device == null) return <NoCameraDeviceError />;

  const actions = ["Turn head left", "Turn head right", "Blink slowly"];

  const analyzeImageWithGoogleVision = async (base64Image: string) => {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const response = await axios.post(visionUrl, {
      requests: [
        {
          image: {
            content: base64Image.split(",")[1],
          },
          features: [
            {
              type: "FACE_DETECTION",
              maxResults: 10,
            },
          ],
        },
      ],
    });

    return response.data.responses[0];
  };

  const takePhoto = async () => {
    console.log("starting liveness detection");
    if (camera && camera.current) {
      try {
        setOverallProgress(0);
        let allPhotos: string[] = [];

        for (let i = 0; i < actions.length; i++) {
          setCurrentAction(actions[i]);
          setOverallProgress((i + 1) * 33.33);

          for (let j = 0; j < 3; j++) {
            await new Promise((res) => setTimeout(res, 2000));

            try {
              const photo = await camera.current.takeSnapshot({
                quality: 50,
              });

              setImages((prev) => [...prev, photo]);

              // Ensure the path has the correct scheme
              const photoPath = photo.path.startsWith("file://")
                ? photo.path
                : `file://${photo.path}`;

              // Convert image file to base64
              const base64Image = await FileSystem.readAsStringAsync(
                photoPath,
                {
                  encoding: FileSystem.EncodingType.Base64,
                }
              );

              allPhotos.push(`data:image/jpg;base64,${base64Image}`);
            } catch (photoError) {
              console.error("Error capturing photo:", photoError);
            }
          }
        }

        // Now process all photos
        const results = await Promise.all(
          allPhotos.map(analyzeImageWithGoogleVision)
        );

        console.log("All Vision Results:", results);

        // Implement liveness detection logic here using results
        const livenessDetected = checkLiveness(results);
        setLivenessResult({ livenessDetected, faceData: results });

        setCurrentAction(null);
        setOverallProgress(100);

        onLiveness(livenessDetected);
      } catch (error) {
        console.error("Error during liveness detection:", error);
      }
    } else {
      console.log("Camera not ready");
    }
  };

  useEffect(() => {
    console.log("All images:", images);
  }, [images]);

  const checkLiveness = (results: any[]) => {
    // Implement your liveness detection logic here
    // For example:
    const leftTurn = results.some((r) => r.faceAnnotations[0]?.panAngle < -10);
    const rightTurn = results.some((r) => r.faceAnnotations[0]?.panAngle > 10);
    // const blink = results.some(
    //   (r) =>
    //     r.faceAnnotations[0]?.blurredLikelihood === "LIKELY" ||
    //     r.faceAnnotations[0]?.blurredLikelihood === "VERY_LIKELY"
    // );

    return leftTurn && rightTurn;
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
      {livenessResult && (
        <ScrollView style={styles.resultContainer}>
          <Text>Liveness Detection Result:</Text>
          <Text>{JSON.stringify(livenessResult, null, 2)}</Text>
        </ScrollView>
      )}

      {/* {images && images.length > 0 && (
        <View className="flex-1 bg-yellow-400">
          {images.map((img, index) => (
            <Image key={index} source={{ uri: `file://${img.path}` }} />
          ))}
          <Text>{images.length} Photo(s) captured!</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#A66d37",
    borderRadius: 5,
  },
  resultContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default LivenessDetection;
