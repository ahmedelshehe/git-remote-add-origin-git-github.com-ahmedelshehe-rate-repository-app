import { Formik } from "formik";
import { Pressable, View } from "react-native";
import FormikTextInput from "../SignIn/FormikTextInput";
import Text from "../helpers/Text";
import { styles } from "./styles";
export const CreateReviewForm = ({
  onSubmit,
  validationSchema,
  initialValues,
}) => {
  return (
    <View>
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : { ownerName: "", repositoryName: "", text: "", rating: "" }
        }
        onSubmit={onSubmit}
        validationSchema={validationSchema ? validationSchema : null}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="ownerName"
              placeholder="Repository Owner Name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository Name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput name="text" placeholder="Review" multiline />

            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text fontSize="heading" color="white">
                Create Review
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};
