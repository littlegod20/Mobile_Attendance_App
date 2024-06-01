import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomHeader from "../../../components/CustomHeader";
import "../../../global.css";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
              shadowColor: "transparent",
            },
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "",
            header: (props) => <CustomHeader {...props} />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "",
            header: (props) => <CustomHeader {...props} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
