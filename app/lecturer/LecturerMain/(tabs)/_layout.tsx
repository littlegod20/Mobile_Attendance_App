// LecturerHomeLayout.tsx
import { Tabs } from "expo-router";
import CustomHeader from "../../../../components/CustomHeader";
import CustomTabBar from "../../../../components/CustomTabBar";

export default function LecturerHomeLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: {
          fontFamily: "Montserrat-SemiBold",
          width: "100%",
        },
        tabBarIconName: route.name === "index" ? "home" : "folder-open",
        tabBarAccessibilityLabel: `tab-bar-${route.name}`,
        tabBarTestID: `tab-bar-${route.name}`,
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: (props) => <CustomHeader {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
