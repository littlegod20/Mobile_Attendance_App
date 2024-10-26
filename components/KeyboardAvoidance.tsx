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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1, width: "100%" }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
  },
  keyboardAvoiding: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default KeyboardAvoidanceContainer;
