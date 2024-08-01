import React, { useRef, useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const VideoRecorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  React.useEffect(() => {
    if (cameraPermission === null) {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  const startRecording = async () => {
    if (cameraRef.current && !recording) {
      setRecording(true);
      try {
        const videoRecordPromise = cameraRef.current.recordAsync();
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          console.log("Video recorded at:", data ? data.uri : "No data");
          setRecording(false);
        }
      } catch (error) {
        console.error("Error recording video:", error);
        setRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  if (cameraPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          {recording ? (
            <Button title="Stop Recording" onPress={stopRecording} />
          ) : (
            <Button title="Start Recording" onPress={startRecording} />
          )}
        </View>
      </CameraView>
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
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
});

export default VideoRecorder;
