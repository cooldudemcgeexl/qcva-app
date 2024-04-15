import { isDefined, isDefinedAndTrue } from "@/utils/validation";
import { FormikHandlers } from "formik";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

export interface TextInputErrorProps {
  value?: string;
  error?: string;
  touched?: boolean;
  label: string;
  fieldKey: string;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
}

export default function TextInputError({
  value,
  error,
  touched,
  label,
  fieldKey,
  handleChange,
  handleBlur,
}: TextInputErrorProps) {
  const hasError = isDefined(error);
  const hasTouched = isDefinedAndTrue(touched);
  const showError = hasError && hasTouched;

  return (
    <View className="flex-1 justify-between">
      <TextInput
        onChangeText={handleChange(fieldKey)}
        onBlur={handleBlur(fieldKey)}
        value={value}
        label={label}
        error={showError}
      />
      <HelperText type="error" visible={showError} className="min-h-[12px]">
        {error}
      </HelperText>
    </View>
  );
}
