import { useNavigation } from '@react-navigation/native'
import type { TextProps, ViewProps } from 'react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

import ArrowRight from '@/assets/images/arrow-right.svg'
import Span from '../Span/Span'
import Text from '../Text/Text'

type IHeader = ViewProps & {}

function Header({ style, children }: IHeader) {
  const navigation = useNavigation()

  function onBack() {
    navigation.goBack()
  }

  return (
    <Span style={[styles.Container, style]}>
      <TouchableOpacity onPress={onBack}>
        <Span style={styles.BackIconContainer}>
          <ArrowRight style={styles.BackIcon} />
        </Span>
      </TouchableOpacity>
      {children}
    </Span>
  )
}

type ITitle = TextProps & {}

function Title({ style, ...rest }: ITitle) {
  return <Text numberOfLines={1} style={[style, styles.Text]} {...rest} />
}

Header.Title = Title

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
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
    marginRight: 14,
  },
})

export default Header
