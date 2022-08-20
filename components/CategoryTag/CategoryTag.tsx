import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { ICategory } from '../MyEvent/types'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface IProps {
  category: ICategory
}

function CategoryTag({ category }: IProps) {
  return (
    <Span style={styles.Tag}>
      <Text style={styles.Text}>{category.label}</Text>
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
