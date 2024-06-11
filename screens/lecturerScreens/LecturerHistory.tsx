import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import GoBackBtn from "../../components/GoBackBtn";
import { ThemedText } from "../../contexts/ThemedText";
import CustomDropDown from "../../components/CustomDropDown";
import CenterTabBar from "../../components/CenterTab";
import { Animated } from "react-native";
import DetailForm from "../../components/DetailForm";
import CustomForm from "../../components/Form";
import { ScrollView } from "react-native";

const options = [
  { label: "Telecom 1", value: "option1" },
  { label: "Telecom 2", value: "option2" },
  { label: "Telecom 3", value: "option3" },
  { label: "Telecom 4", value: "option4" },
];

const tabs = [
  {
    id: 1,
    label: "All(200)",
  },
  {
    id: 2,
    label: "Above 50%",
  },
  {
    id: 3,
    label: "Below 50%",
  },
];

const { width } = Dimensions.get("window");

const LecturerHistory = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabId: number) => {
    setActiveTab(tabId);
    scrollToTab(tabId);
  };

  const scrollToTab = (tabId: number) => {
    const offsetX = (tabId - 1) * width;
    scrollViewRef.current?.scrollTo({ x: offsetX, animated: true });
  };

  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full"
      >
        <ThemedView className="mt-10 flex justify-end items-end w-full p-4">
          <ThemedView className="w-1/2">
            <CustomDropDown options={options} options_type="Class" />
          </ThemedView>
        </ThemedView>

        <ThemedView className="mt-14">
          <CenterTabBar
            tabData={tabs}
            handleTabPress={handleTabPress}
            scrollX={scrollX}
            width={width}
            activeTab={activeTab} // Pass activeTab as a prop
          />
        </ThemedView>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: width * tabs.length,
          }}
          className="flex-1"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* All(200) Section */}
          <View style={{ width: width }}>
            <DetailForm
              name="Lecturer Name"
              email="lecturer@gmail.com"
              password="****"
            />
          </View>
          {/* Above 50% Section */}
          <View style={{ width: width }}>
            <DetailForm
              serialNo={2395959}
              programme="Bsc. Telecommunication Eng."
            />
          </View>
          {/* Below 50% Section */}
          <View style={{ width: width }}>
            <DetailForm
              serialNo={2395959}
              programme="Bsc. Telecommunication Eng."
            />
          </View>
        </Animated.ScrollView>
        <StatusBar barStyle={"dark-content"} />
      </ImageBackground>
    </ThemedView>
  );
};

export default LecturerHistory;
