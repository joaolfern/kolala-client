import { useEffect, useRef } from 'react'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'
import type {
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import Colors from '@/constants/Colors'
import { GOOGLE_API_TOKEN } from '../../../env'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface FormValueProps {
  address: string | undefined
  lat?: number | undefined
  lng?: number | undefined
}

interface IProps<T extends FieldValues>
  extends Partial<GooglePlacesAutocompleteProps> {
  name: Path<T>
  control: Control<T>
  defaultValue: PathValue<T, Path<T>>
  clearError(): void
}

function LocationInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
  clearError,
  ...rest
}: IProps<T>) {
  const ref = useRef<GooglePlacesAutocompleteRef>(null)
  const shouldSetDefault = useRef(true)
  const { field } = useController({
    name,
    control,
    defaultValue,
  })

  const { onChange } = field

  useEffect(() => {
    if (shouldSetDefault.current && ref.current && defaultValue.address) {
      ref.current.setAddressText(defaultValue.address)
      shouldSetDefault.current = false
    }
  }, [defaultValue])

  return (
    <GooglePlacesAutocomplete
      {...rest}
      ref={ref}
      styles={style}
      placeholder='ex: Avenida Chico Mendes 213, São Paulo'
      textInputProps={{
        placeholderTextColor: Colors.gray,
      }}
      enablePoweredByContainer={false}
      onFail={(error) => console.log(error)}
      fetchDetails
      onPress={(_, details = null) => {
        const data: FormValueProps = {
          ...details?.geometry.location,
          address: details?.name,
        }
        onChange(data || {})
        clearError()
      }}
      debounce={800}
      keyboardShouldPersistTaps='always'
      disableScroll
      query={{
        key: GOOGLE_API_TOKEN,
        language: 'pt-BR',
        rankby: 'distance',
        location: '-23.4874549,-47.4991724',
      }}
      renderRow={(rowData, idx) => {
        const title = rowData.structured_formatting.main_text
        const address = rowData.structured_formatting.secondary_text
        return (
          <Span style={resultStyle.containerResultRow(idx)}>
            <Text style={resultStyle.resultTitle}>{title}</Text>
            <Text>{address}</Text>
          </Span>
        )
      }}
    />
  )
}

const style: GooglePlacesAutocompleteProps['styles'] = {
  container: {
    justifyContent: 'center',
  },
  textInput: {
    minHeight: 58,
    marginTop: 4,
    color: Colors.text,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'transparent',
    fontSize: 18,
    margin: 0,
    paddingHorizontal: 20,
  },
  textInputContainer: {
    justifyContent: 'center',
  },
  separator: {
    display: 'none',
  },
  row: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    color: Colors.text,
  },
}

const resultStyle = {
  containerResultRow: (idx: number) => ({
    flex: 1,
    'justify-content': 'center',
    color: Colors.text,
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,

    backgroundColor: idx % 2 ? Colors.xLightBackground : Colors.lightBackground,
  }),
  resultTitle: {
    fontWeight: '600' as const,
  },
}

export default LocationInput
