import { View, Text, Easing, } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import themeReducer from './stores/themeReducer'

import {
  MainLayout,
  CourseListing,
  CourseDetail,
} from './screens'

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();

const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    }
  }
}

/* Redux Thunk middleware để xử lý các actions bất đồng bộ */
const store = createStore(
  themeReducer,
  applyMiddleware(thunk)
)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}
        >
          <Stack.Screen name='Dashboard' component={MainLayout} />
          <Stack.Screen name='CourseListing' component={CourseListing}
            options={() => options}
          />
          <Stack.Screen name='CourseDetail' component={CourseDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

