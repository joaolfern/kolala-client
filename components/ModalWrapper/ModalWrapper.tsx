import { FontAwesome5 } from '@expo/vector-icons'
import React, { ReactNode } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import Scroll from '../Scroll/Scroll'
import Span from '../Span/Span'

interface IProps {
  children: ReactNode
  onClose(): void
}

function ModalWrapper({ children, onClose }: IProps) {
  return (
    <Scroll style={styles.Container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesome5
          size={32}
          name='times-circle'
          solid
          color={Colors.gray}
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
      <Span style={styles.Content}>{children}</Span>
    </Scroll>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
    backgroundColor: 'transparent',
    padding: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginRight: 12,
    marginTop: 18,
    marginBottom: 16,
  },
  closeButtonIcon: {
    elevation: 3,
  },
  Content: {
    marginBottom: 32,
    flex: 1,
  },
})
