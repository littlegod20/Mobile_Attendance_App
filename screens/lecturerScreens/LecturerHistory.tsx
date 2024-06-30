import {
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import CustomDropDown from "../../components/CustomDropDown";
import CenterTabBar from "../../components/CenterTab";
import { Octicons } from "@expo/vector-icons";

const options = [
  { label: "Telecom 1", value: "option1" },
  { label: "Telecom 2", value: "option2" },
  { label: "Telecom 3", value: "option3" },
  { label: "Telecom 4", value: "option4" },
];

type StudentsProps = {
  id: number;
  name: string;
  status: boolean;
  index: number;
};

const students: StudentsProps[] = [
  {
    id: 1,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 2,
    name: "James",
    status: false,
    index: 43203054,
  },
  {
    id: 3,
    name: "John",
    status: true,
    index: 43203054,
  },
  {
    id: 4,
    name: "James",
    status: false,
    index: 43203054,
  },
  {
    id: 5,
    name: "James",
    status: false,
    index: 43203054,
  },
  {
    id: 6,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 7,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 8,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 9,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 10,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 11,
    name: "James",
    status: false,
    index: 43203054,
  },
  {
    id: 12,
    name: "Theophilus Asante Frimpong",
    status: false,
    index: 43203054,
  },
  {
    id: 13,
    name: "James",
    status: true,
    index: 43203054,
  },
  {
    id: 14,
    name: "James",
    status: false,
    index: 43203054,
  },
  {
    id: 15,
    name: "James Appiah Owusu",
    status: false,
    index: 43203054,
  },
  {
    id: 16,
    name: "Appiah Daniel",
    status: false,
    index: 43203054,
  },
  {
    id: 17,
    name: "James",
    status: false,
    index: 43203054,
  },
];
const tabs = [
  {
    id: 1,
    label: `All (${students.length})`,
  },
  {
    id: 2,
    label: `Above 50% (${
      students.filter((item) => item.status === true).length
    })`,
  },
  {
    id: 3,
    label: `Below 50% (${
      students.filter((item) => item.status === false).length
    })`,
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
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              // backgroundColor: "#DC924D",
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
              <View className="flex-1 w-1/2">
                <ThemedText>Name</ThemedText>
              </View>
              <View className="w-1/3 ">
                <ThemedText>Index No.</ThemedText>
              </View>
              <View className="">
                <ThemedText>Status</ThemedText>
              </View>
            </View>
            <FlatList
              data={students}
              renderItem={({ item }) => (
                <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                  <View className="flex-1 w-1/2 ">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 165 }}
                    >
                      {item.name}
                    </ThemedText>
                  </View>
                  <View className="w-1/3 mr-5">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.index}
                    </ThemedText>
                  </View>
                  <View className="">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.status ? (
                        <Octicons name="dot-fill" size={24} color="green" />
                      ) : (
                        <Octicons name="dot-fill" size={24} color="red" />
                      )}
                    </ThemedText>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              // showsVerticalScrollIndicator={false}
              style={{ marginBottom: 80 }}
            />
          </View>

          {/* Above 50% Section */}
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
              <View className="flex-1 w-1/2">
                <ThemedText>Name</ThemedText>
              </View>
              <View className="w-1/3 ">
                <ThemedText>Index No.</ThemedText>
              </View>
              <View className="">
                <ThemedText>Status</ThemedText>
              </View>
            </View>
            <FlatList
              data={students.filter((item) => item.status === true)}
              renderItem={({ item }) => (
                <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                  <View className="flex-1 w-1/2 ">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 165 }}
                    >
                      {item.name}
                    </ThemedText>
                  </View>
                  <View className="w-1/3 mr-5">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.index}
                    </ThemedText>
                  </View>
                  <View className="">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.status && (
                        <Octicons name="dot-fill" size={24} color="green" />
                      )}
                    </ThemedText>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              // showsVerticalScrollIndicator={false}
              style={{ marginBottom: 80 }}
            />
          </View>

          {/* Below 50% Section */}
          <View
            style={{
              width: width,
              paddingHorizontal: 15,
              marginTop: 10,
              // height: 30,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <View className="w-full flex justify-between flex-row bg-coffee_light mb-4">
              <View className="flex-1 w-1/2">
                <ThemedText>Name</ThemedText>
              </View>
              <View className="w-1/3 ">
                <ThemedText>Index No.</ThemedText>
              </View>
              <View className="">
                <ThemedText>Status</ThemedText>
              </View>
            </View>
            <FlatList
              data={students.filter((item) => item.status === false)}
              renderItem={({ item }) => (
                <View className="border-t-2 border-gray-400   flex items-center w-full justify-between flex-row h-20">
                  <View className="flex-1 w-1/2 ">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 165 }}
                    >
                      {item.name}
                    </ThemedText>
                  </View>
                  <View className="w-1/3 mr-5">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.index}
                    </ThemedText>
                  </View>
                  <View className="">
                    <ThemedText
                      className=""
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={{ maxWidth: 100 }}
                    >
                      {item.status ? (
                        <Octicons name="dot-fill" size={24} color="green" />
                      ) : (
                        <Octicons name="dot-fill" size={24} color="red" />
                      )}
                    </ThemedText>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              // showsVerticalScrollIndicator={false}
              style={{ marginBottom: 80 }}
            />
          </View>
        </Animated.ScrollView>
        <StatusBar barStyle={"dark-content"} />
      </ImageBackground>
    </ThemedView>
  );
};

export default LecturerHistory;
