import { View, Text, ImageBackground } from "react-native";
import { ThemedView } from "../../contexts/ThemedView";
import { ThemedText } from "../../contexts/ThemedText";
import GoBackBtn from "../../components/GoBackBtn";

export default function Settings() {
  return (
    <ThemedView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/screen_deco.png")}
        className="flex-1 w-full p-4"
      >
        <View className="h-[8%] flex justify-center mt-10">
          <GoBackBtn path="./(tabs)" />
        </View>
        <View className=" h-[10%] flex justify-center border-b-[1px] border-gray-500 mb-3">
          {/* <ThemedText type="subtitle">Settings</ThemedText> */}
        </View>
        <View className="h-1/2">
          <ThemedText type="defaultSemiBold" className="mb-5">
            About
          </ThemedText>
          <ThemedText type="mediumRegular" className="leading-8">
            Attendance checking app built by final year Telecommunication
            Engineering students of KNUST.
          </ThemedText>
        </View>
        <View className="border-t-[1px] border-gray-500">
          <ThemedText type="defaultSemiBold" className="mt-2">
            Version
          </ThemedText>
          <View className="flex w-full justify-between flex-row">
            <ThemedText type="mediumRegular">0.0.0</ThemedText>
            <ThemedText type="mediumRegular">© 2024</ThemedText>
          </View>
        </View>
      </ImageBackground>
    </ThemedView>
  );
}
