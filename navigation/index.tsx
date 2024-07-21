import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type * as React from "react";

import EventDetails from "../components/EventDetails/EventDetails";
import MyTabBar from "../components/MyTabBar/MyTabBar";
import Colors from "../constants/Colors";
import EventForm from "../screens/EventForm/EventForm";
import Events from "../screens/Events/Events";
import EventsOverview from "../screens/EventsOverview/EventsOverview";
import FiltersMenu from "../screens/FiltersMenu/FiltersMenu";
import Home from "../screens/Home/Home";
import NotFoundScreen from "../screens/NotFoundScreen";
import Profile from "../screens/Profile/Profile";
import ProfileForm from "../screens/ProfileForm/ProfileForm";
import Report from "../screens/Report/Report";
import ReportForm from "../screens/ReportForm/ReportForm";
import type {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Chat from "@/screens/Chat/Chat";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="EventForm"
          component={EventForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Report}
          name="Report"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ReportForm}
          name="ReportForm"
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "containedTransparentModal",
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventsOverview"
          component={EventsOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={FiltersMenu}
          name="FiltersMenu"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ProfileForm}
          name="ProfileForm"
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, "Root">;

function BottomTabNavigator({ navigation: stackNavigation }: Props) {
  return (
    <BottomTab.Navigator
      initialRouteName="Maps"
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryColor,
        header: () => null,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
        },
      }}
      tabBar={(props) => {
        return <MyTabBar {...props} />;
      }}
    >
      <BottomTab.Screen
        name="Maps"
        component={Home}
        options={({ navigation }: RootTabScreenProps<"Maps">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Events"
        component={Events}
        options={({ navigation }: RootTabScreenProps<"Events">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="Events" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}
