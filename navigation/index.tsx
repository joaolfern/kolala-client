import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import NotFoundScreen from '../screens/NotFoundScreen'
import Home from '../screens/Home/Home'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import MyTabBar from '../components/MyTabBar/MyTabBar'
import Profile from '../screens/Profile/Profile'
import Events from '../screens/Events/Events'
import EventForm from '../screens/EventForm/EventForm'
import EventDetails from '../components/EventDetails/EventDetails'
import FiltersMenu from '../screens/FiltersMenu/FiltersMenu'
import Chat from '../screens/Chat/Chat'

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Root'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='NotFound'
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
        <Stack.Screen
          name='EventForm'
          component={EventForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Events'
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'containedTransparentModal',
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen
          name='EventDetails'
          component={EventDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={FiltersMenu}
          name='FiltersMenu'
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

type Props = NativeStackScreenProps<RootStackParamList, 'Root'>

function BottomTabNavigator({ navigation: stackNavigation }: Props) {
  return (
    <BottomTab.Navigator
      initialRouteName='Maps'
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryColor,
        header: () => null,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
        },
      }}
      tabBar={props => {
        return <MyTabBar {...props} />
      }}
    >
      <BottomTab.Screen
        name='Maps'
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Maps'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
        })}
      />
      <BottomTab.Screen
        name='Events'
        component={Events}
        options={({ navigation }: RootTabScreenProps<'Events'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name='Events' color={color} />,
        })}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name']
  color: string
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />
}
