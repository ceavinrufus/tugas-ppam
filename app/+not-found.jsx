import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.message}>Page Not Found</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#190482",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default NotFoundScreen;
