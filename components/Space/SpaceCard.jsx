import React, { useState } from "react";
import { Text, View, Image, Modal, TouchableOpacity } from "react-native";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import SpaceModal from "./SpaceModal";

export default function SpaceCard({ space }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-row mb-2 rounded-xl border-2 border-secondary overflow-hidden">
      {/* Image */}
      <View className={`border-secondary border-r-2 rounded-l-xl`}>
        <Image
          resizeMode="cover"
          source={{ uri: space.image }}
          className="w-20 h-20"
        />
      </View>
      {/* Info */}
      <View className="justify-center ml-4 flex-1">
        <Text className="text-sm font-ProximaNovaBold mb-1">{space.name}</Text>

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

      {/* Modal */}
      <View className="justify-center">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <ChevronRightIcon color="black" size={24} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <SpaceModal
        space={space}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
