import dayjs from 'dayjs'
import { useState } from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import type { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import Colors from '@/constants/Colors'
import Button from '../Button/Button'
import Span from '../Span/Span'
import Text from '../Text/Text'

const DISPLAY_MODES = {
  short: 'DD/MM',
  long: 'DD [de] MMM. [às] HH:mm [horas]',
}

export type IProps = Partial<ReactNativeModalDateTimePickerProps> & {
  name: string
  control: any
  defaultValue?: string
  placeholder?: string
  displayMode: keyof typeof DISPLAY_MODES
  onChangeEventful?: (value: string) => void
  format?: string
}

function DateInput({
  style,
  name,
  control,
  defaultValue = '',
  placeholder = 'Selecionar data',
  mode = 'datetime',
  displayMode,
  onChangeEventful,
  format = 'YYYY-MM-DD HH:mm:ss',
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
    const value = dayjs(date).format(format)
    onChange(value)
    onChangeEventful?.(value)
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
            ? dayjs(value).format(DISPLAY_MODES[displayMode])
            : placeholder}
        </Text>
      </Button>
      <DateTimePickerModal
        isDarkModeEnabled
        locale='en_GB'
        isVisible={isDatePickerVisible}
        mode={mode}
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
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    marginBottom: 11,
  },
  placeholder: {
    color: Colors.gray,
  },
})

export default DateInput
