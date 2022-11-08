import { useNavigationState } from '@react-navigation/native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import Label from '../../components/Label/Label'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Scroll from '../../components/Scroll/Scroll'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import TextInput from '../../components/TextInput/TextInput'
import Colors from '../../constants/Colors'
import { IUserUpdateProfileConfig } from '../../Models/User'
import { RootStackParamList } from '../../types'
import PictureButton from './components/PictureButton'
import SocialMediaInput from './components/SocialMediaInput'

export type ProfileFormEvent = IUserUpdateProfileConfig['body'] & {}

function ProfileForm() {
  const { profile } = useNavigationState(
    state =>
      state.routes.find(item => item.name === 'ProfileForm')
        ?.params as RootStackParamList['ProfileForm']
  )

  const { control } = useForm<ProfileFormEvent>({
    defaultValues: profile,
  })

  return (
    <Scroll style={styles.Container}>
      <SafeAreaView>
        <Header>
          <Header.Title>Editar perfil</Header.Title>
        </Header>
        <Span style={styles.Row}>
          <PictureButton name='picture' profile={profile} />
        </Span>
        <Span>
          <Label>Nome</Label>
          <TextInput
            name='name'
            control={control}
            placeholder='Como outros irão te chamar'
          />
        </Span>
        <Label>Outras redes sociais</Label>
        <SocialMediaInput
          control={control}
          name='instagramAccount'
          icon='instagram'
          placeholder='Seu usuário do instagram'
        />
        <SocialMediaInput
          control={control}
          name='twitterAccount'
          icon='twitter'
          placeholder='Seu usuário do twitter'
        />
        <SocialMediaInput
          control={control}
          name='facebookAccount'
          icon='facebook'
          placeholder='Seu usuário do facebook'
        />
        <Button style={styles.SubmitButton}>
          <Text style={styles.SubmitButtonText}>Salvar</Text>
        </Button>
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

  SubmitButton: {
    marginTop: 15,
    marginLeft: 'auto',
    paddingHorizontal: 25,
  },
  SubmitButtonText: {
    color: Colors.altText,
    fontWeight: 'bold',
  },
})
