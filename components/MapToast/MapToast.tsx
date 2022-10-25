import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { useMapFilter } from '../../store/mapFilterSlice'
import Span from '../Span/Span'
import Text from '../Text/Text'

function MapToast() {
  const { isGettingNewFilter } = useMapFilter()
  const navigation = useNavigation()
  const [hasFinishedMinimumPresence, setHasFinishedMinimumPresence] =
    useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleUnmount(): void {
    navigation.goBack()
  }

  useEffect(() => {
    if (!isGettingNewFilter && hasFinishedMinimumPresence) {
      handleUnmount()
    }
  }, [isGettingNewFilter, hasFinishedMinimumPresence])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      timerRef.current = setTimeout(() => {
        setHasFinishedMinimumPresence(true)
      }, 1000)
    }, [])
  )

  return (
    <Span style={styles.Toast}>
      <Span style={styles.Header}>
        <ActivityIndicator size={25} color={Colors.primaryColor} />
        <Text style={styles.Title}>Procurando...</Text>
      </Span>
    </Span>
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
