import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from '../hooks/useAuthStorage';
const useSignIn = () => { 
  const authStorage =useAuthStorage()
  const apolloClient=useApolloClient()
 
  const [authenicate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      throw new Error(error.message)
    },
  });
  const signIn = async ({ username, password }) => {
    try {
      const credentials = {username,password};
      const {data}=await authenicate({ variables: {credentials}});
      console.log(data.authenticate.accessToken)
      authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
      console.log(authStorage.getAccessToken())
    } catch (error) {
      throw new Error(error.message)
    }
    
  };
  return [signIn,result];
};
export default useSignIn;
