import { KeyboardTypeOptions, View } from "react-native";
import React from "react";
import CustomInput from "./Input";
import { ThemedText } from "../contexts/ThemedText";
import { useState } from "react";
import Button from "./Button";
import { router } from "expo-router";
import { Link } from "expo-router";
import {
  UserRegistrationData,
  useUserRegistration,
} from "./UserRegistrationData";
import { InputConfig } from "../utils/types";

interface CustomFormProps {
  inputs: InputConfig[];
  onSubmit: (formValues: { [key: string]: string }) => void;
  buttonTitle: string;
  path?: string;
  link_name?: string;
  link_path?: string;
  message?: string;
}

const CustomForm: React.FC<CustomFormProps> = ({
  inputs,
  onSubmit,
  buttonTitle,
  path,
  link_name,
  link_path,
  message,
}) => {
  const { userData, updateUserData } = useUserRegistration();

  const handleInputChange = (key: string, value: string) => {
    updateUserData({
      ...userData,
      [key]: value,
    });
  };

  const transformUserData = (
    data: UserRegistrationData
  ): { [key: string]: string } => {
    const transformedData: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
      if (data[key as keyof UserRegistrationData] !== undefined) {
        transformedData[key] = String(data[key as keyof UserRegistrationData]);
      }
    });
    return transformedData;
  };

  const handleSubmit = () => {
    const transformedData = transformUserData(userData);
    onSubmit(transformedData);

    path ? router.navigate({ pathname: path }) : null;
  };

  const getInputValue = (key: string): string => {
    if (key in userData) {
      return userData[key as keyof UserRegistrationData] as string;
    }
    return "";
  };

  return (
    <View className="flex-1 justify-start mt-5 px-[20px] w-full">
      <View className="mb-12 w-full">
        {inputs.map((input) => (
          <View key={input.name as string} className="mb-1">
            <ThemedText type="defaultSemiBold" className="mb-2 capitalize">
              {input.name}:
            </ThemedText>
            <CustomInput
              placeholder={input.placeholder}
              value={getInputValue(input.name)}
              onChangeText={(value) => handleInputChange(input.name, value)}
              keyboardType={input.keyboardType}
              secureTextEntry={input.secureTextEntry}
              multiline={input.multiline}
            />
          </View>
        ))}
      </View>
      <View>
        <Button title={buttonTitle} onPress={handleSubmit} />
        <ThemedText type="smalldefault" className="mt-2 text-center">
          {link_path ? (
            <>
              {message}{" "}
              <Link href={link_path} className="text-[#FF7A00] font-bold">
                {link_name}
              </Link>
            </>
          ) : null}
        </ThemedText>
      </View>
    </View>
  );
};

export default CustomForm;
