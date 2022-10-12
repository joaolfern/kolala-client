import { useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Colors from '../../constants/Colors'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
import { IEvent } from '../../types/Event'
import Button from '../Button/Button'
import Text from '../Text/Text'

interface IButtonComponentProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  onPress(): void
}

function ButtonComponent({ children, onPress, style }: IButtonComponentProps) {
  return (
    <Button
      style={[styles.PrimaryButton, styles.PrimaryButtonActive, style]}
      onPress={onPress}
    >
      <Text style={[styles.PrimaryButtonActiveText]}>{children}</Text>
    </Button>
  )
}

interface IEventDetailsButtonProps {
  event: IEvent.Details | null
  loading: boolean
}

function EventDetailsButton({ event, loading }: IEventDetailsButtonProps) {
  const { user } = useAppSelector(selectUser)
  const isAuthor = event?.authorId === user?.id
  const isParticipating = event?.Atendee.find(user => user.id === user.id)
  const navigation = useNavigation()

  function navigateToEdit(event: IEvent.Details) {
    navigation.goBack()
    navigation.navigate('EventForm', {
      event: event,
    })
  }

  if (loading || !event)
    return <Button style={[styles.PrimaryButton, styles.PrimaryButtonActive]} />

  if (isAuthor)
    return (
      <ButtonComponent onPress={() => navigateToEdit(event)}>
        Editar
      </ButtonComponent>
    )

  if (isParticipating)
    return (
      <Button style={[styles.PrimaryButton, styles.PrimaryButtonActive]}>
        <Text style={[styles.PrimaryButtonActiveText]}>Participando</Text>
      </Button>
    )

  return (
    <Button style={[styles.SecondaryButton]}>
      <Text style={[styles.PrimaryButtonActiveText]}>Participar</Text>
    </Button>
  )
}

export default EventDetailsButton

const styles = StyleSheet.create({
  PrimaryButton: {
    marginLeft: 'auto',
    height: 34,
    paddingVertical: 0,
  },
  PrimaryButtonActive: {
    backgroundColor: Colors.primaryColor,
  },
  PrimaryButtonActiveText: {
    color: Colors.background,
  },
  SecondaryButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    backgroundColor: 'transparent',
  },
})
