import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
  </GestureHandlerRootView>
  );
};

export default App;
