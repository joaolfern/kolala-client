import React from 'react'
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
} from 'react-native-google-places-autocomplete'
// @ts-ignore
import { GOOGLE_API_TOKEN } from '@env'
import Colors from '../../constants/Colors'
import { useController } from 'react-hook-form'
import Span from '../Span/Span'
import Text from '../Text/Text'

interface IProps extends Partial<GooglePlacesAutocompleteProps> {
  name: string
  control: any
}

function LocationInput({ control, name, ...rest }: IProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: {},
  })

  const { onChange } = field

  return (
    <GooglePlacesAutocomplete
      {...rest}
      styles={style}
      placeholder='ex: Avenida Chico Mendes 213, São Paulo'
      textInputProps={{
        placeholderTextColor: Colors.gray,
      }}
      enablePoweredByContainer={false}
      onFail={error => console.log(error)}
      fetchDetails={true}
      onPress={(_, details = null) => {
        onChange(details?.geometry.location)
      }}
      debounce={700}
      keyboardShouldPersistTaps='always'
      disableScroll={true}
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
    marginBottom: 20,
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
    fontWeight: '600' as '600',
  },
}

export default LocationInput
