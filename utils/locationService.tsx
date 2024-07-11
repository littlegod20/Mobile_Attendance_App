import * as Location from "expo-location";
import { Platform, PermissionsAndroid } from "react-native";

type LocationCoords = {
  latitude: number;
  longitude: number;
} | null;

const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  }
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
