// CustomTabBar.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface CustomTabBarOptions {
  tabBarLabel?: string;
  title?: string;
  tabBarIconName: string;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
}

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const options = descriptor.options as CustomTabBarOptions;

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <View
              className={`flex flex-row justify-center gap-3 items-center ${
                isFocused ? "bg-[#DC924D] px-8 py-4 rounded-full" : ""
              }`}
            >
              <FontAwesome
                name={
                  options.tabBarIconName as keyof typeof FontAwesome.glyphMap
                }
                size={24}
                color={isFocused ? "white" : "gray"}
              />
              <Text
                style={{
                  color: isFocused ? "white" : "gray",
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    // height: 55,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 6,
    paddingTop: 6,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginHorizontal: 10,
    margin: -80,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomTabBar;
