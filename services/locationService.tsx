import * as Location from "expo-location";
import { Platform, PermissionsAndroid } from "react-native";

type LocationCoords = {
  latitude: number;
  longitude: number;
} | null;

const requestLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

const getLocation = async (): Promise<LocationCoords> => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    alert("Permission to access location was denied");
    return null;
  }

  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    console.error("Error getting location from expo-location:", error);
    return null;
  }
};

export default getLocation;
