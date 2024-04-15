import PoleForm from "@/components/PoleForm";
import { View, Text } from "react-native";

export default function NewPole() {
  return (
    <View className="w-full bg-white flex-1  items-center py-6">
      <Text className="text-2xl mb-10 font-bold">Create New Pole</Text>
      <PoleForm></PoleForm>
    </View>
  );
}
