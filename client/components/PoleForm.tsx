import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import { GestureResponderEvent, View } from "react-native";
import * as Yup from "yup";
import TextInputError from "./TextInputError";

Yup.setLocale({
  mixed: {
    notType: "Incorrect data type",
  },
});

const numGtZeroSchema = Yup.number()
  .moreThan(0, "Weight must be greater than 0")
  .required("Required");

const poleSchema = Yup.object().shape({
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
      initialValues={{ weight: "", flex: "", serialNumber: "", cost: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={poleSchema}
      vali
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="flex-1 max-w-[80%] min-w-[50%] flex-row p-2 items-start justify-around flex-wrap space-x-4">
          <TextInputError
            value={values.weight}
            error={errors.weight}
            touched={touched.weight}
            label="Weight"
            fieldKey="weight"
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

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
          <TextInputError
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.cost}
            error={errors.cost}
            touched={touched.cost}
            label="Cost"
            fieldKey="cost"
          />
          <View>
            <Button
              onPress={handleSubmit as (e?: GestureResponderEvent) => void}
            >
              Submit
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}
