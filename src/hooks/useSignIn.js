import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = ({setError}) => {
  const [authenicate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.log(error)
      setError(error);
    },
  });
  const signIn = async ({ username, password }) => {
    const credentials = {username,password};
    await authenicate({ variables: {credentials}});
  };
  return [signIn, result];
};
export default useSignIn;
