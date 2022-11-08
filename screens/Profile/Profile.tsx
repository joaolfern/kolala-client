import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Header from '../../components/Header/Header'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import { IProfileViewData } from '../../types/Profile'
import { RootStackScreenProps } from '../../types'
import LogoutButton from '../../components/LogoutButton/LogoutButton'
import useLogout from '../../hooks/useLogout'
import Avatar from '../../components/Avatar/Avatar'
import Scroll from '../../components/Scroll/Scroll'
import ProfileSettings from './components/ProfileSettingsButton'
import User from '../../Models/User'
import { _userLevel } from '../../types/User'

function Profile({ route }: RootStackScreenProps<'Profile'>) {
  const { profileUserId } = route?.params
  const { user } = useAppSelector(selectUser)
  const logout = useLogout()

  const isOwnProfile = useRef(profileUserId === user?.id).current
  const [profileUser, setProfileUser] = useState<IProfileViewData | null>(null)

  useEffect(() => {
    if (isOwnProfile && user?.profile) {
      setProfileUser(user?.profile)
      return
    }

    getProfileUser(profileUserId)

    async function getProfileUser(id: number) {
      try {
        const response = await User.getProfile(id)
        const profile = response.data.data

        if (profile) setProfileUser(profile)
      } catch (err) {
        console.error(err)
      }
    }
  }, [user?.profile])

  function updateProfileLevel(level: _userLevel) {
    setProfileUser(prev => {
      if (prev?.User) {
        return {
          ...prev,
          User: {
            ...prev?.User,
            level,
          },
        }
      }

      return prev
    })
  }

  return (
    <SafeAreaView>
      <Scroll>
        <Header style={styles.Header}>
          <Header.Title>Perfil</Header.Title>
          {profileUser && (
            <ProfileSettings
              style={styles.SettingsButton}
              isOwnProfile={isOwnProfile}
              profileUser={profileUser}
              updateProfileLevel={updateProfileLevel}
            />
          )}
        </Header>
        <Span style={styles.topContainer}>
          <Span style={styles.row}>
            <Span style={styles.pictureWrapper}>
              <Avatar
                style={styles.picture}
                source={
                  profileUser?.picture
                    ? { uri: profileUser.picture }
                    : undefined
                }
              />
            </Span>
            <Span style={styles.logoutWrapper}>
              {isOwnProfile && (
                <Span style={styles.logout}>
                  <LogoutButton onPress={logout} />
                </Span>
              )}
            </Span>
          </Span>
          <Text style={styles.title}>{profileUser?.name}</Text>
          {profileUser?.User?.level === 'admin' && <Text>admin 🐨</Text>}
          {!!(isOwnProfile && user?.email) && <Text>{user?.email}</Text>}
        </Span>
      </Scroll>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Header: {},
  SettingsButton: {
    marginLeft: 'auto',
  },
  topContainer: {
    alignItems: 'center',
  },
  row: {
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  picture: {
    width: 150,
    height: 150,
  },
  pictureWrapper: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  logoutWrapper: {
    marginLeft: 'auto',
    height: 53,
  },
  logout: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
})

export default Profile
