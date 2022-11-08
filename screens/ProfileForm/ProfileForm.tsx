import React from 'react'
import { StyleSheet } from 'react-native'
import Header from '../../components/Header/Header'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Scroll from '../../components/Scroll/Scroll'
import Colors from '../../constants/Colors'

function ProfileForm() {
  return (
    <Scroll style={styles.Container}>
      <SafeAreaView>
        <Header>
          <Header.Title>Editar perfil</Header.Title>
        </Header>
      </SafeAreaView>
    </Scroll>
  )
}

export default ProfileForm

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.background,
  },
})
