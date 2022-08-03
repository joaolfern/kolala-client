import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import NotFoundScreen from '../screens/NotFoundScreen'
import Home from '../screens/Home'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import MyTabBar from '../components/MyTabBar/MyTabBar'
import Profile from '../screens/Profile'

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
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
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
        name='Profile'
        component={Profile}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='profile' color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name='Maps'
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Maps'>) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
        })}
      />
      <BottomTab.Screen
        name='Events'
        component={Home}
        options={{
          title: 'Meus Rolês',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='walking' color={color} />
          ),
        }}
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
