import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { AntDesign } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string;
}

interface CustomDropDownProps {
  options: Option[];
  options_type: string;
  customStyles?: object;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  options_type,
  customStyles,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    toggleOptions();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleOptions}
        style={[
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 15,
            borderRadius: 5,
            backgroundColor: "#DC924D",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          customStyles,
        ]}
      >
        <ThemedText type="subtitle" style={styles.dropdownText}>
          {selectedOption ? selectedOption.label : `Select ${options_type}`}
        </ThemedText>
        <AntDesign name="caretdown" size={20} color="white" />
      </TouchableOpacity>
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleOptions}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleOptionSelect(option)}
                style={styles.option}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownText: {
    fontSize: 16,
    color: "white",
    marginRight: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CustomDropDown;
