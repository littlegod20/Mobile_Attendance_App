import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Socket } from "socket.io-client";
import { ThemedText } from "../../../contexts/ThemedText";
import Button from "../../../components/Button";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

interface LivenessCheckCameraProps {
  socket: Socket | null;
  onLivenessCheckComplete: (success: boolean) => void;
}

const LivenessCheckCamera: React.FC<LivenessCheckCameraProps> = ({
  socket,
  onLivenessCheckComplete,
}) => {
  const cameraRef = useRef<CameraView | null>(null);
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
    "Blink twice within 3 seconds",
    "Turn your head slightly to the right, then left within 3 seconds",
  ];

  useEffect(() => {
    if (socket) {
      socket.on("blink_result", handleBlinkResult);
      socket.on("head_movement_result", handleHeadMovementResult);
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

  const captureImages = async (): Promise<string[]> => {
    console.log("Started image capture sequence");
    if (cameraRef.current) {
      try {
        const frames: string[] = [];
        const captureAndCompress = async () => {
          const photo = await cameraRef.current?.takePictureAsync({
            quality: 0.5,
            base64: true,
          });

          if (!photo) {
            throw new Error("Failed to capture photo");
          }

          const manipResult = await manipulateAsync(
            photo.uri,
            [{ resize: { width: 320 } }], // Reduced size for faster processing
            { compress: 0.5, format: SaveFormat.JPEG, base64: true }
          );

          return manipResult.base64 || "";
        };

        // Capture first image
        frames.push(await captureAndCompress());

        // Wait for 1.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Capture second image
        frames.push(await captureAndCompress());

        // Wait for another 1.5 seconds
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Capture third image
        frames.push(await captureAndCompress());

        console.log("Image sequence captured:", frames.length, "frames");
        return frames;
      } catch (error) {
        console.error("Error in image capture sequence:", error);
        throw error;
      }
    } else {
      console.error("Camera ref is null");
      throw new Error("Camera is not ready");
    }
  };

  const performStep = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setMessage("Capturing... Please perform the action.");

    try {
      const frames = await captureImages();
      if (frames.length > 0) {
        console.log("Frames to send:", frames.length);
        if (currentStep === 0) {
          socket?.emit("check_blinks", { frames });
        } else {
          socket?.emit("check_head_movement", { frames });
        }
        setMessage("Processing... Please wait.");
      } else {
        throw new Error("No frames captured");
      }
    } catch (error) {
      console.error("Error in performStep:", error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}. Please try again.`);
      } else {
        setMessage("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

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
