// components/LivenessCheckCamera.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  CameraCapturedPicture,
  CameraView,
  Camera,
  useCameraPermissions,
} from "expo-camera";
import { Socket } from "socket.io-client";
import { ThemedText } from "../../../contexts/ThemedText";
import Button from "../../../components/Button";

interface LivenessCheckCameraProps {
  socket: Socket | null;
  onLivenessCheckComplete: (success: boolean) => void;
}

const LivenessCheckCamera: React.FC<LivenessCheckCameraProps> = ({
  socket,
  onLivenessCheckComplete,
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [message, setMessage] = useState("");

  // const [frames, setFrames] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const instructions = [
    "Blink your eyes twice",
    "Turn your head slightly to the right, then left",
  ];

  useEffect(() => {
    if (socket) {
      socket.on("blink_result", handleBlinkResult);
      socket.on("blink_result", handleHeadMovementResult);
    }

    return () => {
      if (socket) {
        socket.off("blink_result", handleBlinkResult);
        socket.off("head_movement_result", handleHeadMovementResult);
      }
    };
  }, [socket]);

  const handleBlinkResult = (result: { success: boolean; message: string }) => {
    setMessage(result.message);
    if (result.success) {
      setCurrentStep(1);
    } else {
      // Allow retry for blink detection
      setMessage(result.message + " Please try again.");
    }
    setIsProcessing(false);
  };

  const handleHeadMovementResult = (result: {
    success: boolean;
    message: string;
  }) => {
    setMessage(result.message);
    onLivenessCheckComplete(result.success);
    setIsProcessing(false);
  };

  const captureVideo = async (): Promise<string | null> => {
    console.log("Started video capture");
    if (cameraRef.current) {
      try {
        console.log("Inside try catch");
        const video = await cameraRef.current.recordAsync({
          maxDuration: 3,
        });
        console.log("Video recording:", video);
        if (video) {
          console.log("Video captured:", video.uri);
          return video.uri;
        }
      } catch (error) {
        console.error("Error capturing video:", error);
      }
    }
    return null;
  };

  const performStep = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setMessage("Processing...");

    const videoUri = await captureVideo();
    if (videoUri) {
      const frames = [videoUri]; // Send the compressed video URI as frames
      console.log("Frames to send:", frames);
      if (currentStep === 0) {
        socket?.emit("check_blinks", { frames });
      } else {
        socket?.emit("check_head_movement", { frames });
      }
    } else {
      setMessage("Failed to compress video. Please try again.");
      setIsProcessing(false);
    }
  };

  // useEffect(() => {
  //   console.log("frames:", frames);
  // }, [frames]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <View />;
  }
  return (
    <View className="w-full flex-1">
      <CameraView style={styles.camera} facing="front" ref={cameraRef}>
        <View style={styles.instructionContainer}>
          <ThemedText style={styles.instructionText}>
            {instructions[currentStep]}
          </ThemedText>
          <ThemedText>{message}</ThemedText>
        </View>
      </CameraView>
      <Button
        title={currentStep === 0 ? "Detect Blinks" : "Detect Head Movement"}
        onPress={performStep}
        disabled={isProcessing}
      />
      {isProcessing && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    // position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  instructionContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loading: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});

export default LivenessCheckCamera;
