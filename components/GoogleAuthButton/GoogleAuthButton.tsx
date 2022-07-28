import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Button from '../Button/Button'
import Text from '../Text/Text'
import google from '../../assets/images/google.png'

function GoogleAuthButton() {
  return (
    <View style={styles.View}>
      <Button style={styles.Button}>
        <Image
          style={styles.Image}
          source={google}
        />
        <Text style={styles.Text}>
          Continuar com Google
        </Text>
      </Button>
    </View>
  )
}

export default GoogleAuthButton

const styles = StyleSheet.create({
  Image: {
    marginRight: 36
  },
  View: {
    padding: 19,
    width: '100%',

  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    height: 59,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  Text: {
    color: '#6C6C6C',
    fontWeight: '600',
  }
})