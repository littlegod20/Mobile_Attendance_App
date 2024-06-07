import { View, Text, Dimensions } from "react-native";
import React from "react";
import { ThemedText } from "../contexts/ThemedText";

const { width } = Dimensions.get("window");

type DetailFormProps = {
  name?: string;
  email?: string;
  password?: string;
  studentId?: number;
  indexNo?: number;
  programme?: string;
  year?: string;
  staffId?: number;
  serialNo?: number;
  department?: string;
};

const DetailForm = ({
  name,
  email,
  password,
  studentId,
  indexNo,
  programme,
  year,
  staffId,
  serialNo,
  department,
}: DetailFormProps) => {
  return (
    <View style={{ width }} className="flex-1">
      <View className="flex justify-start mt-10  p-4">
        {name ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Name
            </ThemedText>
            <View className="flex justify-end">
              <ThemedText>{name}</ThemedText>
            </View>
          </View>
        ) : null}
        {email ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Email
            </ThemedText>
            <View>
              <ThemedText>{email}</ThemedText>
            </View>
          </View>
        ) : null}
        {password ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Password
            </ThemedText>
            <View>
              <ThemedText>{password}</ThemedText>
            </View>
          </View>
        ) : null}

        {studentId ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Student ID
            </ThemedText>
            <View>
              <ThemedText>{studentId}</ThemedText>
            </View>
          </View>
        ) : null}

        {indexNo ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Index Number
            </ThemedText>
            <View>
              <ThemedText>{indexNo}</ThemedText>
            </View>
          </View>
        ) : null}

        {programme ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Programme
            </ThemedText>
            <View>
              <ThemedText>{programme}</ThemedText>
            </View>
          </View>
        ) : null}

        {year ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Year
            </ThemedText>
            <View>
              <ThemedText>{year}</ThemedText>
            </View>
          </View>
        ) : null}

        {staffId ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Staff ID
            </ThemedText>
            <View>
              <ThemedText>{staffId}</ThemedText>
            </View>
          </View>
        ) : null}

        {serialNo ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Serial No
            </ThemedText>
            <View>
              <ThemedText>{serialNo}</ThemedText>
            </View>
          </View>
        ) : null}

        {department ? (
          <View className="h-24 flex ">
            <ThemedText
              type="mediumSemi"
              className="border-b-[1px] mb-2 border-gray-400"
            >
              Department
            </ThemedText>
            <View>
              <ThemedText>{department}</ThemedText>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DetailForm;
