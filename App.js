import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile'

const Stack = createStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login">
            {props => <Login {...props}/>}
           </Stack.Screen>
           <Stack.Screen name="Signup">
            {props => <Signup {...props}/>}
           </Stack.Screen>
           <Stack.Screen name="Profile">
            {props => <Profile {...props}/>}
           </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App;