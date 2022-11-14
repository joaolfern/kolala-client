import React, { ReactNode } from 'react'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Scroll from '../../components/Scroll/Scroll'
import Header from '../../components/Header/Header'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

interface ICommonWrapper {
  children: ReactNode
  title: ReactNode
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
  )
}

export default CommonWrapper

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.background,
  },
})
