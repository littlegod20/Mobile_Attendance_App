import { CameraView } from "expo-camera";
import React, { useRef, useState } from "react";
import { View, Button } from "react-native";

const LivenessDetection = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const [capturing, setCapturing] = useState(false);

  const captureImages = async () => {
    if (cameraRef.current) {
      setCapturing(true);
      const images = [];
      for (let i = 0; i < 5; i++) {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) images.push(photo.uri);
        // await new Promise((res) => setTimeout(res, 300)); // Adjust the delay as needed
      }
      setCapturing(false);
      // Send images to the backend for liveness detection
      // Example: await sendImagesToBackend(images);
    }
  };

  return (
    <View className="w-full flex-1">
      <CameraView ref={cameraRef} style={{ flex: 1 }} />
      <Button
        title="Capture Images"
        onPress={captureImages}
        disabled={capturing}
      />
    </View>
  );
};

export default LivenessDetection;
