import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { useTimer } from "../../context/TimerContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSchedule } from "../../context/ScheduleContext";
import { supabase } from "../../lib/supabase";
import TaskModal from "./TaskModal";
import { formatTime } from "../../utils/timeHelper";

export function Task({ task, menuOpened, setMenuOpened }) {
  const { currentTask, startTask, pauseTask, isRunning, elapsedTime } =
    useTimer();
  const isCurrentTask = currentTask && currentTask.id === task.id;
  const [ela, setEla] = useState(task.elapsedTime);
  const { removeTask } = useSchedule();
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleDeleteTask = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id)
      .select();

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Task deleted!");
      removeTask(data[0].id);

      setMenuOpened(null);
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
    <View className="flex-row items-center gap-2">
      <TouchableOpacity onPress={handlePlayPause}>
        <MaterialIcons
          name={
            isCurrentTask && isRunning
              ? "pause-circle-filled"
              : "play-circle-filled"
          }
          size={32}
          color="#190482"
        />
      </TouchableOpacity>
      <View className="flex-1">
        <View className="w-full">
          <Text className="font-ProximaNovaBold">{task.name}</Text>
          {isCurrentTask && (
            <>
              <Text className="font-ProximaNovaMedium">{formatTime(ela)}</Text>
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
              <TouchableOpacity
                className="flex-row items-center px-2 py-1"
                onPress={() => setModalVisible(true)}
              >
                <View className="p-2 bg-secondary rounded-md">
                  <FontAwesome6 name="edit" size={14} color="black" />
                </View>
                <Text className="ml-2">Edit task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row items-center px-2 py-1"
                onPress={handleDeleteTask}
              >
                <View className="p-2 bg-secondary rounded-md">
                  <FontAwesome6 name="trash-can" size={16} color="black" />
                </View>
                <Text className="ml-2">Delete task</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
        <TaskModal
          task={task}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
}
