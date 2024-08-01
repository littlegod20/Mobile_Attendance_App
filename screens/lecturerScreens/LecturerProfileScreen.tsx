import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import GoBackBtn from "../../components/GoBackBtn";
import { ThemedText } from "../../contexts/ThemedText";
import { Avatar } from "react-native-paper";
import { darkTheme } from "../../themes/themes";
import { useState, useRef, useEffect } from "react";
import CenterTabBar from "../../components/CenterTab";
import DetailForm from "../../components/DetailForm";
import CustomForm from "../../components/Form";
import { User } from "../../utils/types";
import * as SecureStore from "expo-secure-store";

const tabs = [
  {
    id: 1,
    label: "Contact",
  },
  {
    id: 2,
    label: "Other Info",
  },
  {
    id: 3,
    label: "Edit",
  },
];

const { width } = Dimensions.get("window");

export default function LecturerProfile() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const inputConfigs = [
    { name: "Name", placeholder: user?.name },
    { name: "Email", placeholder: user?.email },
    { name: "Password", placeholder: "Enter your password" },
  ];

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const name = await SecureStore.getItemAsync("name");
      const email = await SecureStore.getItemAsync("email");
      const password = await SecureStore.getItemAsync("password");
      const school_id = await SecureStore.getItemAsync("school_id");
      const faculty = await SecureStore.getItemAsync("faculty");
      const programme = await SecureStore.getItemAsync("programme");

      if (programme && name && email && password && school_id && faculty) {
        setUser({
          name,
          email,
          password,
          school_id,
          faculty,
          programme,
        });
      } else {
        console.error("Some user data is missing from secure storage");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsLoading(false);
    }
  };

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
          source={require("../../assets/rollcall.png")}
          theme={darkTheme}
        />
        <View className="flex  ml-3">
          <ThemedText type="defaultSemiBold" className="uppercase">
            {user?.name?.split(" ")[0]}
          </ThemedText>

          <ThemedText type="mediumRegular" className="uppercase">
            {user?.name?.split(" ").slice(1).join(" ")}
          </ThemedText>
        </View>
      </View>

      <View className="mt-14">
        <CenterTabBar
          tabData={tabs}
          handleTabPress={handleTabPress}
          scrollX={scrollX}
          width={width}
          activeTab={activeTab}
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
        {isLoading ? (
          <View className="flex-1 flex justify-center items-center">
            <ActivityIndicator size="large" color="#A66d37" />
          </View>
        ) : error ? (
          <ThemedText>Error: {error.message} </ThemedText>
        ) : (
          <View style={{ width: width }}>
            {/* Contact Section */}
            <DetailForm
              name={user?.name}
              email={user?.email}
              password={user?.password}
            />
          </View>
        )}

        {/* Programme section */}
        <View style={{ width: width }}>
          <DetailForm serialNo={user?.school_id} programme={user?.programme} />
        </View>
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
