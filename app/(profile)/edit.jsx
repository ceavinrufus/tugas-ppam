import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { supabase } from "../../lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "react-native-vector-icons";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { useAuth } from "../../context/AuthContext";

const data = [
  { label: "Male", value: "boy" },
  { label: "Female", value: "girl" },
];

const Edit = () => {
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        const formData = {
          name: data[0].full_name,
          nickname: data[0].nickname,
          bio: data[0].bio,
        };

        setGender(data[0].gender);
        setNickname(data[0].nickname);
        setAvatar(data[0].avatar);
        setForm(formData);
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0].uri;
      setAvatar(img);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);

    const updates = {
      id: user.id,
      full_name: form.name,
      nickname: form.nickname,
      bio: form.bio,
      gender,
      updated_at: new Date(),
    };

    if (avatar) {
      const base64img = await FileSystem.readAsStringAsync(avatar, {
        encoding: "base64",
      });
      const filePath = user.id + "/" + Date.now() + ".jpg";

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64img), {
          contentType: "image/jpg",
        });

      if (error) {
        Alert.alert("Error uploading avatar!", error);
        setIsSubmitting(false);
        return;
      }

      updates.avatar =
        process.env.EXPO_PUBLIC_SUPABASE_URL +
        "/storage/v1/object/public/avatars/" +
        data.path;
    }

    ({ data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select());

    if (error) {
      Alert.alert("Error updating profile!", error);
    } else {
      router.push("/profile");
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View className="justify-center self-center h-full px-4 w-[90%]">
          <View className="border-primary w-[100px] self-center rounded-full">
            <View className="w-[100px] h-[100px] rounded-full overflow-hidden">
              {avatar || form.gender ? (
                <Image
                  source={{
                    uri: avatar
                      ? avatar
                      : `https://avatar.iran.liara.run/public/${form.gender}?username=${nickname}`,
                  }}
                  resizeMode="cover"
                  className="h-full w-full"
                />
              ) : (
                <Image
                  source={require("../../assets/img/profpic_placeholder.jpg")}
                  resizeMode="cover"
                  className="h-full w-full"
                />
              )}
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#190482",
                borderRadius: 15,
                padding: 5,
              }}
              onPress={pickImage}
            >
              <MaterialIcons name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <FormField
            title="Name"
            placeholder={"Ex: John Doe"}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Nickname"
            placeholder={"Ex: John"}
            value={form.nickname}
            handleChangeText={(e) => setForm({ ...form, nickname: e })}
            otherStyles="mt-4"
          />
          <View className="space-y-2 mt-4">
            <Text className="text-base font-ProximaNovaMedium">Gender</Text>
            <Dropdown
              containerStyle={styles.container}
              itemTextStyle={styles.itemText}
              itemContainerStyle={styles.itemContainer}
              selectedTextStyle={styles.selectedText}
              className="w-full h-11 px-4 bg-black-100 border border-lightgrey rounded-lg focus:border-yellow"
              data={data}
              placeholderStyle={styles.placeholderStyle}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              value={gender}
              onChange={(item) => {
                setGender(item.value);
              }}
            />
            {/* {errors.priority ? (
              <TextProximaNovaReg className="text-red-500">
                {errors.priority}
              </TextProximaNovaReg>
            ) : null} */}
          </View>
          {/* <FormField
            title="Email Address"
            placeholder={"Ex: johndoe@gmail.com"}
            value={email}
            readOnly={true}
            otherStyles="mt-4"
            keyboardType="email"
          /> */}
          <FormField
            title="Bio"
            placeholder={"Bio"}
            value={form.bio}
            handleChangeText={(e) => setForm({ ...form, bio: e })}
            otherStyles="mt-4"
          />
          <CustomButton
            title={"Save Changes"}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <CustomButton
            title={"Change Password"}
            handlePress={() => {
              router.push("/changepassword");
            }}
            containerStyles="mt-2 bg-white border border-primary"
            textStyles={"text-primary"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Edit;
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
  placeholderStyle: {
    color: "#807E78",
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  selectedText: {
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  itemContainer: {
    height: 50,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "ProximaNovaReg",
  },
  container: {
    borderRadius: 8,
  },
});
