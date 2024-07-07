import { View, ImageBackground, KeyboardTypeOptions } from "react-native";
import React from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomForm from "../../components/Form";
import KeyboardAvoidanceContainer from "../../components/KeyboardAvoidance";
import {
  useUserRegistration,
  UserRegistrationData,
} from "../../components/UserRegistrationData";
import { InputConfig } from "../../utils/types";

const SignUp = () => {
  const { updateUserData } = useUserRegistration();

  const inputConfigs: InputConfig[] = [
    { name: "name", placeholder: "Surname Firstname", keyboardType: "default" },
    {
      name: "email",
      placeholder: "Enter your email",
      keyboardType: "email-address",
    },
    {
      name: "password",
      placeholder: "Enter your password",
      secureTextEntry: true,
    },
    {
      name: "school_id",
      placeholder: "Enter your school id number",
      keyboardType: "numeric",
    },
  ];

  const handleFormSubmit = (formValues: Partial<UserRegistrationData>) => {
    updateUserData(formValues);
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full justify-center items-center"
      >
        <KeyboardAvoidanceContainer>
          <View className="mt-20">
            <View className="p-[20px] flex flex-col justify-end items-start w-full">
              <ThemedText type="title">Create an account</ThemedText>
              <ThemedText type="smalldefault" className="text-gray-300">
                Welcome, please enter your details
              </ThemedText>
            </View>

            <CustomForm
              inputs={inputConfigs}
              onSubmit={handleFormSubmit}
              buttonTitle="Next"
              path={"./student-lecturer"}
              message="Already have an account?"
              link_name="Log in"
              link_path="./log_in"
            />
          </View>
        </KeyboardAvoidanceContainer>
      </ImageBackground>
    </ThemedView>
  );
};

export default SignUp;
