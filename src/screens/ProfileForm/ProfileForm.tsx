import { useNavigation, useNavigationState } from '@react-navigation/native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'

import Button from '@/components/Button/Button'
import FormItem from '@/components/FormItem/FormItem'
import Header from '@/components/Header/Header'
import Label from '@/components/Label/Label'
import SafeAreaView from '@/components/SafeAreaView/SafeAreaView'
import Scroll from '@/components/Scroll/Scroll'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import TextInput from '@/components/TextInput/TextInput'
import Colors from '@/constants/Colors'
import { REACT_APP_SERVER } from '../../../env'
import type { IUserUpdateProfileConfig } from '@/Models/User'
import User from '@/Models/User'
import { useAppDispatch } from '@/store/hooks'
import { setUserProfile } from '@/store/userSlice'
import type { RootStackParamList } from '@/types'
import type { IProfile } from '@/types/Profile'
import PictureButton from './components/PictureButton'
import SocialMediaInput from './components/SocialMediaInput'

export type ProfileFormEvent = Partial<IProfile>

function makeFormData(data: ProfileFormEvent, formData: FormData) {
  Object.entries(data).forEach(([key, value]) => {
    switch (key) {
      case 'picture':
        if (typeof value === 'string') {
          const isHosted = value.includes(REACT_APP_SERVER)
          if (isHosted) return

          const uriArray = value.split('.')
          const fileType = uriArray[uriArray.length - 1]

          const file = {
            uri: value,
            name: `${data.name?.replace(/ /g, '-')}.${fileType}`,
            type: `image/${fileType}`,
          }

          formData.append(key, file as unknown as Blob)
          return
        }
        return
      default:
        formData.append(key, value as unknown as Blob)
    }
  })
}

function ProfileForm() {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { profile } = useNavigationState(
    (state) =>
      state.routes.find((item) => item.name === 'ProfileForm')
        ?.params as RootStackParamList['ProfileForm']
  )
  const dispatch = useAppDispatch()
  const { goBack } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormEvent>({
    defaultValues: profile,
  })

  async function onSubmit(data: ProfileFormEvent) {
    const formData = new FormData()
    makeFormData(data, formData)

    setLoadingSubmit(true)
    const config: IUserUpdateProfileConfig = {
      body: formData,
      id: profile.id,
    }
    try {
      await User.updateProfile(config)
    } catch (err) {
      console.error(err)
    } finally {
      setTimeout(() => {
        goBack()
        setLoadingSubmit(false)
        updateStoredProfile(profile.id)
      }, 5000)
      // see
      // https://github.com/axios/axios/issues/4499
    }
  }

  async function updateStoredProfile(userId: number) {
    try {
      const response = await User.getProfile(userId)
      const profile = response.data.data as IProfile
      dispatch(setUserProfile(profile))
    } catch (err) {
      console.error(err)
    }
  }

  console.log(profile.picture)

  return (
    <Scroll style={styles.Container}>
      <SafeAreaView>
        <Header>
          <Header.Title>Editar perfil</Header.Title>
        </Header>
        <Span style={styles.Row}>
          <PictureButton
            name='picture'
            defaultValue={profile.picture}
            control={control}
          />
        </Span>

        <FormItem label='Nome' error={errors.name}>
          <TextInput
            name='name'
            control={control}
            placeholder='Como outros te chamarão'
          />
        </FormItem>
        <Label>Outras redes sociais</Label>
        <SocialMediaInput
          control={control}
          name='instagramAccount'
          icon='instagram'
          placeholder='Seu usuário do instagram'
          errors={errors}
        />
        <SocialMediaInput
          control={control}
          name='twitterAccount'
          icon='twitter'
          placeholder='Seu usuário do twitter'
          errors={errors}
        />
        <SocialMediaInput
          control={control}
          name='facebookAccount'
          icon='facebook'
          placeholder='Seu usuário do facebook'
          errors={errors}
        />
        <Button
          style={styles.SubmitButton}
          onPress={handleSubmit(onSubmit)}
          loading={loadingSubmit}
        >
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
