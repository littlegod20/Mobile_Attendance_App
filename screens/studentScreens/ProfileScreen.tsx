import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import GoBackBtn from "../../components/GoBackBtn";
import { ThemedText } from "../../contexts/ThemedText";
import { Avatar } from "react-native-paper";
import { darkTheme } from "../../themes/themes";
import { useState, useRef } from "react";
import CenterTabBar from "../../components/CenterTab";
import DetailForm from "../../components/DetailForm";
import CustomForm from "../../components/Form";

const tabs = [
  {
    id: 1,
    name: "Contact",
    pressed: true,
  },
  {
    id: 2,
    name: "Programme",
    pressed: true,
  },
  {
    id: 3,
    name: "Edit Info",
    pressed: true,
  },
];

const inputConfigs = [
  { name: "Name", placeholder: "Surname Firstname" },
  { name: "Email", placeholder: "Enter your email" },
  { name: "Password", placeholder: "Enter your password" },
];

const { width } = Dimensions.get("window");

export default function Profile() {
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

  // handling Saving edited details
  const handleSaveDetails = (formValues: { [key: string]: string }) => {
    console.log("Saving Details:", formValues);
  };
  return (
    <ThemedView className="flex-1 w-full ">
      <View className="w-full mb-8 flex flex-row p-4 items-center ">
        <Avatar.Image
          size={60}
          source={require("../../assets/images/icon.png")}
          theme={darkTheme}
        />
        <View className="flex  ml-3">
          <ThemedText type="defaultSemiBold" className="uppercase">
            <Text>Amaame</Text>
          </ThemedText>

          <ThemedText type="mediumRegular" className="uppercase">
            Isaac Junior Litty
          </ThemedText>
        </View>
      </View>

      <View className="relative p-4">
        <CenterTabBar
          handleTabPress={handleTabPress}
          scrollX={scrollX}
          width={width}
        />
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: width * 3,
        }}
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Contact Section */}
        <DetailForm
          name="Kwaku Amaame Osei"
          email="kwakua023@gmail.com"
          password="****"
        />
        {/* Programme section */}
        <DetailForm
          studentId={302230}
          indexNo={4032344}
          programme="Bsc. Telecommunication Eng."
          year="Three (3)"
        />
        {/* Edit info section */}
        <View style={{ width: width }}>
          <CustomForm
            inputs={inputConfigs}
            onSubmit={handleSaveDetails}
            buttonTitle="Save"
            path={"./history"}
          />
        </View>
      </Animated.ScrollView>
    </ThemedView>
  );
}
