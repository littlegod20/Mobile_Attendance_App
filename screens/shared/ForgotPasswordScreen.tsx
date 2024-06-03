import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";

const ForgotPasswordScreen = () => {
  const inputConfigs = [{ name: "Email", placeholder: "Enter your email" }];

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
          <ThemedText type="title">Forgot Password</ThemedText>
          <ThemedText type="smalldefault">
            Enter your registered email address and we'll send you a link to get
            back to your account
          </ThemedText>
        </View>

        <CustomForm
          inputs={inputConfigs}
          onSubmit={handleFormSubmit}
          buttonTitle="Next"
          path={"./otp"}
        />
      </ImageBackground>
    </ThemedView>
  );
};

export default ForgotPasswordScreen;
