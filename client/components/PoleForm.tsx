import { Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import { GestureResponderEvent, View, Text } from "react-native";
import * as Yup from "yup";
import TextInputError from "./TextInputError";
import { LengthPicker } from "./LengthPicker";
import { isDefined, isDefinedAndTrue } from "@/utils/validation";
import { PoleLengths } from "@/constants/Poles";

Yup.setLocale({
  mixed: {
    notType: "Incorrect data type",
  },
});

const numGtZeroSchema = Yup.number()
  .moreThan(0, "Weight must be greater than 0")
  .required("Required");

const poleSchema = Yup.object().shape({
  length: Yup.mixed().oneOf(PoleLengths, "Select a pole length"),
  weight: numGtZeroSchema,
  flex: numGtZeroSchema,
  serialNumber: Yup.string()
    .trim()
    .max(100, `Cannot be more than 100 characters`)
    .required("Required"),
  cost: numGtZeroSchema,
});

export default function PoleForm() {
  return (
    <Formik
      initialValues={{
        length: undefined,
        weight: "",
        flex: "",
        serialNumber: "",
        cost: "",
      }}
      onSubmit={(values) => console.log(values)}
      validationSchema={poleSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => {
        return (
          <View className="flex-1 w-full max-w-[80%] flex p-2 items-center justify-start flex-wrap space-x-4 xl:max-h-96 ">
            <View className="flex-1 flex-row flex-wrap space-x-2  align-middle items-center justify-between max-w-2xl">
              <View className="w-52 flex-1 justify-between ">
                <View className="self-start w-full">
                  <Text>Length</Text>
                  <LengthPicker
                    selectedValue={values.length}
                    onValueChange={handleChange("length")}
                    onBlur={handleBlur("length")}
                  />
                </View>
                <HelperText
                  type="error"
                  visible={
                    isDefined(errors.length) && isDefinedAndTrue(touched.weight)
                  }
                >
                  {errors.length}
                </HelperText>
              </View>
              <TextInputError
                value={values.weight}
                error={errors.weight}
                touched={touched.weight}
                label="Weight"
                fieldKey="weight"
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </View>
            <View className="flex-1 flex-row flex-wrap items-center align-middle justify-between space-x-2 max-w-2xl">
              <TextInputError
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.flex}
                error={errors.flex}
                touched={touched.flex}
                label="Flex"
                fieldKey="flex"
              />
              <TextInputError
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.serialNumber}
                error={errors.serialNumber}
                touched={touched.serialNumber}
                label="Serial Number"
                fieldKey="serialNumber"
              />
            </View>
            <View className="flex-1 flex-row flex-wrap items-center align-middle justify-between space-x-2 max-w-2xl">
              <TextInputError
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.cost}
                error={errors.cost}
                touched={touched.cost}
                label="Cost"
                fieldKey="cost"
              />
              <View className="w-56 ">
                <Button
                  mode="contained"
                  onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                >
                  Submit
                </Button>
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
