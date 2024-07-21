/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { IEvent } from "./Models/Event";
import type { IProfile, IProfileViewData } from "./types/Profile";

export namespace ImagePicker {
  export interface ImagePickerMultipleResult {
    uri: string;
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  EventDetails: {
    preview: {
      id: number;
      title: string;
    };
  };
  NotFound: undefined;
  EventForm?: {
    event: IEvent.Details;
  };
  Profile: {
    profileUserId: number;
  };
  ProfileForm: {
    profile: IProfileViewData;
  };
  Events: undefined;
  FiltersMenu: undefined;
  MapToast: undefined;
  Chat: {
    event: IEvent.ListItem;
  };
  Report: undefined;
  ReportForm: {
    target: IProfile;
  };
  EventsOverview: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Maps: undefined;
  Profile: {
    profileUserId: number;
  };
  Events: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ISelect<Value, Label = string> = {
  value: Value;
  label: Label;
};
