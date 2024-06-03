
import { View, Text, ImageBackground, TextInput } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";

const SignUp = () => {
  const inputConfigs = [
    { name: "Name", placeholder: "Enter your name" },
    { name: "Email", placeholder: "Enter your email" },
    { name: "Password", placeholder: "Enter your password" },
    { name: "ID", placeholder: "Enter your school id number" },
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
          <ThemedText type="title">Create an account</ThemedText>
          <ThemedText type="smalldefault" className="text--300">
            Welcome, please enter your details
          </ThemedText>
        </View>

        <CustomForm
          inputs={inputConfigs}
          onSubmit={handleFormSubmit}
          buttonTitle="Sign Up"
          path={"./log_in"}
          message="Already have an account?"
          link_name="Log in"
          link_path="./log_in"
        />
      </ImageBackground>
    </ThemedView>

  );
};

export default SignUp;
