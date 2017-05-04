import React from 'react';
import { TabNavigator } from 'react-navigation';
//
import ChallengesNav from './../navigation/ChallengesNav';
import FriendsScreen from './../screens/FriendsScreen';
import ProfileScreen from './../screens/ProfileScreen';
import Icon from './../UI/Icon';
//
import Colors from './../../static/style/Colors';

const AppNav = TabNavigator({
  Challenges: {
    screen: ChallengesNav,
    path: '/',
    navigationOptions: {
      tabBarLabel: 'Défis',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          width={24}
          height={24}
          viewBox="0 0 24 24"
          name="trophy"
          fill={tintColor}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    path: '/profile',
    navigationOptions: {
      tabBarLabel: 'Profil',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          width={24}
          height={24}
          viewBox="0 0 24 24"
          name="user"
          fill={tintColor}
        />
      ),
    },
  },
  Friends: {
    screen: FriendsScreen,
    path: '/friends',
    navigationOptions: {
      tabBarLabel: 'Amis',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          width={24}
          height={24}
          viewBox="0 0 24 24"
          name="community"
          fill={tintColor}
        />
      ),
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: Colors.brand,
    inactiveTintColor: '#333333',
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
