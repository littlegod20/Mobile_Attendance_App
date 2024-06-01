import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type CustomHeaderProps = {
  navigation: DrawerNavigationProp<any>;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFC107",
        height: 100,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{ marginLeft: 10, marginTop: 15, padding: 10 }}
      >
        <FontAwesome size={20} name="bars" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
