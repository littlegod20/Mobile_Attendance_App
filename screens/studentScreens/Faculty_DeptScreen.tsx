import React from "react";
import { View, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import CustomDropDown from "../../components/CustomDropDown";
import Button from "../../components/Button";
import {
  UserRegistrationData,
  useUserRegistration,
} from "../../components/UserRegistrationData";

const Faculty_DeptScreen = () => {
  const { updateUserData, submitRegistration, userData } =
    useUserRegistration();
  const router = useRouter();

  const programme = [
    {
      label: "Telecommunication Engineering",
      value: "Telecommunication Engineering",
    },
    { label: "Computer Engineering", value: "Computer Engineering" },
    { label: "Electrical Engineering", value: "Electrical Engineering" },
    { label: "Biomedical Engineering", value: "Biomedical Engineering" },
  ];

  const yearOfStudy = [
    { label: "First Year", value: "1" },
    { label: "Second Year", value: "2" },
    { label: "Third Year", value: "3" },
    { label: "Fourth Year", value: "4" },
  ];

  const faculty = [
    {
      label: "Faculty of Computer & Electrical Engineering",
      value: "Faculty of Computer & Electrical Engineering",
    },
    { label: "Faculty of Science", value: "Faculty of Science" },
    {
      label: "Faculty of Mechanical & Automobile",
      value: "Faculty of Mechanical & Automobile",
    },
  ];

  const handleDropdownChange = (
    type: keyof UserRegistrationData,
    option: { label: string; value: string }
  ) => {
    updateUserData({ [type]: option.value });
  };

  const handleFinish = async () => {
    console.log("Form data before submission:", userData);
    await submitRegistration();
    console.log("Form data after submission:", userData);
    router.push("shared_screens/log_in");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/screen_deco.png")}
      className="flex-1 w-full p-4 justify-center items-center"
    >
      <View className="w-full h-1/2 flex justify-evenly">
        <CustomDropDown
          options={yearOfStudy}
          options_type="year"
          onSelectOption={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
        <CustomDropDown
          options={faculty}
          options_type="faculty"
          onSelectOption={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
        <CustomDropDown
          options={programme}
          options_type="programme"
          onSelectOption={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
      </View>

      <Button
        title="Finish"
        onPress={handleFinish}
        customStyle={{ width: "70%" }}
      />
    </ImageBackground>
  );
};

export default Faculty_DeptScreen;
