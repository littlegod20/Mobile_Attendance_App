import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { ThemedText } from "../contexts/ThemedText";

type Data = {
  id: number;
  label: string;
};

interface CenterTabProps {
  handleTabPress: (tabId: number) => void;
  scrollX: Animated.Value;
  width: number;
  tabData: Data[];
  activeTab: number; // Add activeTab to props
}

const CenterTabBar: React.FC<CenterTabProps> = ({
  handleTabPress,
  scrollX,
  width,
  tabData,
  activeTab,
}) => {
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  const onTabLayout = (event: any, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const tabWidth = tabWidths.length ? tabWidths[activeTab - 1] : 0;

  const inputRange = tabData.map((_, index) => index * width);
  const tabIndicatorPosition = scrollX.interpolate({
    inputRange,
    outputRange: tabData.map((_, index) =>
      tabWidths.slice(0, index).reduce((a, b) => a + b, 0)
    ),
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: 'center'
        paddingTop: 5,
        // paddingLeft: 20,
        marginHorizontal: 10,
        backgroundColor: "#DC924D",
        borderRadius: 12,
        position: "relative",
      }}
    >
      <View style={{ width: "100%", height: "75%", position: "absolute" }}>
        <Animated.View
          style={[
            {
              width: tabWidth,
              backgroundColor: "white",
              borderRadius: 15,
              transform: [{ translateX: tabIndicatorPosition }],
              zIndex: 0,
              height: "100%",
            },
          ]}
        />
      </View>
      {tabData.map((tab, index) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => handleTabPress(tab.id)}
          style={{
            position: "relative",
            height: 60,
            justifyContent: "center",
            padding: 5,
            zIndex: 1,
          }}
          onLayout={(event) => onTabLayout(event, index)}
        >
          <ThemedText
            type="mediumSemi"
            customStyle={{
              color: "black",
              paddingHorizontal: 10,
              borderRadius: 3,
              textAlign: "center",
              width: 100,
              // backgroundColor: "blue",
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
