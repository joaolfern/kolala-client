/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IEvent } from './Models/Event'

export namespace ImagePicker {
  export interface ImagePickerMultipleResult {
    uri: string
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  EventDetails: {
    preview: {
      id: number
      title: string
    }
  }
  NotFound: undefined
  EventForm?: {
    event: IEvent.Details
  }
  Profile: {
    profileUserId: number
  }
  Events: undefined
  FiltersMenu: undefined
  MapToast: undefined
  Chat: {
    event: IEvent.ListItem
  }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Maps: undefined
  Profile: {
    profileUserId: number
  }
  Events: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
