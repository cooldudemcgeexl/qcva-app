import PoleForm from "@/components/PoleForm";
import { View } from "@/components/Themed";

export default function NewPole() {
  return (
    <View className="w-full bg-white flex-1 justify-between items-center py-6">
      <View className="text-2xl mb-10 font-bold">Create New Pole</View>
      <PoleForm></PoleForm>
    </View>
  );
}
