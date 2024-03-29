import { GetCustomersDocument } from "@/generated";
import { mapTo2DArray } from "@/utils/queryDocuments";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Row, Rows, Table } from "react-native-reanimated-table";

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
export default function DataTable() {
  const { data, loading, error } = useQuery(GetCustomersDocument, {});

  const mappedData = useMemo(
    () => mapTo2DArray(data?.customers ?? []),
    [data?.customers]
  );
  return (
    <View style={styles.container} className="mx-2">
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHeaders}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Rows data={mappedData}></Rows>
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});
