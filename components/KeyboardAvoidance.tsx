import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native";

interface KeyboardAvoidanceContainerProps {
  children: ReactNode;
}

const KeyboardAvoidanceContainer: React.FC<KeyboardAvoidanceContainerProps> = ({
  children,
}) => {
  return (
    <SafeAreaView className="flex-1 w-full">
      <KeyboardAvoidingView
        className="flex-1 w-full "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1, backgroundColor: "pink", width: "100%" }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // style={styles.contentContainer}
            className="flex-1 w-full"
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   contentContainer: {
//     paddingTop:
//       Platform.OS === "android" && StatusBar.currentHeight
//         ? StatusBar.currentHeight + 10
//         : 10,
//   },
// });

export default KeyboardAvoidanceContainer;
