import { useRef } from "react";

function useDebounceEvent() {
  const lastestRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function takeLastestEvent(fn: Function, time: number) {
    if (lastestRef.current) {
      clearTimeout(lastestRef.current);
    }

    lastestRef.current = setTimeout(() => {
      fn();
      lastestRef.current = null;
    }, time);
  }

  return {
    takeLastestEvent,
    takeFirstEvent,
  };

  function takeFirstEvent(fn: Function, time: number) {}
}

export default useDebounceEvent;
