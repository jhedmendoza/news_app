import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/Home.js';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options ={{title: 'Top News'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
