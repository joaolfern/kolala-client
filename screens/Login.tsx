import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import logo from "../assets/images/logo.png";
import { loginWithToken } from "../components/AuthButton/api";
import FacebookAuthButton from "../components/AuthButton/FacebookAuthButton";
import GoogleAuthButton from "../components/AuthButton/GoogleAuthButton";
import Span from "../components/Span/Span";
import Text from "../components/Text/Text";
import View from "../components/View/View";
import Colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectToken, setToken } from "../store/tokenSlice";
import { setUser } from "../store/userSlice";
import { useSecureStore } from "../store/useSecureStore";

function Login() {
  const TokenSecureStore = useSecureStore();
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function tryStoredToken() {
      try {
        const storeToken = await TokenSecureStore.get();

        if (storeToken) {
          const response = await loginWithToken(storeToken);
          const { user } = response.data?.data || {};

          if (user) {
            dispatch(setUser(user));
          }

          dispatch(setToken(storeToken));
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!token) tryStoredToken();
  }, [token]);

  return (
    <View style={style.View}>
      <Image style={style.marginBottom} source={logo} />
      <Text style={style.Title}>kolala</Text>
      <Text style={style.Description}>seu minimapa da vida real</Text>
      <Span style={style.Button}>
        <GoogleAuthButton />
      </Span>
      <FacebookAuthButton />
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingBottom: "20%",
  },
  Title: {
    color: Colors.secondaryColor,
    fontWeight: "600",
    fontSize: 30,
  },
  Description: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  marginBottom: {
    marginBottom: 10,
  },
  Button: {
    width: "100%",
    marginBottom: 22,
  },
});

export default Login;
