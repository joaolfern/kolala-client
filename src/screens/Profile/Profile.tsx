import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef, useState } from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'

import Avatar from '@/components/Avatar/Avatar'
import Header from '@/components/Header/Header'
import LogoutButton from '@/components/LogoutButton/LogoutButton'
import SafeAreaView from '@/components/SafeAreaView/SafeAreaView'
import Scroll from '@/components/Scroll/Scroll'
import SocialMediaIcon from '@/components/SocialMediaIcon/SocialMediaIcon'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import useLogout from '@/hooks/useLogout'
import User from '@/Models/User'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/userSlice'
import type { RootStackScreenProps } from '@/types'
import type { IProfileViewData } from '@/types/Profile'
import ProfileSettings from './components/ProfileSettingsButton'

function Profile({ route }: RootStackScreenProps<'Profile'>) {
  const { profileUserId } = route?.params
  const { user } = useAppSelector(selectUser)
  const logout = useLogout()

  const isOwnProfile = useRef(profileUserId === user?.id).current
  const [profileUser, setProfileUser] = useState<IProfileViewData | null>(null)

  async function getProfileUser(id: number) {
    try {
      const response = await User.getProfile(id)
      const profile = response.data.data

      if (profile) setProfileUser(profile)
    } catch (err) {
      console.error(JSON.stringify(err))
    }
  }

  useFocusEffect(
    useCallback(() => {
      getProfileUser(profileUserId)
    }, [user?.profile])
  )

  async function openLink(url: string) {
    await Linking.openURL(url)
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
              updateProfile={() => getProfileUser(profileUserId)}
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
          {!!(isOwnProfile && user?.email) && <Text>{user?.email}</Text>}
          {profileUser?.User?.level === 'admin' && <Text>admin 🐨</Text>}
          {profileUser?.User?.status === 0 && <Text>⛔ Suspensa</Text>}
        </Span>
        <Span style={styles.SocialMediaRow}>
          {profileUser?.instagramAccount && (
            <TouchableOpacity
              style={styles.SocialMediaButton}
              onPress={() =>
                openLink(
                  `https://instagram.com/${profileUser?.instagramAccount}`
                )
              }
            >
              <SocialMediaIcon icon='instagram' />
            </TouchableOpacity>
          )}
          {profileUser?.facebookAccount && (
            <TouchableOpacity
              style={styles.SocialMediaButton}
              onPress={() =>
                openLink(`https://facebook.com/${profileUser?.facebookAccount}`)
              }
            >
              <SocialMediaIcon icon='facebook' />
            </TouchableOpacity>
          )}
          {profileUser?.twitterAccount && (
            <TouchableOpacity
              style={styles.SocialMediaButton}
              onPress={() =>
                openLink(`https://twitter.com/${profileUser?.twitterAccount}`)
              }
            >
              <SocialMediaIcon icon='twitter' />
            </TouchableOpacity>
          )}
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
  SocialMediaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  SocialMediaButton: {
    marginHorizontal: 8,
  },
})

export default Profile
