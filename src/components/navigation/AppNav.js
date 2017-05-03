import { TabNavigator } from 'react-navigation';
//
import ChallengesNav from './../navigation/ChallengesNav';
import FriendsScreen from './../screens/FriendsScreen';
import ProfileScreen from './../screens/ProfileScreen';
//
import Colors from './../../static/style/Colors';

const AppNav = TabNavigator({
  Challenges: {
    screen: ChallengesNav,
    path: '/',
    navigationOptions: {
      tabBarLabel: 'Défis',
    },
  },
  Profile: {
    screen: ProfileScreen,
    path: '/profile',
    navigationOptions: {
      tabBarLabel: 'Profil',
    },
  },
  Friends: {
    screen: FriendsScreen,
    path: '/friends',
    navigationOptions: {
      tabBarLabel: 'Amis',
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.brand,
    inactiveTintColor: '#333333',
    labelStyle: {
      fontSize: 12,
    },
    indicatorStyle: {
      borderBottomColor: Colors.brand,
      borderBottomWidth: 1,
    },
    style: {
      backgroundColor: '#FFFFFF',
      borderTopColor: Colors.silver,
      borderTopWidth: 1,
    },
  },
});

export default AppNav;
