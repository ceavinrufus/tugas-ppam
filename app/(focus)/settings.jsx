import React from "react";
import { ScrollView, View, Image, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* <Image source={require('../../mnt/data/image.png')} style={{ width: '100%', height: 400 }} /> */}

          <Text
            style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
          >
            Timer Settings
          </Text>
          <View>
            <Text>Pomodoro</Text>
            <Text>25</Text>
          </View>
          <View>
            <Text>Short Break</Text>
            <Text>5</Text>
          </View>
          <View>
            <Text>Long Break</Text>
            <Text>15</Text>
          </View>
          <View>
            <Text>Auto Start Breaks</Text>
            <Switch />
          </View>
          <View>
            <Text>Auto Start Pomodoros</Text>
            <Switch />
          </View>
          <View>
            <Text>Long Break Interval</Text>
            <Text>2</Text>
          </View>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
          >
            Task Settings
          </Text>
          <View>
            <Text>Auto Check Tasks</Text>
            <Switch />
          </View>
          <View>
            <Text>Auto Switch Tasks</Text>
            <Switch />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
