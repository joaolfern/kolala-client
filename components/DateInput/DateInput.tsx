import React, { useState } from 'react'
import Button from '../Button/Button'
import Span from '../Span/Span'
import Text from '../Text/Text'
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker'
import { useController } from 'react-hook-form'
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

export type IProps = Partial<ReactNativeModalDateTimePickerProps> & {
  name: string
  control: any
  defaultValue?: string
}

function DateInput({
  style,
  name,
  control,
  defaultValue = '',
  ...rest
}: IProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    onChange(dayjs(date).format('YYYY-MM-DD HH:mm:ss'))
    hideDatePicker()
  }

  const { value, onChange } = field

  return (
    <Span>
      <Button
        style={[styles.DateInput, style]}
        onPress={showDatePicker}
        {...rest}
      >
        <Text style={value ? {} : styles.placeholder}>
          {value
            ? dayjs(value).format('DD [de] MMM. [às] HH:mm [horas]')
            : 'Selecionar data'}
        </Text>
      </Button>
      <DateTimePickerModal
        isDarkModeEnabled={true}
        locale='en_GB'
        isVisible={isDatePickerVisible}
        mode='datetime'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...rest}
      />
    </Span>
  )
}

const styles = StyleSheet.create({
  DateInput: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 10,
    minHeight: 58,
    color: Colors.text,
    marginBottom: 32,
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: Colors.gray,
  },
})

export default DateInput
