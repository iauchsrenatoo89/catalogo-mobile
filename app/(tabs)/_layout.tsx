import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="masculino"
        options={{ title: "Masculino" }}
      />
      <Tabs.Screen
        name="feminino"
        options={{ title: "Feminino" }}
      />
    </Tabs>
  );
}