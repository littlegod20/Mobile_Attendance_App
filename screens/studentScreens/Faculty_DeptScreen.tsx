import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Link, useRouter } from "expo-router";
import CustomDropDown from "../../components/CustomDropDown";
import Button from "../../components/Button";

const Faculty_DeptScreen = () => {
  const options = [
    { label: "Computer Engineering & Electrical", value: "option1" },
    { label: "Mechanical Faculty", value: "option2" },
    { label: "Aerospace Faculty", value: "option3" },
  ];

  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/screen_deco.png")}
      className="flex-1 w-full p-4 justify-center items-center"
    >
      <View className="w-full h-1/2 flex justify-evenly ">
        <CustomDropDown options={options} options_type="Year" />
        <CustomDropDown options={options} options_type="Faculty" />
        <CustomDropDown options={options} options_type="Department" />
      </View>

      <Button
        title="Finish"
        onPress={() => router.navigate({ pathname: "shared_screens/log_in" })}
        customStyle={{ width: "70%" }}
      />
    </ImageBackground>
  );
};

export default Faculty_DeptScreen;
