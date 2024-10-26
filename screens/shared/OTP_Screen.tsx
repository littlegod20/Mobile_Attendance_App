import { View, ImageBackground } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import OTPInput from "../../components/OTPInput";
import Button from "../../components/Button";
import { Link, router } from "expo-router";

const OTP_Screen = () => {
  const handleOtpComplete = (otp: string) => {
    // Alert.alert("OTP Entered", otp);
    console.log("otp");
    router.navigate({ pathname: "/shared_screens/reset_password" });
  };

  return (
    <ThemedView className="flex-1 w-full">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full  justify-center items-center "
      >
        <View className="p-[20px] w-full flex-1">
          <View className="h-1/4  flex flex-col justify-end  items-start w-full mb-6">
            <ThemedText type="title">Verification</ThemedText>
            <ThemedText type="smalldefault">
              Check your email to find your verification code
            </ThemedText>
          </View>
          <View>
            <OTPInput length={4} onComplete={handleOtpComplete} />

            <ThemedText type="mediumRegular" className="text-center mb-5">
              Haven't received a mail?{" "}
              <Link
                href="/shared_screens/reset_password"
                className="font-bold text-[#FF7A00]"
              >
                Resend
              </Link>
            </ThemedText>

            <Button title="Next" onPress={handleOtpComplete} />
          </View>
        </View>
      </ImageBackground>
    </ThemedView>
  );
};

export default OTP_Screen;
