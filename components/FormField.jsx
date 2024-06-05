import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import eye from "../assets/icons/eye.png";
import eyehide from "../assets/icons/eye-hide.png";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  required = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-ProximaNovaMedium">
        {title}
        {required && <Text className="text-[#FF3528]">*</Text>}
      </Text>

      <View className="w-full h-11 px-4 bg-black-100 border border-lightgrey rounded-lg focus:border-yellow flex-row items-center">
        <TextInput
          className="flex-1 font-ProximaNovaReg"
          selectionColor={"#99C3FF"}
          cursorColor={"black"}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#807E78"}
          onChangeText={handleChangeText}
          secureTextEntry={
            title.toLowerCase().includes("password") && !showPassword
          }
          {...props}
        />
        {title.toLowerCase().includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? eye : eyehide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
