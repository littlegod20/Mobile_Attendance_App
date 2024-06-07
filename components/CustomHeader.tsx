import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";

type CustomHeaderProps = {
  navigation: any;
};

const CustomHeader: React.FC<CustomHeaderProps> = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        height: 100,
        position: "relative",
      }}
    >
      <Image
        source={require("../assets/images/header_bg.png")}
        className="absolute inset-0 object-cover w-full h-full"
      />
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{ marginLeft: 25, marginTop: 15, padding: 10 }}
      >
        <FontAwesome size={20} name="bars" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
