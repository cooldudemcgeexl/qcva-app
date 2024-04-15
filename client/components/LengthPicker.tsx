import { PoleLengths } from "@/constants/Poles";
import { Picker } from "@react-native-picker/picker";
import { NativeSyntheticEvent, TargetedEvent } from "react-native";

const lengthOptions = PoleLengths.map((length) => (
  <Picker.Item label={length} value={length} key={length} />
));

export interface LengthPickerProps {
  selectedValue?: string;
  onValueChange?: (itemValue: string, itemIndex: number) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
}

export function LengthPicker({
  selectedValue,
  onValueChange,
  onBlur,
}: LengthPickerProps) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      onBlur={onBlur}
      className="min-h-[48px]"
    >
      <Picker.Item label="Select a Length" value={undefined} key="default" />
      {lengthOptions.map((opt) => opt)}
    </Picker>
  );
}
