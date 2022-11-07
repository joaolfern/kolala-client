import React, { useRef } from 'react'
import { Region } from 'react-native-maps'
import Event, { IEvent } from '../../../Models/Event'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  updateIsGettingNewFilter,
  updateShouldShowToast,
} from '../../../store/mapFilterSlice'
import { selectMarkers, updateMarkers } from '../../../store/markersSlice'
import { showToast } from '../../../utils/toast'
import { IFilters } from '../../FiltersMenu/FiltersMenu'

function useMarkers() {
  const { markers } = useAppSelector(selectMarkers)
  const currentFiltersString = useRef('')
  const dispatch = useAppDispatch()

  function setMarkers(data: IEvent.IMarkers[]) {
    dispatch(updateMarkers(data))
  }

  async function requestMarkers(location: Region, filters: IFilters) {
    const selectedFiltersString = JSON.stringify(filters)
    const shouldShowFilterLoading =
      currentFiltersString.current !== selectedFiltersString

    currentFiltersString.current = selectedFiltersString

    if (shouldShowFilterLoading) {
      dispatch(updateIsGettingNewFilter(true))
      dispatch(updateShouldShowToast(true))
    }
    try {
      const response = await Event.getMarkers({
        params: {
          lat: location.latitude,
          lng: location.longitude,
          ...filters,
        },
      })
      const data = response.data.data

      if (Array.isArray(data)) setMarkers(data)
    } catch (err: any) {
      console.error(err)
      showToast(err.message)
    }
    if (shouldShowFilterLoading) dispatch(updateIsGettingNewFilter(false))
  }

  return {
    markers,
    requestMarkers,
  }
}

export default useMarkers
