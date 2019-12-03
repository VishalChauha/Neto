/**
 * @format
 */

import {AppRegistry} from 'react-native';
import SplashScreen from "./src/Screens/SplashScreen";
import {name as appName} from './app.json';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => SplashScreen);
