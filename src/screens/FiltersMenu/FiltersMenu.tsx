import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

import MapToast from '@/components/MapToast/MapToast'
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import Colors from '@/constants/Colors'
import { useAppDispatch } from '@/store/hooks'
import { clearFilter, initialState, useMapFilter } from '@/store/mapFilterSlice'
import useMarkers from '../Home/hooks/useMarkers'
import FilterDateInput from './components/FilterRange/FilterDateInput'
import FilterSlideInput from './components/FilterSlideInput'

export type _filterDatetype = 'week' | 'month'

export interface IFilters {
  distance: number
  datetype: _filterDatetype
  minDateRange: string | null
  maxDateRange: string | null
}

function formatObjToComparison(object: object) {
  return JSON.stringify(object).split('').sort().join()
}

function showDate(date: string | null) {
  if (!date) return null
  return dayjs(date).format('DD/MM')
}

const datetypeDisplay = {
  week: 'esta semana/fds',
  month: 'este mês',
}

function FiltersMenu() {
  const dispatch = useAppDispatch()
  const navigator = useNavigation()
  const { shouldShowToast, filters, isGettingNewFilter } = useMapFilter()
  const { markers } = useMarkers()

  const [canClearFilters, setCanClearFilters] = useState(false)

  const form = useForm<IFilters>({
    defaultValues: {
      ...filters,
    },
  })

  const { control, watch, reset } = form

  function onClose() {
    navigator.navigate('Root')
  }

  function handleClear() {
    dispatch(clearFilter())
    reset(initialState.filters)
  }

  useEffect(() => {
    const canClearFilters =
      formatObjToComparison(filters) !==
      formatObjToComparison(initialState.filters)

    setCanClearFilters(canClearFilters)
  }, [filters])

  const rangeDisplay = useMemo(() => {
    const minRangeDisplay = filters.minDateRange
      ? `a partir de ${showDate(filters.minDateRange)} `
      : ''
    const maxRangeDisplay = filters.maxDateRange
      ? `até ${showDate(filters.maxDateRange)}`
      : ''
    return minRangeDisplay + maxRangeDisplay
  }, [filters.minDateRange, filters.maxDateRange])

  return (
    <>
      {shouldShowToast && (
        <MapToast>
          <MapToast.LoadingHeader
            loading={isGettingNewFilter}
            title={isGettingNewFilter ? '' : `${markers.length} Resultados`}
          >
            <Text>
              A {filters.distance} km e{' '}
              {filters.maxDateRange || filters.minDateRange
                ? rangeDisplay
                : datetypeDisplay[filters.datetype]}
            </Text>
          </MapToast.LoadingHeader>
        </MapToast>
      )}
      <ModalWrapper onClose={onClose}>
        <Span style={styles.FiltersMenu}>
          <Span style={styles.Header}>
            <Span style={styles.HeaderText}>
              <MaterialIcons
                color={Colors.primaryColor}
                size={34}
                name='filter-alt'
              />
              <Text style={styles.Title}>Filtros</Text>
            </Span>
            {canClearFilters && (
              <TouchableWithoutFeedback onPress={handleClear}>
                <Text style={styles.ClearFilterText}>Limpar</Text>
              </TouchableWithoutFeedback>
            )}
          </Span>
          <Span style={styles.DistanceFilter}>
            <FilterSlideInput control={control} watch={watch} />
          </Span>
          <FilterDateInput form={form} />
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
    justifyContent: 'space-between',
  },
  HeaderText: {
    flexDirection: 'row',
  },
  Title: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginBottom: 24,
  },
  DistanceFilter: {
    marginBottom: 40,
  },
  ClearFilterText: {
    fontWeight: 'bold',
  },
  SuccessHeaderText: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
})
