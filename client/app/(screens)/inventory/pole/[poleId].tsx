import { View } from "react-native";
import { Button } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

export default function PolePage() {
  const { poleId } = useLocalSearchParams<{ poleId: string }>();

  return (
    <View>
      <Button>Hi Pole {poleId}</Button>
    </View>
  );
}
