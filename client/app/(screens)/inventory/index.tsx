import InventoryTable from "@/components/Tables/InventoryTable";
import { Link, router } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Icon, MD3Colors } from "react-native-paper";
export default function InventoryScreen() {
  return (
    <View className="w-full flex-1 justify-center items-center">
      <View className="py-4 self-end px-12 align-middle">
        <Button
          mode="contained"
          icon="plus"
          onPress={() => router.push("/inventory/poleDetails/")}
        >
          Add New
        </Button>
      </View>
      <ScrollView className="w-full px-12">
        <InventoryTable />
      </ScrollView>
    </View>
  );
}
