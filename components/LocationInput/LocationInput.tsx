import React from 'react'
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
} from 'react-native-google-places-autocomplete'
// @ts-ignore
import { GOOGLE_API_TOKEN } from '@env'
import Colors from '../../constants/Colors'
import { useController } from 'react-hook-form'

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
      query={{
        key: GOOGLE_API_TOKEN,
        language: 'pt-BR',
        location: {
          latitude: -23.4874549,
          longitude: -47.4991724,
        },
      }}
    />
  )
}

const style: GooglePlacesAutocompleteProps['styles'] = {
  container: {
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: Colors.text,
    // borderRadius: 10,
    // minHeight: 58,
    // marginBottom: 25,
    // paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  // textInput: {
  //   fontSize: 18,
  //   color: Colors.text,
  // },
  // description: {},
  // textInputContainer: {
  //   justifyContent: 'center',
  //   minHeight: 58,
  // },
}

export default LocationInput
