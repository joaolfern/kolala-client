import React, { ReactNode, useCallback, useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Slider from 'rn-range-slider'

import Rail from './components/Rail'
import RailSelected from './components/RailSelected'
import Notch from './components/Notch'
import Thumb from './components/Thumb'
import SliderLabel from './components/SliderLabel'
import { useController } from 'react-hook-form'
import Colors from '../../constants/Colors'
import Span from '../Span/Span'
import Label from '../Label/Label'

interface IProps {
  min: number
  max: number
  step: number
  disableRange?: boolean
  floatingLabel?: boolean
  sulfix: string
  name: string
  control: any
}

const SliderInput = ({
  min,
  max,
  step,
  disableRange = true,
  floatingLabel = true,
  sulfix,
  name,
  control,
}: IProps) => {
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderNotch = useCallback(() => <Notch />, [])
  const renderLabel = useCallback(
    (value: ReactNode) => <SliderLabel text={`${value} ${sulfix}`} />,
    [sulfix]
  )

  const { field } = useController({
    name,
    control,
  })

  const { onChange, value } = field

  const handleValueChange = useCallback(
    (selectedMin: number, selectedMax: number) => {
      onChange(disableRange ? selectedMin : [selectedMin, selectedMax])
    },
    []
  )

  const controlledValues = useMemo(() => {
    return disableRange ? { low: value } : { low: value[0], high: value[0] }
  }, [disableRange, value])

  return (
    <>
      <Span style={styles.Header}>
        <Label style={styles.Title}>Distância</Label>
        <Text style={styles.Value}>{`${value} ${sulfix}`}</Text>
      </Span>
      <View style={styles.root}>
        <Slider
          style={styles.slider}
          min={min}
          max={max}
          step={step}
          disableRange={disableRange}
          floatingLabel={floatingLabel}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
          {...controlledValues}
        />
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{`${min} ${sulfix}`}</Text>
          <Text style={styles.valueText}>{`${max} ${sulfix}`}</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    marginBottom: 0,
  },
  Value: {
    color: Colors.secondaryColor,
  },
  root: {
    alignItems: 'stretch',
    paddingHorizontal: 0,
    height: 100,
    justifyContent: 'center',
    width: '100%',
  },
  slider: {},
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: '#f1f1f1',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default SliderInput
