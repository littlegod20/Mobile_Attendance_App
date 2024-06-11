import React, { useState, useRef } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ViewToken,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  ONBOARDING_SCREENS,
  OnboardingScreenItem,
} from "../../utils/constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Button from "../../components/Button";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingScreenItem>>(null);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("shared_screens/sign_up");
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
          <View style={styles.itemContainer}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
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

      <View className="p-5">
        <Button title="Get Started" onPress={completeOnboarding} />
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href="shared_screens/log_in" style={styles.loginLink}>
          Login
        </Link>
      </Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 18,
  },
  itemContainer: {
    width, // full width of the screen
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 15,
    marginTop: 60,
  },
  image: {
    width, // full width of the screen
    height: Dimensions.get("window").height * 0.3,
    resizeMode: "cover",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    // marginTop: 8,
    // marginBottom: 6,
    // backgroundColor: "yellow",
  },
  title: {
    fontSize: 24,
    marginBottom: 3,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
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
  footerText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 16,
    fontFamily: "Montserrat-Regular",
  },
  loginLink: {
    color: "#FF7A00",
    fontFamily: "Montserrat-Bold",
  },
});

export default OnboardingScreen;
