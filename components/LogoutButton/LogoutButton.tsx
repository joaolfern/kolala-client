import React from 'react'
import Button from '../Button/Button'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

function LogoutButton() {
  return (
    <Button>
      <MaterialIcons name='logout' size={24} color='black' />
    </Button>
  )
}

export default LogoutButton

const styles = StyleSheet.create({})
