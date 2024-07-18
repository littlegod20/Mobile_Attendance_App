import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "../contexts/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { Option } from "../utils/types";

interface CustomDropDownProps {
  options: Option[];
  options_type: string;
  customStyles?: object;
  selectedOption?: Option;
  onSelectOption1?: (type: string, option: Option) => void;
  onSelectOption2?: (option: Option) => void;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  options_type,
  customStyles,
  onSelectOption1,
  onSelectOption2,
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

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    toggleOptions();
    onSelectOption1 && onSelectOption1(options_type, option);
    onSelectOption2 && onSelectOption2(option);
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
        animationType="slide"
        onRequestClose={toggleOptions}
      >
        <TouchableWithoutFeedback onPress={toggleOptions}>
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
        </TouchableWithoutFeedback>
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
