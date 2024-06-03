import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";

const ResetPasswordScreen = () => {
  const inputConfigs = [
    { name: "New Password", placeholder: "Enter your new password" },
  ];

  const handleFormSubmit = (formValues: { [key: string]: string }) => {
    console.log("Form Values:", formValues);
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full  justify-center items-center"
      >
        <View className="h-1/4 p-[20px] flex flex-col justify-end  items-start w-full">
          <ThemedText type="title">Reset Password</ThemedText>
          <ThemedText type="smalldefault" className="text--300">
            Your new password must be different from the previous password.
          </ThemedText>
        </View>

        <CustomForm
          inputs={inputConfigs}
          onSubmit={handleFormSubmit}
          buttonTitle="Next"
          path={"/student/Main"}
        />
      </ImageBackground>
    </ThemedView>
  );
};

export default ResetPasswordScreen;
