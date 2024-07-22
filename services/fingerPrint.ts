import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

const authenticateWithFingerprint = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    Alert.alert("This device does not support biometric authentication");
    return;
  }

  const supportedTypes =
    await LocalAuthentication.supportedAuthenticationTypesAsync();
  if (
    !supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
  ) {
    Alert.alert("Fingerprint authentication is not supported on this device.");
    return;
  }

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!isEnrolled) {
    Alert.alert("No fingerprints are enrolled on this device.");
    return;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate with fingerprint to check attendance",
  });

  if (!result.success) {
    Alert.alert("Authentication failed. Please try again.");
    return;
  }
};

export default authenticateWithFingerprint;
