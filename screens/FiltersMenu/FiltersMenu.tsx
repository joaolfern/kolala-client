import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Animated, StyleSheet } from 'react-native'
import MapToast from '../../components/MapToast/MapToast'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import Span from '../../components/Span/Span'
import Text from '../../components/Text/Text'
import Colors from '../../constants/Colors'
import { useMapFilter } from '../../store/mapFilterSlice'
import FilterSlideInput from './components/FilterSlideInput'

export interface IFilters {
  distance: number
}

function FiltersMenu() {
  const navigator = useNavigation()
  const { shouldShowToast, filters } = useMapFilter()

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<IFilters>({
    defaultValues: {
      ...filters,
    },
  })

  function onClose() {
    navigator.navigate('Root')
  }

  return (
    <>
      {shouldShowToast && <MapToast />}
      <ModalWrapper onClose={onClose}>
        <Span style={styles.FiltersMenu}>
          <Span style={styles.Header}>
            <MaterialIcons
              color={Colors.primaryColor}
              size={34}
              name='filter-alt'
            />
            <Text style={styles.Title}>Filtros</Text>
          </Span>
          <FilterSlideInput control={control} watch={watch} />
        </Span>
      </ModalWrapper>
    </>
  )
}

export default FiltersMenu

const styles = StyleSheet.create({
  FiltersMenu: {
    marginTop: 16,
    backgroundColor: Colors.background,
    width: '100%',
    zIndex: 1,
    borderRadius: 16,
    padding: 16,
  },
  Header: {
    flexDirection: 'row',
  },
  Title: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 24,
  },
})
