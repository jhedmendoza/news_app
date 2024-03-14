import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';

import RecentNewsScreen from './src/screens/RecentNews.js';
import HeaderNavigationBar from './src/components/Header.js';
import BottomNavigationBar from './src/components/Footer.js';

const Stack = createStackNavigator();

const App = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <HeaderNavigationBar />
                <BottomNavigationBar />
            </NavigationContainer>

        </PaperProvider>
    );
};

export default App;
