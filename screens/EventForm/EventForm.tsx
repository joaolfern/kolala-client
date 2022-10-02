import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Text from '../../components/Text/Text'
import UploadImage from '../../components/UploadImage/UploadImage'
import TextInput from '../../components/TextInput/TextInput'
import Label from '../../components/Label/Label'
import Button from '../../components/Button/Button'
import Colors from '../../constants/Colors'
import { useForm } from 'react-hook-form'
import Textarea from '../../components/Textarea/Textarea'
import Select from '../../components/Select/Select'
import { CATEGORY_RESOURCE } from './constants'
import Header from '../../components/Header/Header'
import { RootStackScreenProps, RootTabScreenProps } from '../../types'
import MapIcon from '../../components/MapIcon/MapIcon'
import LocationInput from '../../components/LocationInput/LocationInput'
import { IEventFormSubmitEvent } from '../../types/Event'
import { createEvent } from './api'
import DateInput from '../../components/DateInput/DateInput'

function EventForm({ navigation }: RootStackScreenProps<'EventForm'>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEventFormSubmitEvent>()
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  function makeFormData(data: IEventFormSubmitEvent, formData: FormData) {
    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case 'image':
          value?.map?.((uri: string, idx: number) => {
            let uriArray = uri.split('.')
            let fileType = uriArray[uriArray.length - 1]

            const file = {
              uri,
              name: `${data.title} (${idx}).${fileType}`,
              type: `image/${fileType}`,
            }

            // @ts-ignore
            formData.append(`key`, file)
            return
          })

          return
        case 'location':
          formData.append('lat', value.lat)
          formData.append('lng', value.lng)

          return
        default:
          formData.append(key, value)
          return
      }
    })
  }

  async function onSubmit(data: IEventFormSubmitEvent) {
    const formData = new FormData()
    makeFormData(data, formData)

    setLoadingSubmit(true)
    try {
      const response = await createEvent(formData)
      // TODO 🎈🎈
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Header>Criar evento</Header>
        <UploadImage
          control={control}
          name='image'
          style={styles.marginBottom}
        />
        <Label>Título</Label>
        <TextInput
          name='title'
          control={control}
          placeholder='ex: Festival de cinema brasileiro'
        />

        <Label>Descrição</Label>
        <Textarea
          name='description'
          control={control}
          placeholder='ex: Grupo que se reúne semanalmente para apreciar os clássicos da sétima arte nacional, debater e compartilhar experiências.'
        />

        <Label>Local</Label>
        <LocationInput
          name='location'
          control={control}
          styles={styles.marginBottom}
        />

        <Label>Categoria</Label>
        <Select control={control} name='category' items={CATEGORY_RESOURCE} />

        <Label>Data e hora</Label>
        <DateInput control={control} name='datetime' />

        <Label>Ícone no mapa</Label>
        <MapIcon control={control} name='icon' />

        <Button
          loading={loadingSubmit}
          style={styles.Button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.ButtonText}>Criar evento</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventForm

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 20,
  },
  Button: {
    alignSelf: 'flex-end',
    width: 'auto',
    marginTop: 20,
  },
  ButtonText: {
    color: Colors.altText,
    fontWeight: '600',
  },
})
