import { useNavigation, useNavigationState } from '@react-navigation/native'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import type { Control, FieldError, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'

import Button from '@/components/Button/Button'
import DateInput from '@/components/DateInput/DateInput'
import FormItem from '@/components/FormItem/FormItem'
import Header from '@/components/Header/Header'
import Label from '@/components/Label/Label'
import SafeAreaView from '@/components/SafeAreaView/SafeAreaView'
import Scroll from '@/components/Scroll/Scroll'
import Select from '@/components/Select/Select'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import Textarea from '@/components/Textarea/Textarea'
import TextInput from '@/components/TextInput/TextInput'
import UploadImage from '@/components/UploadImage/UploadImage'
import Colors from '@/constants/Colors'
import { REACT_APP_SERVER } from '../../../env'
import type {
  IEventDetails,
  IEventFormSubmitEvent,
  IEventImage,
} from '@/Models/Event'
import Event from '@/Models/Event'
import { useMapFilter } from '@/store/mapFilterSlice'
import { showToast } from '@/utils/toast'
import useMarkers from '../Home/hooks/useMarkers'
import useUserLocation from '../Home/UserMarker/useUserLocation'
import { CATEGORY_RESOURCE } from './constants'

const MapIcon = React.lazy(() => import('@/components/MapIcon/MapIcon'))
const LocationInput = React.lazy(
  () => import('@/components/LocationInput/LocationInput')
)

function formatDetailsToForm({
  EventImage,
  lat,
  lng,
  address,
  title,
  description,
  category,
  datetime,
  icon,
}: IEventDetails): IEventFormSubmitEvent {
  return {
    title,
    description,
    category,
    datetime,
    icon,
    location: {
      lat,
      lng,
      address,
    },
    image: EventImage.map((image) => image.url),
  }
}

function EventForm() {
  const details = useNavigationState(
    (state) =>
      (
        state.routes.find((item) => item.name === 'EventForm')?.params as {
          event: IEventDetails | undefined
        }
      )?.event
  )
  const { lat, lng, address } = details || {}
  const isEditing = !!details
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const originalImagesRef = useRef(details?.EventImage || [])
  const navigation = useNavigation()
  const { requestMarkers } = useMarkers()
  const { location } = useUserLocation()
  const { filters } = useMapFilter()

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IEventFormSubmitEvent>({
    defaultValues: details ? formatDetailsToForm(details) : undefined,
  })

  useEffect(() => {
    if (details?.icon || details?.icon === 0) setValue('icon', details?.icon)
  }, [details?.icon])

  function makeFormData(data: IEventFormSubmitEvent, formData: FormData) {
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) return
      switch (key) {
        case 'image':
          value?.map?.((uri: string | IEventImage[], idx: number) => {
            if (typeof uri === 'string') {
              const isHosted = uri.includes(REACT_APP_SERVER)
              if (isHosted) return

              const uriArray = uri.split('.')
              const fileType = uriArray[uriArray.length - 1]

              const file = {
                uri,
                name: `${data.title.replace(/ /g, '-')}(${idx}).${fileType}`,
                type: `image/${fileType}`,
              }
              formData.append(`${key}[]`, file as unknown as Blob)
            }
          })

          return
        case 'location':
          Object.entries(value).map(([formKey, formValue]) => {
            if (formValue) formData.append(formKey, formValue as string)
          })

          return
        default:
          formData.append(key, value)
      }
    })
  }

  async function onSubmit(data: IEventFormSubmitEvent) {
    const formData = new FormData()
    makeFormData(data, formData)

    setLoadingSubmit(true)
    try {
      if (details) await updateForm(data, formData)
      else await createForm(formData)
      if (location) requestMarkers(location, filters)
    } catch (err) {
      if (err) {
        if (err._message) showToast('Ocorreu um problema')

        const formMessages = err?.response?.data
        if (formMessages) {
          Object.entries(formMessages).map(
            ([key, message]: [string, unknown]) => {
              setError(key as keyof IEventFormSubmitEvent, {
                message: message as string,
              })
            }
          )
        }
      }
    } finally {
      setLoadingSubmit(false)
    }
  }

  async function createForm(formData: FormData) {
    await Event.create(formData)

    navigation.goBack()
    navigation.navigate('Events')
  }

  async function updateForm(data: IEventFormSubmitEvent, formData: FormData) {
    originalImagesRef.current
      .filter((originalItem) => !data.image.includes(originalItem.url))
      .map((item) => {
        formData.append('removedImages[]', String(item.id))
      })

    if (!details?.id) throw new Error('EventId not found')

    await Event.update(String(details.id), formData)

    navigation.goBack()
  }

  return (
    <Scroll style={styles.Scroll} keyboardShouldPersistTaps='handled'>
      <SafeAreaView>
        <Header>
          <Header.Title>Criar evento</Header.Title>
        </Header>

        <FormItem label={undefined} error={errors.image as FieldError}>
          <UploadImage
            control={control}
            name='image'
            style={styles.marginBottom}
            defaultValue={details?.EventImage}
          />
        </FormItem>

        <FormItem label='Título' error={errors.title}>
          <TextInput
            name='title'
            control={control}
            placeholder='ex: Festival de cinema brasileiro'
          />
        </FormItem>

        <FormItem label='Descrição' error={errors.description}>
          <Textarea
            name='description'
            control={control}
            placeholder='ex: Grupo que se reúne semanalmente para apreciar os clássicos da sétima arte nacional, debater e compartilhar experiências.'
          />
        </FormItem>

        <FormItem label='Local' error={errors.address as FieldError}>
          <Suspense fallback={<TextInput control={control} name='location' />}>
            <LocationInput
              name='location'
              control={control as unknown as Control<FieldValues>}
              styles={styles.marginBottom}
              clearError={() => setError('address', { message: undefined })}
              defaultValue={{
                lat,
                lng,
                address,
              }}
            />
          </Suspense>
        </FormItem>

        <FormItem label='Data e hora' error={errors.datetime as FieldError}>
          <DateInput
            displayMode='long'
            control={control}
            name='datetime'
            style={styles.ItemMarginBottom}
          />
        </FormItem>

        <FormItem label='Categoria' error={errors.category}>
          <Select control={control} name='category' items={CATEGORY_RESOURCE} />
        </FormItem>

        <Span>
          <Label>Ícone no mapa</Label>
          <Suspense fallback={<TextInput control={control} name='icon' />}>
            <MapIcon
              control={control as unknown as Control<FieldValues>}
              name='icon'
            />
          </Suspense>
        </Span>

        <Button
          loading={loadingSubmit}
          style={styles.Button}
          onPress={(e) => {
            clearErrors()
            handleSubmit(onSubmit)(e)
          }}
        >
          <Text style={styles.ButtonText}>
            {isEditing ? 'Editar' : 'Criar'} evento
          </Text>
        </Button>
      </SafeAreaView>
    </Scroll>
  )
}

export default EventForm

const styles = StyleSheet.create({
  Scroll: {
    backgroundColor: Colors.background,
  },
  marginBottom: {
    marginBottom: 20,
  },
  Button: {
    alignSelf: 'flex-end',
    width: 'auto',
    marginTop: 20,
    marginBottom: 50,
  },
  ItemMarginBottom: {},
  ButtonText: {
    color: Colors.altText,
    fontWeight: '600',
  },
})
