import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export default function TimerInput({ otherContainerStyles, initialValue }) {
  const [timer, setTimer] = useState(0);

  return (
    <TextInput
      className={`text-base text-center font-ProximaNovaBold text-black bg-white px-6 rounded-md ${otherContainerStyles}`}
      selectionColor={"black"}
      value={Number(timer)}
      placeholder={initialValue}
      placeholderTextColor={"#807E78"}
      onChangeText={(text) => setTimer(Number(text))}
    />
  );
}
