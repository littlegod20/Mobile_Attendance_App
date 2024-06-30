import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "@env";

interface Option {
  label: string;
  value: string;
}

interface CustomDropDownProps {
  options: Option[];
  options_type: string;
  customStyles?: object;
  selectedOption?: Option;
  onSelectOption: (type: string, option: Option) => void;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  options_type,
  customStyles,
  onSelectOption,
  selectedOption: propSelectedOption,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    propSelectedOption
  );

  useEffect(() => {
    setSelectedOption(propSelectedOption);
  }, [propSelectedOption]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // const handleOptionSelect = async (option: Option) => {
  //   setSelectedOption(option);
  //   toggleOptions();
  //   console.log(option);
  //   try {
  //     const selected = await fetch(`${API_URL}/history?${option.value}`);

  //     if (!selected.ok) {
  //       throw new Error("Failed to send option");
  //     }
  //     const data = await selected.json();
  //     console.log("Student Option:", data);
  //   } catch (error) {
  //     console.log("Failed to send student's selected option:", error);
  //   }
  // };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    toggleOptions();
    onSelectOption(options_type, option);
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
