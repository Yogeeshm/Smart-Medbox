import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TitleScreen from './components/TitleScreen';
import AlarmListScreen from './components/AlarmListScreen';
import AlarmOptionsScreen from './components/AlarmOptionsScreen';
import PillStatus from './components/PillTaken';
import { StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <><NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Title"
            component={TitleScreen}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name="AlarmList"
            component={AlarmListScreen}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
            }}
          >
          </Stack.Screen>
          <Stack.Screen
            name="AlarmOptions"
            component={AlarmOptionsScreen}
            options={{
              headerShown: false,
            }}
          >
          </Stack.Screen>
          <Stack.Screen
            name="PillStatus"
            component={PillStatus}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
            }}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer></>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});