import { View } from "react-native";

import DataTable from "@/components/DataTable";

const names = [];

export default function TabTwoScreen() {
  return (
    <View className="w-full flex-1 justify-center items-center">
      <View className=" flex flex-1 items-center justify-center w-full  py-10">
        <DataTable />
      </View>
    </View>
  );
}
