import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import Header from "../Header/Header";
import SafeAreaView from "../SafeAreaView/SafeAreaView";
import Scroll from "../Scroll/Scroll";

interface ICommonWrapper {
  children: ReactNode;
  title: ReactNode;
}

function CommonWrapper({ children, title }: ICommonWrapper) {
  return (
    <Scroll style={styles.Container}>
      <SafeAreaView>
        <Header>
          <Header.Title>{title}</Header.Title>
        </Header>
        {children}
      </SafeAreaView>
    </Scroll>
  );
}

export default CommonWrapper;

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    flex: 1,
    backgroundColor: Colors.background,
  },
});
