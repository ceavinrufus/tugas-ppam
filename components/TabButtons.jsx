import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TabButtons = ({ buttons, setSelectedTab }) => {
  const [dimensions, setDimensions] = useState({ height: 30, width: 300 });

  const buttonWidth = dimensions.width / buttons.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const handlePress = (index) => {
    setSelectedTab(index);
  };

  const onTabPress = (index) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View className="bg-white rounded-lg justify-center">
      <Animated.View
        className="absolute bg-yellow rounded-lg"
        style={[
          animatedStyle,
          { height: dimensions.height, width: buttonWidth },
        ]}
      />
      <View onLayout={onTabbarLayout} className="flex-row">
        {buttons.map((button, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => onTabPress(index)}
              className="flex-1 py-3"
            >
              <Text
                className={`font-ProximaNovaMedium text-black text-center text-[10px]`}
              >
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabButtons;
