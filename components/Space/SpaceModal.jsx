import { View, Text, Modal, StyleSheet, Image } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import TextProximaNovaReg from "../TextProximaNovaReg";

export default function SpaceModal({ space, modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        className="flex-1 justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <LinearGradient
          colors={["#FACC2D", "#FBDB6A", "#FDEAA7", "#FFFFFF"]}
          locations={[0, 0, 0, 1]}
          style={styles.modalView}
          className="bg-white rounded-xl border-yellow border-2 mx-[30px] px-5 py-4"
        >
          <View className="flex-row">
            {/* Image */}
            <View className={`border-yellow border rounded-xl overflow-hidden`}>
              <Image
                resizeMode="cover"
                source={{ uri: space.image }}
                className="w-20 h-20"
              />
            </View>

            {/* Info */}
            <View className="justify-center ml-4 flex-1">
              <Text className="text-sm font-ProximaNovaBold mb-1 text-primary">
                {space.name}
              </Text>

              <View className="flex-row items-center">
                <FontAwesome5 name="user-friends" size={10} color="black" />
                <Text className="ml-1 text-xs font-ProximaNovaMedium">
                  {space.members} {space.members > 1 ? "members" : "member"}
                </Text>
              </View>
              <View className="flex-row items-center">
                <FontAwesome6 size={10} name="bolt" color="black" />
                <Text className="ml-2 text-xs font-ProximaNovaMedium">
                  {space.sessions} {space.sessions > 1 ? "sessions" : "session"}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <TextProximaNovaReg className="text-justify my-2 text-xs">
            Space Tergacor Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </TextProximaNovaReg>

          <View className="flex-row justify-between items-center">
            <CustomButton
              containerStyles={"bg-white w-[49%] mt-2 border-primary border"}
              textStyles={"text-primary"}
              title={"Cancel"}
              handlePress={() => setModalVisible(!modalVisible)}
            />
            <CustomButton
              containerStyles={"mt-2 w-[49%] border-primary border"}
              title={"Join"}
              handlePress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

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
