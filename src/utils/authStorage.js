import AsyncStorage from '@react-native-async-storage/async-storage';
 class AuthManager{
    constructor(namespace = 'Auth') {
        this.namespace = namespace;
      }
    async getAccessToken() {
        const token =await AsyncStorage.getItem(`${this.namespace}:token`)
        return token ?JSON.parse(token) :null;
    }
  
    async setAccessToken(accessToken) {
      await AsyncStorage.setItem(
        `${this.namespace}:token`,
        JSON.stringify(accessToken),
      );
    }
  
    async removeAccessToken() {
      await AsyncStorage.removeItem(`${this.namespace}:token`)
    }
 }
 export default AuthManager