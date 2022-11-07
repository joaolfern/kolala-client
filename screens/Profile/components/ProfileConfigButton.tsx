import React, { useCallback } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import Colors from '../../../constants/Colors'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/userSlice'
import { getProfileSettingsOptions } from '../utils'
import User from '../../../Models/User'
import { showToast } from '../../../utils/toast'
import { IProfile, IProfileViewData } from '../../../types/Profile'
import { IUser, _userLevel } from '../../../types/User'

interface IProps extends TouchableOpacityProps {
  isOwnProfile: boolean
  profileUser: IProfileViewData
  updateProfileLevel(level: _userLevel): void
}

function ProfileConfigButton({
  isOwnProfile,
  style,
  profileUser,
  updateProfileLevel,
  ...rest
}: IProps) {
  const { showActionSheetWithOptions } = useActionSheet()
  const { user } = useAppSelector(selectUser)

  async function promoteUser({
    level,
    targetId,
  }: {
    targetId: number
    level: _userLevel
  }) {
    try {
      await User.promote({
        body: {
          level,
        },
        targetId,
      })
      showToast('Level do usuário atualizado com sucesso!')
      updateProfileLevel(level)
    } catch (err) {
      console.log(err)
    }
  }

  const openMenu = useCallback(
    ({
      user,
      profileUser,
    }: {
      user: IUser
      profileUser: IProfileViewData
      isOwnProfile: boolean
    }) => {
      const level = user.level
      const targetId = profileUser.User?.id
      const targetLevel = profileUser.User?.level || 'user'

      const options = getProfileSettingsOptions({
        level,
        isOwnProfile,
        targetLevel,
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
        (selectedIndex?: number) => {
          if (typeof selectedIndex === 'undefined') return

          const selectedOption = options[selectedIndex]
          switch (selectedOption) {
            case 'Tornar administrador': {
              if (typeof targetId !== 'undefined')
                promoteUser({ targetId, level: 'admin' })
              return
            }
            case 'Remover administrador': {
              if (typeof targetId !== 'undefined')
                promoteUser({ targetId, level: 'user' })
              return
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
        user && profileUser && openMenu({ user, profileUser, isOwnProfile })
      }
    >
      <MaterialIcons size={28} name='settings' color={Colors.text} />
    </TouchableOpacity>
  )
}

export default ProfileConfigButton

const styles = StyleSheet.create({
  Button: {
    backgroundColor: Colors.xLightBackground,
    borderRadius: 99999,
    padding: 10,
  },
})
