import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import {
  resetToast,
  updateShouldShowToast,
  updateToastPresence,
  useMapFilter,
} from '../../store/mapFilterSlice'
import Span from '../Span/Span'
import Text from '../Text/Text'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

interface IProps {}

function MapToast({}: IProps) {
  const { isGettingNewFilter, hasToastFinishedMinPresence } = useMapFilter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dispatch = useDispatch()

  function handleUnmount(): void {
    dispatch(updateShouldShowToast(false))
  }

  useEffect(() => {
    if (!isGettingNewFilter && hasToastFinishedMinPresence) {
      handleUnmount()
    }
  }, [isGettingNewFilter, hasToastFinishedMinPresence])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      dispatch(resetToast())
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      timerRef.current = setTimeout(() => {
        dispatch(updateToastPresence(true))
      }, 1000)
    }, [])
  )

  return (
    <Animated.View
      style={styles.Toast}
      exiting={SlideOutRight}
      entering={SlideInRight}
    >
      <Span style={styles.Header}>
        <ActivityIndicator size={25} color={Colors.primaryColor} />
        <Text style={styles.Title}>Procurando...</Text>
      </Span>
    </Animated.View>
  )
}

export default MapToast

const styles = StyleSheet.create({
  Toast: {
    backgroundColor: Colors.altBlack,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    width: '80%',
    zIndex: 2,
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 120,
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  Header: {
    flexDirection: 'row',
  },
  Title: {
    color: Colors.primaryColor,
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
