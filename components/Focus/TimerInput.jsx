import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export default function TimerInput({
  otherContainerStyles,
  initialValue,
  minValue,
  maxValue,
}) {
  const [value, setValue] = useState(initialValue.toString());

  const handleTextChange = (text) => {
    let numericValue = Number(text);
    // Pastikan nilai tidak melebihi nilai maksimum atau kurang dari nilai minimum
    if (!isNaN(numericValue)) {
      if (numericValue > maxValue) {
        numericValue = maxValue;
      } else if (numericValue < minValue) {
        numericValue = minValue;
      }
      setValue(numericValue.toString());
    }
  };

  return (
    <TextInput
      className={`text-base text-center font-ProximaNovaBold text-black bg-white px-6 rounded-md ${otherContainerStyles}`}
      selectionColor={"black"}
      value={value}
      keyboardType="numeric"
      placeholder={`${initialValue}`}
      placeholderTextColor={"#807E78"}
      onChangeText={handleTextChange}
      maxLength={2}
    />
  );
}
