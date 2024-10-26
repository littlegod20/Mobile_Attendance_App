import { View, ScrollView, Dimensions, Animated, Image } from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import { useState, useRef, useEffect } from "react";
import CenterTabBar from "../../components/CenterTab";
import DetailForm from "../../components/DetailForm";
import CustomForm from "../../components/Form";
import KeyboardAvoidanceContainer from "../../components/KeyboardAvoidance";
import * as SecureStore from "expo-secure-store";
import { User } from "../../utils/types";
import { ActivityIndicator } from "react-native";

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

export default function Profile() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const name = await SecureStore.getItemAsync("name");
      const email = await SecureStore.getItemAsync("email");
      const password = await SecureStore.getItemAsync("password");
      const school_id = await SecureStore.getItemAsync("school_id");
      const faculty = await SecureStore.getItemAsync("faculty");
      const programme = await SecureStore.getItemAsync("programme");
      const year = await SecureStore.getItemAsync("year");

      if (
        programme &&
        year &&
        name &&
        email &&
        password &&
        school_id &&
        faculty
      ) {
        setUser({
          name,
          email,
          password,
          school_id,
          faculty,
          programme,
          year,
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

  const inputConfigs = [
    { name: "Name", placeholder: user?.name },
    { name: "Email", placeholder: user?.email },
    { name: "Password", placeholder: "Enter your new password" },
  ];

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
        <View className="flex flex-row items-center ml-3">
          <Image source={require("../../assets/images/user.png")} alt="user" />
          <View className="ml-2">
            <ThemedText type="defaultSemiBold" className="uppercase">
              {user?.name?.split(" ")[0]}
            </ThemedText>

            <ThemedText type="mediumRegular" className="uppercase">
              {user?.name?.split(" ").slice(1).join(" ")}
            </ThemedText>
          </View>
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
          width: width * tabs.length,
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

        <View style={{ width: width }}>
          <DetailForm
            studentId={user?.school_id}
            programme={user?.programme}
            year={user?.year}
          />
        </View>

        <KeyboardAvoidanceContainer>
          <View style={{ width: width }}>
            <CustomForm
              inputs={inputConfigs}
              onSubmit={handleSaveDetails}
              buttonTitle="Save"
              path={"./history"}
            />
          </View>
        </KeyboardAvoidanceContainer>
      </Animated.ScrollView>
    </ThemedView>
  );
}
