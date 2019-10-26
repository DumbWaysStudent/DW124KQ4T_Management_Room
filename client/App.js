import React from "react";
import { Icon } from "native-base";
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



import store from './src/_redux/store';



import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import MainScreen from './src/screens/MainScreen';



const MainNavigator = createAppContainer(createMaterialBottomTabNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions:({navigation})=>{
      let obj = {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="tablet" style={{color: tintColor}} />
        ),
        headerTransparent: true,
        headerLeft: null
      };
      return obj
    }
  }
},{
  labeled: false,
  activeColor: '#ecf0f1',
  inactiveColor: '#bdc3c7',
  barStyle: { backgroundColor: '#2980b9' },
}));




const RootNavigation = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Login: {
      screen: LoginScreen,
      navigationOptions:{
        headerTransparent: true
      }
    },
    Main: MainNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App;
console.disableYellowBox = true;