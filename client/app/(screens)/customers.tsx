import CustomerTable from "@/components/Tables/CustomerTable";
import { View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  return (
    <View className="w-full flex-1 justify-center items-center">
      <ScrollView className="w-full px-12 py-10">
        <CustomerTable />
      </ScrollView>
    </View>
  );
}
