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

const FaceRegistration = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] =
    useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [showMessage, setShowMessage] = useState(true);
  const [userName, setUserName] = useState<string>("james");

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
      visibilityTime: 20000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedImage(photo);
        } else {
          console.error("Failed to capture image: photo is undefined");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const submit = async () => {
    if (capturedImage) {
      const formData = new FormData();
      formData.append("image", {
        uri: capturedImage.uri,
        type: "image/jpeg",
        name: `${userName}.jpg`,
      } as any);
      formData.append("name", userName);
      console.log(formData);

      try {
        const response = await fetch("http://192.168.8.131:5000/register", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log("Success:", result);
        // Handle the response from your backend here
      } catch (error) {
        console.error("Error sending image to backend:", error);
      }
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
      {capturedImage ? (
        <>
          <Image source={{ uri: capturedImage.uri }} style={styles.preview} />
          <View className="flex flex-col gap-8 justify-around h-[25%] p-6">
            <Button
              title="Retake"
              onPress={retakePicture}
              customStyle={styles.button}
            />
            <Button
              title="Submit"
              onPress={submit}
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
