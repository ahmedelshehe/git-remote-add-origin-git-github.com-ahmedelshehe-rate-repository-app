import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import theme from "../styles/theme";
import Row from "../helpers/Row";
import Column from "../helpers/Column";
import Text from "../helpers/Text";
import StatColumn from "../RepositoryList/StatColumn";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.colors.white,
    marginBottom: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 12,
  },
  mainColumn: {
    marginHorizontal: 10,
    alignItems: "flex-start",
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  urlButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
    textAlign: "center",
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
});
const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <Row>
        <Image
          style={styles.avatarImage}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <Column style={styles.mainColumn}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text
            color="textSecondary"
            fontSize="subheading"
            style={{ marginTop: 5, marginRight: 50 }}
          >
            {repository.description}
          </Text>
          <Text fontWeight="bold" color="white" style={styles.languageBadge}>
            {repository.language}
          </Text>
        </Column>
      </Row>

      <Row style={styles.numbersRow}>
        <StatColumn text="Stars" number={repository.stargazersCount} />
        <StatColumn text="Forks" number={repository.forksCount} />
        <StatColumn text="Reviews" number={repository.reviewCount} />
        <StatColumn text="Rating" number={repository.ratingAverage} />
      </Row>
      <Pressable onPress={() => Linking.openURL(repository.url)}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          color="white"
          style={styles.urlButton}
        >
          Open Repository
        </Text>
      </Pressable>
    </View>
  );
};
export default RepositoryInfo;
