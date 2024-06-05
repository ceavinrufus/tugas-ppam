import { Platform, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Task } from "./Task";

function clamp(value, lowerBound, upperBound) {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
}

function objectMove(object, from, to) {
  "worklet";
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}

export default function MovableTask({
  task,
  tasksCount,
  positions,
  scrollY,
  yPositionPage,
  menuOpened,
  setMenuOpened,
}) {
  const dimensions = useWindowDimensions();
  const SCROLL_HEIGHT_THRESHOLD = dimensions.height / 10;
  const SCROLL_HEIGHT_WITH_SPACE = 64;
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(
    positions.value[task.id]
      ? positions.value[task.id] * SCROLL_HEIGHT_WITH_SPACE
      : (tasksCount - 1) * SCROLL_HEIGHT_WITH_SPACE
  );

  useEffect(() => {
    if (positions.value[task.id] !== undefined) {
      top.value = positions.value[task.id] * SCROLL_HEIGHT_WITH_SPACE;
    } else {
      top.value = (tasksCount - 1) * SCROLL_HEIGHT_WITH_SPACE;
    }
  }, [positions.value, task.id, tasksCount]);

  useAnimatedReaction(
    () => positions.value[task.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SCROLL_HEIGHT_WITH_SPACE);
        }
      }
    },
    [moving]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);

      if (Platform.OS === "ios") {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    onActive(event) {
      const positionY =
        event.absoluteY +
        scrollY.value -
        yPositionPage +
        SCROLL_HEIGHT_THRESHOLD / 2;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        // Scroll down
        const contentHeight = tasksCount * SCROLL_HEIGHT_WITH_SPACE;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = Math.max(contentHeight - containerHeight, 0);
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = positionY - SCROLL_HEIGHT_WITH_SPACE;

      const newPosition = clamp(
        Math.floor(positionY / SCROLL_HEIGHT_WITH_SPACE),
        0,
        tasksCount - 1
      );

      if (newPosition !== positions.value[task.id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[task.id],
          newPosition
        );

        if (Platform.OS === "ios") {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      top.value = withSpring(
        positions.value[task.id] * SCROLL_HEIGHT_WITH_SPACE
      );
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      borderRadius: 12,
      zIndex: moving ? 1 : 0,
      backgroundColor: "transparent",
      shadowColor: "black",
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View
      style={[
        animatedStyle,
        { shadowOffset: { height: 0, width: 0 }, marginTop: 2 },
      ]}
    >
      <LinearGradient
        colors={
          moving
            ? ["#C2D9FF", "#DFEBFF", "#FFFFFF"]
            : ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
        }
        locations={[0, 1, 1]}
        className="rounded-xl"
      >
        <View className="flex-row items-center justify-between border-secondary border-2 px-4 rounded-xl h-[60px]">
          <Task
            task={task}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View className="absolute right-0 z-10">
              <MaterialIcons name="drag-indicator" size={20} color="#807E78" />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}
