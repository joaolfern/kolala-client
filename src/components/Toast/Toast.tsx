import { ToastRef } from '@/utils/toast'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native'

const DURATION = {
  LENGTH_SHORT: 2000,
  FOREVER: 0,
}

const Toast = React.forwardRef<ToastRef | undefined, unknown>((_, ref) => {
  const { height } = useWindowDimensions()

  const [isShow, setShow] = useState<boolean>(false)
  const [toastText, setToastText] = useState<string>('')
  const opacityValue = useRef<Animated.Value>(new Animated.Value(1)).current
  let animation: Animated.CompositeAnimation | null = null
  let timer: NodeJS.Timeout | null = null
  let isShowing: boolean = false

  useEffect(() => {
    return () => {
      if (animation) animation.stop()
      if (timer) clearTimeout(timer)
    }
  }, [animation, timer])

  useImperativeHandle(ref, () => ({
    show: (text: string) => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(text, ToastAndroid.SHORT)
      } else {
        show(text)
      }
    },
  }))

  const show = (text: string) => {
    setShow(true)
    setToastText(text)

    animation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    })
    animation.start(() => {
      isShowing = true
      close()
    })
  }

  const close = () => {
    const delay = DURATION.LENGTH_SHORT

    if (!isShowing && !isShow) {
      return
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      animation = Animated.timing(opacityValue, {
        toValue: 0.0,
        duration: 500,
        useNativeDriver: true,
      })
      animation.start(() => {
        setShow(false)
        isShowing = false
      })
    }, delay)
  }

  return (
    <>
      {isShow && Platform.OS !== 'android' && (
        <View
          style={[styles.container, { top: height - 120 }]}
          pointerEvents='none'
        >
          <Animated.View style={[styles.content, { opacity: opacityValue }]}>
            <Text style={styles.text}>{toastText}</Text>
          </Animated.View>
        </View>
      )}
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 10,
    bottom: 64,
    maxWidth: '80%',
  },
  text: {
    fontSize: 14,
    color: '#f8f8f8',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})

export default Toast
