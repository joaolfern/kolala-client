import { MaterialIcons } from '@expo/vector-icons'
import { useNavigationState } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../../components/Avatar/Avatar'
import Header from '../../components/Header/Header'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Scroll from '../../components/Scroll/Scroll'
import Span from '../../components/Span/Span'
import Colors from '../../constants/Colors'
import { IUserUpdateProfileConfig } from '../../Models/User'
import { RootStackParamList } from '../../types'
import PictureButton from './components/PictureButton'

export type ProfileFormEvent = IUserUpdateProfileConfig['body'] & {}

function ProfileForm() {
  const { profile } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'ProfileForm')
        ?.params as RootStackParamList['ProfileForm']
  )

  const { control } = useForm<ProfileFormEvent>()

  return (
    <Scroll style={styles.Container}>
      <SafeAreaView>
        <Header>
          <Header.Title>Editar perfil</Header.Title>
        </Header>
        <Span style={styles.Row}>
          <PictureButton name='picture' profile={profile} />
        </Span>
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
  Row: {
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
  },
})
