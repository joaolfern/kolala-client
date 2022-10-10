import { FontAwesome5 } from '@expo/vector-icons'
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import Event from '../../Models/Event'
import { shadow } from '../../screens/EventForm/utils'
import { IMarkers } from '../../screens/Home/api'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { IEvent } from '../../types/Event'
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

export default function EventDetails() {
  const marker = useNavigationState(
    state =>
      (
        state.routes.find(item => item.name === 'EventDetails')?.params as {
          marker: IMarkers
        }
      ).marker
  ) as unknown as IMarkers
  const navigation = useNavigation()
  const [details, setDetails] = useState<IEvent.Details | null>(null)
  const [loading, setLoading] = useState(false)
  const user = useAppSelector(selectUser)
  const isAuthor = details?.authorId === user.account?.id

  async function getDetails(id: number) {
    setLoading(true)
    try {
      const response = await Event.getDetails(id)
      const data = response.data?.data
      if (data) {
        setDetails(data)
      }
    } catch (err) {
      showToast('Ocorreu um problema')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (marker?.id) getDetails(marker?.id)
    }, [marker])
  )

  function closeDetails() {
    navigation.goBack()
  }

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
          <Span>
            <Button style={[styles.TopRowEllipsis, styles.AltButton]}>
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
          <Text style={styles.Title}>{marker?.title}</Text>
          <EventDetailsButton eventId={marker.id} />
        </Span>
        <Span style={styles.CategoryRow}>
          <CategoryTag
            style={styles.CategoryTag}
            category={details?.category || 2}
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
    marginTop: '35%',
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 18,
    padding: 14,
    marginBottom: 32,

    ...shadow,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 14,
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
    ...shadow,
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
