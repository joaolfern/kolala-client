import { useRef } from 'react'

function useDebounceEffect() {
  const lastestRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function takeLastestEvent(fn: () => void, time: number) {
    if (lastestRef.current) {
      clearTimeout(lastestRef.current)
    }

    lastestRef.current = setTimeout(() => {
      fn()
      lastestRef.current = null
    }, time)
  }

  return {
    takeLastestEvent,
  }
}

export default useDebounceEffect
