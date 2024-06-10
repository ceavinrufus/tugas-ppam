import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TabButtons = ({
  buttons,
  triggerReset,
  setSelectedTab,
  otherTextStyles,
  selectedTab, // Add selectedTab to props
}) => {
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

  useEffect(() => {
    tabPositionX.value = withTiming(buttonWidth * 0, {}, () => {
      runOnJS(handlePress)(0);
    });
  }, [triggerReset]);

  useEffect(() => {
    tabPositionX.value = withTiming(buttonWidth * selectedTab, {}, () => {
      runOnJS(handlePress)(selectedTab);
    });
  }, [selectedTab]); // Update animation when selectedTab changes

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
    <View className="bg-gray-100 rounded-lg justify-center">
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
                className={`font-ProximaNovaMedium text-black text-center text-[10px] ${otherTextStyles}`}
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
