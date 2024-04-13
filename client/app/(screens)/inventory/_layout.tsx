import { Stack } from "expo-router";

export default function InventoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="pole/[poleId]"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="pole/new"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
