import Text from "../helpers/Text";
import Column from "../helpers/Column";
const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};
const StatColumn = ({ text, number }) => {
  return (
    <Column style={{ alignItems: "center" }}>
      <Text fontSize="subheading" fontWeight="bold">
        {kFormatter(number)}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </Column>
  );
};
export default StatColumn;
