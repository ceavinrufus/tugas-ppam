import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import TabButtons from "../../components/TabButtons";
import CustomButton from "../../components/CustomButton";
import { ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import { MaterialIcons } from "@expo/vector-icons";
import FormField from "../../components/FormField";
const Focus = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const buttons1 = [
    { title: "Pomodoro" },
    { title: "Short Break" },
    { title: "Long Break" },
  ];

  const buttons2 = [{ title: "Today" }, { title: "Calendar" }];

  function getDayName(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

  const targetDate = new Date();
  const formattedDate = `${getDayName(
    targetDate
  )}, ${targetDate.getDate()} ${targetDate.toLocaleString("default", {
    month: "long",
  })} ${targetDate.getFullYear()}`;

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[95%]">
          <LinearGradient
            className="rounded-lg border-[#FACC2D] border"
            colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFF"]}
            locations={[0, 0, 0, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <TabButtons buttons={buttons1} setSelectedTab={setSelectedTab1} />

            <View className="flex-1 mt-7 items-center">
              {selectedTab1 === 0 ? (
                <Text className="text-6xl font-ProximaNovaBold">25:00</Text>
              ) : selectedTab1 === 1 ? (
                <Text className="text-6xl font-ProximaNovaBold">5:00</Text>
              ) : (
                <Text className="text-6xl font-ProximaNovaBold">20:00</Text>
              )}
              <LinearGradient
                className="mt-5 rounded-md border-yellow border w-full"
                colors={["#FCE07F", "#FACC2D", "#FFF"]}
                locations={[0.5, 1, 1]}
              >
                <Text className="font-ProximaNovaMedium bg-gradient-to-b from-[#FCE07F] to-yellow  p-1 text-[10px]  text-center ">
                  No selected task
                </Text>
              </LinearGradient>
              <CustomButton
                title={"Start Session"}
                handlePress={null}
                containerStyles="mt-2 h-[30px] rounded-md"
                textStyles={"font-ProximaNovaBold text-xs"}
              />
            </View>
          </LinearGradient>
          <View className="mt-2">
            <TabButtons buttons={buttons2} setSelectedTab={setSelectedTab2} />
            {/* <CalendarComponent /> */}
            <View className="flex-row gap-2 mt-2 flex-1">
              <View className="flex-1 items-center justify-center rounded-md h-[45px] bg-secondary">
                <Text>{formattedDate}</Text>
              </View>
              <Pressable className="w-1/6 h-[45px] justify-center items-center bg-secondary rounded-md">
                <Text
                  className={`font-ProximaNovaMedium text-black text-[10px]`}
                >
                  k
                </Text>
              </Pressable>
            </View>
            <View className="border-t border-primary my-3"></View>
            <View className="flex-row items-center mb-3 justify-between border-secondary border-2 px-4 rounded-xl h-[60px]">
              <View className="flex-row">
                <Text>Science Journal</Text>
              </View>
              <View className="flex-row">
                <Text>0/2</Text>
              </View>
            </View>
            <CustomButton
              title={"Add Task"}
              containerStyles="bg-primary flex-row space-x-2"
              icon={<MaterialIcons name="add-circle" size={20} color="white" />}
              textStyles={"font-ProximaNovaBold"}
              handlePress={() => setModalVisible(true)}
            />
          </View>
          <Modal
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
            transparent={true}
            visible={modalVisible}
          >
            <View className="flex-1 justify-center">
              <View
                style={styles.modalView}
                className="bg-white border border-primary mx-[30px] rounded-xl px-5 py-10"
              >
                <FormField title={"Task Name"} />
                <FormField
                  title={"Notes"}
                  required={false}
                  otherStyles="mt-4"
                />
                <CustomButton
                  containerStyles={"mt-6 border-primary border"}
                  title={"Save Changes"}
                  handlePress={() => setModalVisible(!modalVisible)}
                />
                <CustomButton
                  containerStyles={"bg-white mt-2 border-primary border"}
                  textStyles={"text-primary"}
                  title={"Cancel"}
                  handlePress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Focus;
const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
