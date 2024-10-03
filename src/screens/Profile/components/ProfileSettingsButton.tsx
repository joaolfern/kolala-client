import { useActionSheet } from '@expo/react-native-action-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'
import useUserOperations from '@/hooks/useUserOperations'
import User from '@/Models/User'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/userSlice'
import type { IProfileViewData } from '@/types/Profile'
import type { IUser, UserLevel } from '@/types/User'
import { showToast } from '@/utils/toast'
import { getProfileSettingsOptions } from '../utils'

interface IProps extends TouchableOpacityProps {
  isOwnProfile: boolean
  profileUser: IProfileViewData
  updateProfile(): void
}

function ProfileSettingsButton({
  isOwnProfile,
  style,
  profileUser,
  updateProfile,
  ...rest
}: IProps) {
  const { showActionSheetWithOptions } = useActionSheet()
  const { user } = useAppSelector(selectUser)
  const { navigate } = useNavigation()
  const { updateStatus } = useUserOperations()

  async function promoteUser({
    level,
    targetId,
  }: {
    targetId: number
    level: UserLevel
  }) {
    try {
      await User.promote({
        body: {
          level,
        },
        targetId,
      })
      showToast('Level do usuário atualizado com sucesso!')
      updateProfile()
    } catch (err) {
      console.log(err)
    }
  }

  function navigateToProfileForm(profile: IProfileViewData) {
    navigate('ProfileForm', {
      profile,
    })
  }

  const openMenu = useCallback(
    ({
      user,
      profileUser,
      updateProfile,
      isOwnProfile,
    }: {
      updateProfile: Function
      user: IUser
      profileUser: IProfileViewData
      isOwnProfile: boolean
    }) => {
      const { level } = user
      const targetId = profileUser.User?.id

      if (!profileUser.User) return

      const options = getProfileSettingsOptions({
        level,
        isOwnProfile,
        target: profileUser.User,
      })
      const cancelButtonIndex = options.indexOf('Cancelar')

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          tintColor: Colors.text,
          containerStyle: {
            backgroundColor: Colors.lightBackground,
          },
        },
        async (selectedIndex?: number) => {
          if (typeof selectedIndex === 'undefined') return

          const selectedOption = options[selectedIndex]
          switch (selectedOption) {
            case 'Tornar administrador': {
              if (typeof targetId !== 'undefined')
                promoteUser({ targetId, level: 'admin' })
              return
            }
            case 'Restaurar conta': {
              if (typeof targetId !== 'undefined')
                await updateStatus(
                  { body: { status: 1 }, targetId },
                  updateProfile
                )
              return
            }
            case 'Suspender conta': {
              if (typeof targetId !== 'undefined')
                await updateStatus(
                  { body: { status: 0 }, targetId },
                  updateProfile
                )
              return
            }
            case 'Remover administrador': {
              if (typeof targetId !== 'undefined')
                promoteUser({ targetId, level: 'user' })
              return
            }
            case 'Editar perfil': {
              if (profileUser) navigateToProfileForm(profileUser)
              return
            }
            case 'Denunciar usuário': {
              navigate('ReportForm', {
                target: profileUser,
              })
            }
          }
        }
      )
    },
    []
  )

  return (
    <TouchableOpacity
      style={[styles.Button, style]}
      {...rest}
      onPress={() =>
        user &&
        profileUser &&
        openMenu({ user, profileUser, isOwnProfile, updateProfile })
      }
    >
      <MaterialIcons size={28} name='settings' color={Colors.text} />
    </TouchableOpacity>
  )
}

export default ProfileSettingsButton

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.xLightBackground,
    borderRadius: 99999,
    padding: 10,
  },
})
