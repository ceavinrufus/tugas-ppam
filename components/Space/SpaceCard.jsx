import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import SpaceInfoModal from "./SpaceInfoModal";
import { useSpace } from "../../context/SpaceContext";
import { MaterialIcons } from "react-native-vector-icons";
import SpaceModal from "./SpaceModal";

export default function SpaceCard({ space, canEdit = false }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const { removeSpace } = useSpace();

  const handleDeleteSpace = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .delete()
      .eq("id", space.id)
      .select();

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Space deleted!");
      removeSpace(data[0].id);

      setMenuOpened(null);
    }
  };

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
            {space.members && space.members.length}{" "}
            {space.members && space.members.length > 1 ? "members" : "member"}
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
      {!canEdit ? (
        <>
          <View className="justify-center">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ChevronRightIcon color="black" size={24} />
            </TouchableOpacity>
          </View>

          <SpaceInfoModal
            space={space}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </>
      ) : (
        <View className="flex-row items-center mr-[10px]">
          {/* More button */}
          <View className="bg-secondary mr-1 relative rounded-sm flex items-center justify-center h-[30px] w-[30px]">
            <TouchableOpacity onPress={() => setMenuOpened(true)}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Modal transparent={true} visible={menuOpened} animationType="fade">
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setMenuOpened(false)}
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
                  <Text className="ml-2">Edit space</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center px-2 py-1"
                  onPress={handleDeleteSpace}
                >
                  <View className="p-2 bg-secondary rounded-md">
                    <FontAwesome6 name="trash-can" size={16} color="black" />
                  </View>
                  <Text className="ml-2">Delete space</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
          <SpaceModal
            space={space}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </View>
  );
}
