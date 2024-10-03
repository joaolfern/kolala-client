import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'
import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface IProps extends ViewProps {
  title: ReactNode
  content: ReactNode
}

function ReplyPreview({ content, title, style, ...rest }: IProps) {
  return (
    <Span style={[styles.Container, style]} {...rest}>
      <Span style={styles.Marker} />
      <Text numberOfLines={1}>{title}</Text>
      <Text style={styles.Text}>{content}</Text>
    </Span>
  )
}

export default ReplyPreview

const styles = StyleSheet.create({
  Container: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.xLightBackground,
    padding: 14,
  },
  Text: {
    fontSize: 14,
  },
  Marker: {
    width: 4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.secondaryColor,
  },
})
