import React from "react";
import { View, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import CustomDropDown from "../../components/CustomDropDown";
import Button from "../../components/Button";
import {
  UserRegistrationData,
  useUserRegistration,
} from "../../components/UserRegistrationData";
import { faculty, programme, yearOfStudy } from "../../utils/data";

const Faculty_DeptScreen = () => {
  const { updateUserData, submitRegistration } = useUserRegistration();
  const router = useRouter();

  const handleDropdownChange = (
    type: keyof UserRegistrationData,
    option: { label: string; value: string }
  ) => {
    updateUserData({ [type]: option.value });
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
          onSelectOption1={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
        <CustomDropDown
          options={faculty}
          options_type="faculty"
          onSelectOption1={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
        <CustomDropDown
          options={programme}
          options_type="programme"
          onSelectOption1={(type, option) =>
            handleDropdownChange(type as keyof UserRegistrationData, option)
          }
        />
      </View>

      <Button
        title="Next"
        onPress={() => router.navigate("/student/face_registration")}
        customStyle={{ width: "70%" }}
      />
    </ImageBackground>
  );
};

export default Faculty_DeptScreen;
