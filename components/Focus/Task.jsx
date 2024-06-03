import {
  Text,
  Platform,
  View,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
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
import { BlurView } from "expo-blur";
import { useTask } from "../../context/TaskContext";

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
  const SCROLL_HEIGHT_WITH_SPACE = 68;
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
        { shadowOffset: { height: 0, width: 0 }, marginTop: 4 },
      ]}
    >
      <BlurView intensity={moving ? 200 : 0}>
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
      </BlurView>
    </Animated.View>
  );
}

export function Task({ task, menuOpened, setMenuOpened }) {
  const { currentTask, startTask, pauseTask, isRunning, elapsedTime } =
    useTask();
  const isCurrentTask = currentTask && currentTask.id === task.id;
  const [ela, setEla] = useState(task.elapsedTime);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (currentTask) {
      if (currentTask.id === task.id && isRunning) {
        pauseTask();
      } else {
        startTask(task);
      }
    } else {
      startTask(task);
    }
  };

  useEffect(() => {
    if (currentTask) {
      if (currentTask.id === task.id) {
        setEla(ela + 1);
      }
    }
  }, [elapsedTime]);

  return (
    <>
      <View className="flex-row items-center gap-2">
        <Pressable onPress={handlePlayPause}>
          <MaterialIcons
            name={
              isCurrentTask && isRunning
                ? "pause-circle-filled"
                : "play-circle-filled"
            }
            size={32}
            color="#190482"
          />
        </Pressable>
        <View className="flex-1">
          <View className="w-full">
            <Text className="font-ProximaNovaBold">{task.name}</Text>
            {isCurrentTask && (
              <>
                <Text className="font-ProximaNovaMedium">
                  {formatTime(ela)}
                </Text>
                <View className="h-2 w-full bg-gray-300 rounded-full">
                  <View
                    style={{
                      width: `${
                        task.estimated_pomodoro != 0
                          ? (ela / (task.estimated_pomodoro * 60 * 25)) * 100
                          : 0
                      }%`,
                    }}
                    className="h-full bg-primary rounded-full"
                  />
                </View>
              </>
            )}
          </View>
        </View>
        <View className="flex-row items-center mr-[10px]">
          <Text className="font-ProximaNovaMedium mr-2 text-grey w-[40px] text-right">
            {Math.floor(ela / (60 * 25))}/{task.estimated_pomodoro}
          </Text>

          {/* More button */}
          <View className="bg-secondary relative rounded-sm flex items-center justify-center h-[30px] w-[30px]">
            <TouchableOpacity
              onPress={() => {
                if (menuOpened != task.id) {
                  setMenuOpened(task.id);
                } else {
                  setMenuOpened(null);
                }
              }}
            >
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Modal
            transparent={true}
            visible={task.id == menuOpened}
            animationType="fade"
          >
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setMenuOpened(null)}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Pressable className="px-4 py-2" onPress={() => {}}>
                  <Text>Edit task</Text>
                </Pressable>
                <Pressable
                  className="px-4 py-2"
                  onPress={() => console.log("Delete task")}
                >
                  <Text>Delete task</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>
    </>
  );
}
