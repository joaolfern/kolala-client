import React from 'react'
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

function EventForm({ navigation }: RootStackScreenProps<'EventForm'>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <SafeAreaView style={styles.View}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <Header>Criar evento</Header>
        <UploadImage
          control={control}
          name='image'
          style={styles.UploadImage}
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
          styles={styles.UploadImage}
        />

        <Label>Categorias</Label>
        <Select control={control} name='categories' items={CATEGORY_RESOURCE} />

        <Label>Ícone no mapa</Label>
        <MapIcon control={control} name='icon' />

        <Button style={styles.Button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.ButtonText}>Criar evento</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventForm

const styles = StyleSheet.create({
  View: {
    padding: 16,
  },
  UploadImage: {
    marginBottom: 20,
  },
  Button: {
    alignSelf: 'flex-end',
    width: 'auto',
  },
  ButtonText: {
    color: Colors.altText,
    fontWeight: '600',
  },
})
