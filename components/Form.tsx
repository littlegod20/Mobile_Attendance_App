import { View } from "react-native";
import React from "react";
import CustomInput from "./Input";
import { ThemedText } from "../contexts/ThemedText";
import { useState } from "react";
import Button from "./Button";
import { router } from "expo-router";
import { Link } from "expo-router";

interface InputConfig {
  name: string;
  placeholder: string;
  keyboardType?: string;
  multiline?: boolean;
}

interface CustomFormProps {
  inputs: InputConfig[];
  onSubmit: (formValues: { [key: string]: string }) => void;
  buttonTitle: string;
  path: string;
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
  const initialFormState = inputs.reduce((acc, inputs) => {
    acc[inputs.name] = "";
    return acc;
  }, {} as { [key: string]: string });

  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    initialFormState
  );

  const handleInputChange = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    router.navigate({ pathname: path });
  };

  return (
    <View className="flex-1 justify-start mt-5 px-[20px]  w-full">
      <View className="mb-12 w-full">
        {inputs.map((input) => (
          <View key={input.name} className="mb-1">
            <ThemedText type="defaultSemiBold" className="mb-2">
              {input.name}:
            </ThemedText>
            <CustomInput
              placeholder={input.placeholder}
              value={formValues[input.name]}
              onChangeText={(value) => handleInputChange(input.name, value)}
              // keyboardType={input.keyboardType}
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
