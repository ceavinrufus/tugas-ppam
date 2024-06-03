import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MovableTask from "./Task";
import TaskModal from "./TaskModal";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSchedule } from "../../context/ScheduleContext";

function listToObject(list) {
  const values = Object.values(list);
  const object = {};
  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}

export default function TasksContainer({ modalVisible, setModalVisible }) {
  const { tasks } = useSchedule(); // Use the tasks from context
  const positions = useSharedValue(listToObject(tasks));
  const scrollViewRef = useAnimatedRef();
  const scrollY = useSharedValue(0);
  const [yPositionPage, setYPositionPage] = useState(0);
  const [menuOpened, setMenuOpened] = useState(null);

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  if (!positions) return null;

  return (
    <View
      onLayout={(event) => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
          setYPositionPage(pageY);
        });
      }}
      className="flex-1"
    >
      <View className="border-t border-primary mt-1"></View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          backgroundColor: "transparent",
        }}
        contentContainerStyle={{
          height: tasks.length * 72,
        }}
      >
        {tasks &&
          tasks.map((task) => (
            <MovableTask
              key={task.id}
              task={task}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              tasksCount={tasks.length}
              positions={positions}
              scrollY={scrollY}
              yPositionPage={yPositionPage}
            />
          ))}
      </Animated.ScrollView>
      <View className="border-t border-primary mb-3"></View>
      <View className="flex-row items-center mb-3 justify-center border-secondary border-2 px-4 rounded-xl h-[40px]">
        <Text className="text-primary font-ProximaNovaReg text-xs">
          <Text className="font-ProximaNovaBold">Today's Focus Session: </Text>3
          sessions / 01 : 15 : 00
        </Text>
      </View>
      <TaskModal
        positions={positions}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
