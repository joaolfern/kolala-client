/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/Home';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Text from '../text/text'

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Maps"
      screenOptions={{
        headerTintColor: Colors.primaryColor,
        tabBarActiveTintColor: Colors.primaryColor,
        headerStyle: { backgroundColor: Colors.background, shadowColor: "transparent" },
      }}>
      {/* <BottomTab.Screen
        name="Feed"
        component={TabTwoScreen}
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Maps"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'Maps'>) => ({
          title: Text['pt-BR'].navigation.bottomTab.map.title,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />
        })}
      />
      {/* <BottomTab.Screen
        name="Hangs"
        component={TabTwoScreen}
        options={{
          title: 'Meus Rolês',
          tabBarIcon: ({ color }) => <TabBarIcon name="walking" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}
