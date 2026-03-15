import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/products",
            params: { category: "masculino" },
          })
        }
      >
        <Text style={styles.buttonText}>Masculino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/products",
            params: { category: "feminino" },
          })
        }
      >
        <Text style={styles.buttonText}>Feminino</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  button: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: { fontSize: 16 },
});