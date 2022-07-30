import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SafeAreaView from '../../components/SafeAreaView/SafeAreaView'
import Switch from '../../components/Toggle/Toggle'
import Text from '../../components/Text/Text'
import UploadImage from '../../components/UploadImage/UploadImage'
import View from '../../components/View/View'
import TextInput from '../../components/TextInput/TextInput'
import Label from '../../components/Label/Label'
import Button from '../../components/Button/Button'
import Colors from '../../constants/Colors'
import { useForm } from 'react-hook-form'
import Textarea from '../../components/Textarea/Textarea'
import Select from '../../components/Select/Select'
import { CATEGORY_RESOURCE } from './constants'

function EventForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => console.log(data)
  return (
    <SafeAreaView style={styles.View}>
      <ScrollView>
        <Text style={styles.Title}>Criar evento</Text>
        <UploadImage amount={6} style={styles.UploadImage} />

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

        <Label>Categorias</Label>
        <Select control={control} name='cateogries' items={CATEGORY_RESOURCE} />

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
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 19,
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
