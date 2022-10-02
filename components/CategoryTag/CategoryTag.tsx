import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { CATEGORY_RESOURCE } from '../../screens/EventForm/constants'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface IProps {
  category: number
}

function CategoryTag({ category }: IProps) {
  const categoryItem = useMemo(
    () => CATEGORY_RESOURCE.find(item => item.value === category),
    []
  )
  return (
    <Span style={styles.Tag}>
      <Text style={styles.Text}>{categoryItem?.label}</Text>
    </Span>
  )
}

export default CategoryTag

const styles = StyleSheet.create({
  Tag: {
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 19,
    flex: 0,
    paddingHorizontal: 12,
    height: 30,
  },
  Text: {
    fontWeight: 'bold',
  },
})
