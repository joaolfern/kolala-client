import { useEffect } from 'react'
import type { Control, UseFormWatch } from 'react-hook-form'

import SliderInput from '@/components/Slider/SliderInput'
import useDebounceEffect from '@/hooks/useDebounceEvent'
import { useAppDispatch } from '@/store/hooks'
import { setFilter } from '@/store/mapFilterSlice'
import type { IFilters } from '../FiltersMenu'

interface IProps {
  watch: UseFormWatch<IFilters>
  control: Control<IFilters, any>
}

function FilterSlideInput({ watch, control }: IProps) {
  const distance = watch('distance')
  const dispatch = useAppDispatch()
  const { takeLastestEvent } = useDebounceEffect()

  useEffect(() => {
    takeLastestEvent(() => {
      dispatch(setFilter({ distance }))
    }, 600)
  }, [distance])

  return (
    <SliderInput
      name='distance'
      control={control}
      max={100}
      min={10}
      step={10}
      sulfix='km'
    />
  )
}

export default FilterSlideInput
