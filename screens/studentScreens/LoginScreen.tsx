import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";

const LogIn = () => {
  const inputConfigs = [
    { name: "Email", placeholder: "Enter your email" },
    { name: "Password", placeholder: "Enter your password" },
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
          <ThemedText type="title">Log in to your account</ThemedText>
          <ThemedText type="smalldefault" className="text--300">
            Welcome, please enter your details
          </ThemedText>
        </View>

        <CustomForm
          inputs={inputConfigs}
          onSubmit={handleFormSubmit}
          buttonTitle="Log In"
          path={"/shared_screens/forgot_password"}
          message="Don't have an account?"
          link_name="Sign Up"
          link_path="student/registration"
        />
      </ImageBackground>
    </ThemedView>
  );
};

export default LogIn;
