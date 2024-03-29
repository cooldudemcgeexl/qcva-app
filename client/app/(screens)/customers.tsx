import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { Table, Row, Rows } from "react-native-reanimated-table";

import { GetCustomerDocument } from "@/generated";

const tableHeaders = [
  "First",
  "Last/School",
  "Address",
  "City",
  "State",
  "Zip",
  "Phone",
  "Email",
];

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Table>
        <Row data={tableHeaders}></Row>
      </Table>
    </View>
  );
}
