import React from 'react'
import { StyleSheet, TextProps, TouchableOpacity } from 'react-native'
import Span from '../Span/Span'
import Text from '../Text/Text'
import ArrowRight from '../../assets/images/arrow-right.svg'
import { useNavigation } from '@react-navigation/native'
type IProps = TextProps & {}

function Header({ ...rest }: IProps) {
  const navigation = useNavigation()

  function onBack() {
    navigation.goBack()
  }

  return (
    <Span style={styles.Container}>
      <TouchableOpacity onPress={onBack}>
        <Span style={styles.BackIconContainer}>
          <ArrowRight style={styles.BackIcon} />
        </Span>
      </TouchableOpacity>
      <Text style={styles.Text} {...rest} />
    </Span>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  Text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  BackIconContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  BackIcon: {
    transform: [{ rotate: '180deg' }],
    marginRight: 18,
  },
})

export default Header
