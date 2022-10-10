import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import Button from '../Button/Button'
import Text from '../Text/Text'

interface IProps {
  eventId: number
}

function EventDetailsButton({ eventId }: IProps) {
  return (
    <Button style={[styles.PrimaryButton, styles.PrimaryButtonActive]}>
      <Text style={[styles.PrimaryButtonActiveText]}>Participando</Text>
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
})
