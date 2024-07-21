import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

import Colors from "../../constants/Colors";
import { useAppDispatch } from "../../store/hooks";
import {
  resetToast,
  updateShouldShowToast,
  updateToastSuccessPresence,
  useMapFilter,
} from "../../store/mapFilterSlice";
import Span from "../Span/Span";
import Text from "../Text/Text";

interface IProps {
  children: ReactNode;
}

function MapToast({ children }: IProps) {
  const { isGettingNewFilter, hasToastFinishedSuccessPresence } =
    useMapFilter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatch = useAppDispatch();

  function handleUnmount(): void {
    dispatch(updateShouldShowToast(false));
    dispatch(updateToastSuccessPresence(false));
  }

  useEffect(() => {
    if (!isGettingNewFilter && hasToastFinishedSuccessPresence) {
      handleUnmount();
    }
  }, [isGettingNewFilter, hasToastFinishedSuccessPresence]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      dispatch(resetToast());
    };
  }, []);

  useEffect(() => {
    if (!isGettingNewFilter) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        dispatch(updateToastSuccessPresence(true));
      }, 2500);
    }
  }, [isGettingNewFilter]);

  return (
    <Animated.View
      style={styles.Toast}
      exiting={SlideOutRight}
      entering={SlideInRight}
    >
      {children}
    </Animated.View>
  );
}

interface IMapToastHeader {
  title?: ReactNode;
  loading: boolean;
  children: ReactNode;
}

function MapToastHeader({
  loading,
  title = "Procurando...",
  children,
}: IMapToastHeader) {
  return (
    <>
      <Span style={styles.Header}>
        {loading && (
          <ActivityIndicator
            style={styles.Loading}
            size={16}
            color={Colors.primaryColor}
          />
        )}
        <Text style={styles.Title}>{title}</Text>
      </Span>
      {children}
    </>
  );
}

MapToast.LoadingHeader = MapToastHeader;

const styles = StyleSheet.create({
  Toast: {
    backgroundColor: Colors.altBlack,
    position: "absolute",
    bottom: 20,
    alignSelf: "flex-end",
    width: "80%",
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
    flexDirection: "row",
    marginBottom: 10,
  },
  Title: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  Loading: {
    marginRight: 16,
  },
});

export default MapToast;
