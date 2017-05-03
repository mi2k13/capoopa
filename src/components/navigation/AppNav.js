import { TabNavigator } from 'react-navigation';
//
import ChallengesNav from './../navigation/ChallengesNav';
import FriendsScreen from './../screens/FriendsScreen';
import ProfileScreen from './../screens/ProfileScreen';

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
  tabBarPosition: 'top',
  animationEnabled: false,
  swipeEnabled: false,
});

export default AppNav;
