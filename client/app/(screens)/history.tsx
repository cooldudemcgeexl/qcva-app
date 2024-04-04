import HistoryTable from "@/components/Tables/HistoryTable";
import { View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

export default function HistoryScreen() {
  return (
    <View className="w-full flex-1 justify-center items-center">
      <ScrollView className="w-full px-12 py-10">
        <HistoryTable />
      </ScrollView>
    </View>
  );
}
