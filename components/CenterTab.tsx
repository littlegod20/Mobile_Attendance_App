import React from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { ThemedText } from "../contexts/ThemedText";

const tabData = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Programme" },
  { id: 3, label: "Edit Info" },
];

interface CenterTabProps {
  handleTabPress: (tabId: number) => void;
  scrollX: Animated.Value;
  width: number;
}

const CenterTabBar: React.FC<CenterTabProps> = ({
  handleTabPress,
  scrollX,
  width,
}) => {
  const inputRange = [0, width, width * 2];
  const tabWidth = width / tabData.length;
  const tabIndicatorPosition = scrollX.interpolate({
    inputRange,
    outputRange: [0, tabWidth, tabWidth * 2],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#DC924D",
        borderRadius: 12,
        position: "relative",
      }}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: tabWidth - 30,
            height: 4,
            backgroundColor: "white",
            borderRadius: 80,
            top: "100%",
            transform: [{ translateX: tabIndicatorPosition }],
            zIndex: 0,
          },
        ]}
      />
      {tabData.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
          style={{
            position: "relative",
            alignItems: "center",
            height: 60,
            justifyContent: "center",
            padding: 5,
            zIndex: 1,
          }}
        >
          <ThemedText
            type="mediumSemi"
            customStyle={{
              color: "black",
              padding: 10,
              borderRadius: 3,
            }}
          >
            {tab.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CenterTabBar;
