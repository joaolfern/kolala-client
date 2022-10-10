import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface IProps extends ViewProps {
  datetime: string | Date
}

function DatetimeLabel({ datetime, style }: IProps) {
  return (
    <Span style={[styles.DataRow, styles.InnerGapBottom, style]}>
      <Span style={styles.DataRowLeft}>
        <Text style={styles.Label}>Data</Text>
        <Text>{dayjs(datetime).format('DD [de] MMM[.]')}</Text>
      </Span>
      <Span style={styles.DataRowRight}>
        <Text style={styles.Label}>Horário</Text>
        <Text>{dayjs(datetime).format('HH:mm')}</Text>
      </Span>
    </Span>
  )
}

export default DatetimeLabel

const styles = StyleSheet.create({
  InnerGapBottom: {
    marginBottom: 8,
  },
  DataRow: {
    flexDirection: 'row',
  },
  DataRowLeft: {
    flexGrow: 1,
  },
  DataRowRight: {
    flexGrow: 1,
  },
  Label: {
    fontWeight: '600',
  },
})
