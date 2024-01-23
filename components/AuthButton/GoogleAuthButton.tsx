import React, { useRef } from "react";
import { Image, StyleSheet } from "react-native";
import Button from "../Button/Button";
import Text from "../Text/Text";
import google from "../../assets/images/google.png";
import { sendAccessTokenRequest } from "./api";
import authButtonStyle from "./authButtonStyle";
import { setToken } from "../../store/tokenSlice";
import { setUser } from "../../store/userSlice";
import { useAppDispatch } from "../../store/hooks";
import Span from "../Span/Span";
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from "../../env";
import { showToast } from "../../utils/toast";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure();

GoogleSignin.configure({
  scopes: [
    "https://www.googleapis.com/auth/drive.readonly",
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ], // what API you want to access on behalf of the user, default is email and profile
  webClientId: EXPO_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
});

function GoogleAuthButton() {
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const authentication = await GoogleSignin.signIn();
      const accessToken = authentication?.idToken;
      if (accessToken) {
        await sendAccessToken(accessToken);
        return;
      }
      throw new Error("Access token not found");
    } catch (error: any) {
      console.log("error", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function sendAccessToken(accessToken: string) {
    try {
      const response = await sendAccessTokenRequest({ accessToken });
      const { token, user } = response.data?.data || {};

      if (user) dispatch(setUser(user));

      if (token) dispatch(setToken(token));
    } catch (err: any) {
      const message = err?.response?.data;
      if (message) {
        showToast(message);
      }
    }
  }

  return (
    <Span style={[authButtonStyle.View, styles.View]}>
      <Button style={[authButtonStyle.Button, styles.Button]} onPress={signIn}>
        <Image style={[authButtonStyle.Image, styles.Image]} source={google} />
        <Text style={[authButtonStyle.Text, styles.Text]}>
          Continuar com Google
        </Text>
      </Button>
    </Span>
  );
}

export default GoogleAuthButton;

const styles = StyleSheet.create({
  Image: {},
  View: {
    margin: 0,
    height: "auto",
    paddingVertical: 0,
  },
  Button: {
    backgroundColor: "#fff",
  },
  Text: {
    color: "#6C6C6C",
  },
});
