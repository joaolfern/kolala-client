import { FontAwesome5 } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import Event, { IEvent } from '../../Models/Event'
import { shadow } from '../../screens/EventForm/utils'
import { RootStackParamList } from '../../types'
import { showToast } from '../../utils/toast'
import AvatarWithIcon from '../AvatarWithIcon/AvatarWithIcon'
import Button from '../Button/Button'
import CategoryTag from '../CategoryTag/CategoryTag'
import DatetimeLabel from '../DatetimeLabel/DatetimeLabel'
import EventAvatars from '../EventAvatars/EventAvatars'
import Scroll from '../Scroll/Scroll'
import Span from '../Span/Span'
import Text from '../Text/Text'
import EventDetailsButton from './EventDetailsButton'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { IUser } from '../../types/User'
import { getEventDetailsMenuOptions } from './utils'

export default function EventDetails() {
  const preview = useNavigationState(
    state =>
      (
        state.routes.find(item => item.name === 'EventDetails')
          ?.params as RootStackParamList['EventDetails']
      ).preview
  )
  const navigation = useNavigation()
  const [details, setDetails] = useState<IEvent.Details | null>(null)
  const [loading, setLoading] = useState(false)
  const { showActionSheetWithOptions } = useActionSheet()
  const { user } = useAppSelector(selectUser)

  const isAuthor = details?.authorId === user?.id

  async function getDetails(id: number) {
    setLoading(true)
    try {
      const response = await Event.getDetails(id)
      const data = response.data?.data
      if (data) {
        setDetails(data)
      }
    } catch (err: any) {
      showToast(String(err.message))
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  function reloadDetails() {
    getDetails(preview?.id)
  }

  useFocusEffect(
    useCallback(() => {
      getDetails(preview?.id)
    }, [preview?.id])
  )

  function closeDetails() {
    navigation.goBack()
  }

  function navigateToProfile(authorId: number) {
    navigation.navigate('Profile', {
      profileUserId: authorId,
    })
  }

  const deleteEvent = useCallback(async () => {
    if (!preview.id) return
    try {
      const response = await Event.delete(String(preview.id))
      const message = response.data.data
      navigation.navigate('Root')
      if (message) showToast(message)
    } catch (err: any) {
      showToast(String(err.message))
      console.log(err)
    }
  }, [preview?.id])

  const openMenu = useCallback(
    (level: IUser['level'], isAuthor: boolean) => {
      const options = getEventDetailsMenuOptions({ level, isAuthor })
      const destructiveButtonIndex =
        options.indexOf('Deletar evento') === -1
          ? undefined
          : options.indexOf('Deletar evento')
      const cancelButtonIndex = options.indexOf('Cancelar')

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
          tintColor: Colors.text,

          containerStyle: {
            backgroundColor: Colors.lightBackground,
          },
        },
        (selectedIndex?: number) => {
          if (typeof selectedIndex === 'undefined') return

          const selectedOption = options[selectedIndex]
          switch (selectedOption) {
            case 'Deletar evento':
              deleteEvent()
              return
            case 'Denunciar usuário':
              return
          }
        }
      )
    },
    [deleteEvent]
  )

  return (
    <Scroll style={styles.Container}>
      <TouchableOpacity style={styles.closeButton} onPress={closeDetails}>
        <FontAwesome5
          size={32}
          name='times-circle'
          solid
          color={Colors.gray}
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
      <Span style={styles.wrapper}>
        <Span style={styles.AvatarWrapper}>
          <Span style={styles.Avatar}>
            <EventAvatars image={details?.EventImage} />
          </Span>
        </Span>
        <Span style={styles.TopRow}>
          <TouchableOpacity
            onPress={() =>
              details?.authorId && navigateToProfile(details.authorId)
            }
          >
            <AvatarWithIcon
              style={[styles.TopRowEllipsis]}
              source={
                details?.author?.picture
                  ? { uri: details?.author?.picture }
                  : undefined
              }
            >
              <Span style={styles.AuthorButton}>
                <FontAwesome5
                  size={16}
                  name='crown'
                  solid
                  color={Colors.secondaryColor}
                  style={styles.AuthorIcon}
                />
              </Span>
            </AvatarWithIcon>
          </TouchableOpacity>
          <Span>
            <Button
              style={[styles.TopRowEllipsis, styles.AltButton]}
              onPress={() => user?.level && openMenu(user?.level, isAuthor)}
            >
              <FontAwesome5
                size={20}
                name='ellipsis-v'
                solid
                color={Colors.gray}
              />
            </Button>
          </Span>
        </Span>
        <Span style={styles.TitleRow}>
          <Text style={styles.Title}>{details?.title || preview?.title}</Text>
          <EventDetailsButton
            loading={loading}
            event={details}
            reloadDetails={reloadDetails}
          />
        </Span>
        <Span style={styles.CategoryRow}>
          <CategoryTag
            style={styles.CategoryTag}
            category={
              typeof details?.category === 'undefined' ? 1 : details.category
            }
          />
        </Span>
        <Span style={styles.DatetimeRow}>
          <DatetimeLabel
            style={{ flex: 1.4 }}
            datetime={details?.datetime || Date()}
          />
          <Span style={{ flex: 1 }}>
            <Text style={styles.Subtitle}>Participantes</Text>
            <Text>{details?.Atendee?.length}</Text>
          </Span>
        </Span>
        <Span style={styles.Description}>
          <Text style={styles.Subtitle}>Descrição</Text>
          <Text>{details?.description}</Text>
        </Span>
        <Span>
          <Text style={styles.Subtitle}>Chat</Text>
        </Span>
      </Span>
    </Scroll>
  )
}

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
    backgroundColor: 'transparent',
    padding: 0,
  },
  wrapper: {
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: Dimensions.get('screen').height * 0.2,
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 18,
    padding: 14,
    marginBottom: 32,

    ...shadow,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 12,
    marginTop: 18,
  },
  closeButtonIcon: {
    elevation: 3,
  },
  AvatarWrapper: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 200,
  },
  Avatar: {
    position: 'absolute',
    top: -150,
  },
  AuthorButton: {
    position: 'relative',
  },
  AuthorIcon: {
    ...shadow,
  },
  TopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
    width: '100%',
  },
  TopRowEllipsis: {
    width: 48,
    height: 48,
  },
  AltButton: {
    borderRadius: 99999999,
    backgroundColor: Colors.xLightBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    width: '100%',
  },
  Title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 7,
    marginRight: 0,
  },
  CategoryTag: {
    backgroundColor: Colors.lightBackground,
  },
  CategoryRow: {
    marginTop: 8,
    marginBottom: 18,
  },
  DatetimeRow: {
    flexDirection: 'row',
    fontSize: 9,
    marginBottom: 10,
  },
  Subtitle: {
    fontWeight: '600',
  },
  Description: {
    marginBottom: 18,
  },
})
