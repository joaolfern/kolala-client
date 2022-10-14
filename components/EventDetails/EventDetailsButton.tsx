import { useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Colors from '../../constants/Colors'
import { IEvent } from '../../Models/Event'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/userSlice'
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
      style={[styles.PrimaryButton, styles.PrimaryButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.PrimaryButtonText]}>{children}</Text>
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
    navigation.navigate('EventForm', {
      event: event,
    })
  }

  if (loading || !event)
    return <Button style={[styles.Button, styles.PrimaryButton]} />

  if (isAuthor)
    return (
      <ButtonComponent
        style={[styles.Button, styles.PrimaryButton]}
        onPress={() => navigateToEdit(event)}
      >
        Editar
      </ButtonComponent>
    )

  if (isParticipating)
    return (
      <Button style={[styles.Button, styles.PrimaryButton]}>
        <Text style={[styles.PrimaryButtonText]}>Participando</Text>
      </Button>
    )

  return (
    <Button style={[styles.Button, styles.SecondaryButton]}>
      <Text style={[styles.SecondaryButtonText]}>Participar</Text>
    </Button>
  )
}

export default EventDetailsButton

const styles = StyleSheet.create({
  Button: {
    marginLeft: 'auto',
    height: 34,
    paddingVertical: 0,
  },
  PrimaryButton: {
    backgroundColor: Colors.primaryColor,
  },
  PrimaryButtonText: {
    color: Colors.background,
  },
  SecondaryButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  SecondaryButtonText: {
    color: Colors.primaryColor,
  },
})
