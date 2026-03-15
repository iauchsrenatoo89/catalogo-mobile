import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

function handleLogin() {
  if (!email.trim() || !senha.trim()) {
    Alert.alert("Atenção", "Preencha e-mail e senha.");
    return;
  }

  router.replace("/masculino");
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo Mobile</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 18, textAlign: "center" },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});