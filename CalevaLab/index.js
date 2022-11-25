/**
 * @format
 */
import * as React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Dashboard from './screens/Dashboard';


AppRegistry.registerComponent(appName, () => App);
