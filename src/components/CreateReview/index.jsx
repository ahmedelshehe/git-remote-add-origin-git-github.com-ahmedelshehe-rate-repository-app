import * as yup from "yup";

import { View } from "react-native";
import Text from "../helpers/Text";
import { useState } from "react";
import { ADD_REVIEW } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CreateReviewForm } from "./CreateReviewForm";
import { styles } from "./styles";
import { ME } from "../../graphql/queries";

const CreateReview = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    text: "",
    rating: "",
  };
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner name required"),
    repositoryName: yup.string().required("Repository name required"),
    rating: yup.number().typeError("Rating must be a number").min(0).max(100),
    text: yup.string().optional(),
  });
  const [createReview] = useMutation(ADD_REVIEW, {
    onError: (error) => {
      setError(error);
    },
    refetchQueries: [{ query: ME }],
  });
  const onSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const review = {
        ownerName,
        repositoryName,
        text,
        rating: Number(rating),
      };
      const { data } = await createReview({ variables: { review } });
      if (data) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/${repositoryId}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <View style={styles.container}>
      {error !== "" ? (
        <Text
          fontSize="subheading"
          color="primary"
          style={{ marginHorizontal: 15, marginTop: 5 }}
        >
          {error.message}
        </Text>
      ) : null}
      <CreateReviewForm
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </View>
  );
};
export default CreateReview;
