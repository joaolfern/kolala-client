import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigationState } from '@react-navigation/native'
import React from 'react'
import { Control, useForm } from 'react-hook-form'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Avatar from '../../components/Avatar/Avatar'
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

interface IProps {
  control: Control<ProfileFormEvent>
  name: keyof ProfileFormEvent
  icon: any
  placeholder: string
}

function SocialMediaInput({ control, icon, name, placeholder }: IProps) {
  return (
    <Span style={styles.SocialMediaRow}>
      <MaterialCommunityIcons
        style={styles.SocialMediaIcon}
        name={icon}
        size={55}
        color={Colors.text}
      />
      <TextInput
        style={styles.SocialMediaInput}
        name={name}
        control={control}
        placeholder={placeholder}
      />
    </Span>
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
  SocialMediaRow: {
    flexDirection: 'row',
  },
  SocialMediaIcon: {
    marginRight: 16,
    width: 55,
  },
  SocialMediaInput: {
    flex: 1,
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
