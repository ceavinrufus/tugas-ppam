import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-Raleway">Virtuoso</Text>
      <StatusBar style="auto" />
      <Link href={"/focus"}>Go to Focus</Link>
    </View>
  );
}
