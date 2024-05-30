import { View, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { tasks } from "../../mocks/tasks";
import MovableTask from "./Task";
import CustomButton from "../CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import TaskModal from "./TaskModal";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

export default function TasksContainer() {
  const [modalVisible, setModalVisible] = useState(false);
  const positions = useSharedValue(listToObject(tasks));
  const scrollViewRef = useAnimatedRef();
  const scrollY = useSharedValue(0);
  const [yPositionPage, setYPositionPage] = useState(0);

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View
      onLayout={(event) => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          setYPositionPage(pageY);
        });
      }}
      className="flex-1"
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          // flex: 1,
          position: "relative",
          backgroundColor: "transparent",
        }}
        contentContainerStyle={{
          height: tasks.length * 72,
        }}
      >
        {tasks.map((task) => (
          <MovableTask
            key={task.id}
            task={task}
            tasksCount={tasks.length}
            positions={positions}
            scrollY={scrollY}
            yPositionPage={yPositionPage}
          />
        ))}
      </Animated.ScrollView>
      <CustomButton
        title={"Add Task"}
        containerStyles="bg-primary flex-row space-x-2"
        leftIcon={<MaterialIcons name="add-circle" size={20} color="white" />}
        textStyles={"font-ProximaNovaBold"}
        handlePress={() => setModalVisible(true)}
      />
      <View className="border-t border-primary my-3"></View>
      <View className="flex-row items-center mb-3 justify-center border-secondary border-2 px-4 rounded-xl h-[40px]">
        <Text className="text-primary font-ProximaNovaReg text-xs">
          <Text className="font-ProximaNovaBold">Today's Focus Session: </Text>3
          sessions / 01 : 15 : 00
        </Text>
      </View>
      <TaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
