import React from "react";
import { View, Icon } from "native-base";
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';



import store from './src/_redux/store';



import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import RoomScreen from './src/screens/RoomScreen';
import CustomerScreen from './src/screens/CustomerScreen';
import CheckinScreen from './src/screens/CheckinScreen';
import ProfileScreen from './src/screens/ProfileScreen';



const MainNavigator = createAppContainer(createMaterialBottomTabNavigator({
  Checkin: {
    screen: CheckinScreen,
    navigationOptions:({navigation})=>{
      let obj = {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="check-circle" style={{color: tintColor, fontSize: 21}} />
        ),
        headerTransparent: true,
        headerLeft: null
      };
      return obj
    }
  },
  Main: {
    screen: RoomScreen,
    navigationOptions:({navigation})=>{
      let obj = {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="bed" style={{color: tintColor, fontSize: 21}} />
        ),
        headerTransparent: true,
        headerLeft: null
      };
      return obj
    }
  },
  Customer: {
    screen: CustomerScreen,
    navigationOptions:({navigation})=>{
      let obj = {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="id-card-o" style={{color: tintColor, fontSize: 21}} />
        ),
        headerTransparent: true,
        headerLeft: null
      };
      return obj
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:({navigation})=>{
      let obj = {
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="gear" style={{color: tintColor, fontSize: 21}} />
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