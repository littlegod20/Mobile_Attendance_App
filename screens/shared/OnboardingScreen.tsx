// app/OnboardingScreen.tsx
import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ViewToken,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ONBOARDING_SCREENS,
  OnboardingScreenItem,
} from "../../utils/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Button from "../../components/Button";
// import { Button } from "react-native";

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingScreenItem>>(null);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("./student-lecturer");
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={ONBOARDING_SCREENS}
        renderItem={({ item }) => (
          <View className="flex items-center w-[300px] justify-end  mx-3 ">
            <Image source={item.img} style={styles.image} />
            <View className="mt-8 mb-6 flex flex-col justify-center items-center">
              <Text className="text-xl mb-3 font-[Montserrat-Bold]">
                {item.title}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ref={flatListRef}
      />
      <View style={styles.indicatorContainer}>
        {ONBOARDING_SCREENS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index
                ? styles.activeIndicator
                : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>

      <Button title="Get Started" onPress={completeOnboarding} />
      <Text className="text-center text-base my-4 font-[Montserrat-Regular]">
        Already have an account?{" "}
        <Link
          href="/student/registration/log_in"
          className="text-[#FF7A00] font-[Montserrat-Bold]"
        >
          Login
        </Link>
      </Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  image: {
    width: 300,
    height: "30%",
    marginBottom: 20,
    objectFit: "cover",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    padding: 3,
    fontFamily: "Montserrat-Regular",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  indicator: {
    width: 30,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#FF7A00",
  },
  inactiveIndicator: {
    backgroundColor: "gray",
  },
});

export default OnboardingScreen;
