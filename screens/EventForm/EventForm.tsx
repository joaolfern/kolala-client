import React, { useState, Suspense, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
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

import { createEvent } from './api'
import DateInput from '../../components/DateInput/DateInput'
import { IEvent } from '../../types/Event'
import Scroll from '../../components/Scroll/Scroll'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { showToast } from '../../utils/toast'
const MapIcon = React.lazy(() => import('./../../components/MapIcon/MapIcon'))
const LocationInput = React.lazy(
  () => import('../../components/LocationInput/LocationInput')
)

function formatDetailsToForm({
  EventImage,
  Atendee,
  author,
  lat,
  lng,
  authorId,
  createdAt,
  id,
  status,
  ...details
}: IEvent.Details): IEvent.FormSubmitEvent {
  return {
    ...details,
    location: {
      lat,
      lng,
    },
    image: EventImage.map(image => image.url),
  }
}

function EventForm() {
  const details = useNavigationState(
    state =>
      (
        state.routes.find(item => item.name === 'EventForm')?.params as {
          event: IEvent.Details | undefined
        }
      )?.event
  )

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const navigation = useNavigation()
  const originalImagesRef = useRef(details?.EventImage || [])

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IEvent.FormSubmitEvent>({
    defaultValues: details ? formatDetailsToForm(details) : undefined,
  })

  useEffect(() => {
    if (details?.icon || details?.icon === 0) setValue('icon', details?.icon)
  }, [details?.icon])

  function makeFormData(data: IEvent.FormSubmitEvent, formData: FormData) {
    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case 'image':
          value?.map?.((uri: string | IEvent.Image[], idx: number) => {
            if (typeof uri === 'string') {
              let uriArray = uri.split('.')
              let fileType = uriArray[uriArray.length - 1]

              const file: any = {
                uri,
                name: `${data.title} (${idx}).${fileType}`,
                type: `image/${fileType}`,
              }
              formData.append(`${key}[]`, file)
              return
            }
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

  async function onSubmit(data: IEvent.FormSubmitEvent) {
    const formData = new FormData()
    makeFormData(data, formData)

    console.log(JSON.stringify(formData, null, 2))

    setLoadingSubmit(true)
    try {
      if (details) await updateForm(data, formData)
      else await createEvent(formData)
      navigation.navigate('Events')
    } catch (err) {
      showToast('Ocorreu um problema')
      console.log(err)
    } finally {
      setLoadingSubmit(false)
    }
  }

  async function updateForm(data: IEvent.FormSubmitEvent, formData: FormData) {
    originalImagesRef.current
      .filter(originalItem => !data.image.includes(originalItem.url))
      .map(item => {
        formData.append('removedImages[]', String(item.id))
      })
  }

  return (
    <SafeAreaView>
      <Scroll keyboardShouldPersistTaps='handled'>
        <Header>Criar evento</Header>
        <UploadImage
          control={control}
          name='image'
          style={styles.marginBottom}
          defaultValue={details?.EventImage}
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
        <Suspense fallback={<TextInput control={control} name='' />}>
          <LocationInput
            name='location'
            control={control}
            styles={styles.marginBottom}
          />
        </Suspense>

        <Label>Data e hora</Label>
        <DateInput control={control} name='datetime' />

        <Label>Categoria</Label>
        <Select control={control} name='category' items={CATEGORY_RESOURCE} />

        <Label>Ícone no mapa</Label>
        <Suspense fallback={<TextInput control={control} name='' />}>
          <MapIcon control={control} name='icon' />
        </Suspense>

        <Button
          loading={loadingSubmit}
          style={styles.Button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.ButtonText}>Criar evento</Text>
        </Button>
      </Scroll>
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
    marginBottom: 30,
  },
  ButtonText: {
    color: Colors.altText,
    fontWeight: '600',
  },
})
