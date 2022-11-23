import React, {useState, useEffect} from 'react';
import type {Node} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';



import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './screens/Dashboard';
import Userprofile from './screens/Userprofile';
import Athletecard from './screens/Athletecard';


const App: () => Node = () => {



  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={Dashboard}/>
        <Drawer.Screen name="User Profile" component={Userprofile}/>
        <Drawer.Screen name="Athlete Card" component={Athletecard}/>
      </Drawer.Navigator>
    </NavigationContainer>


   
  );
};

export default App;

