import { StackNavigator } from 'react-navigation';
//
import ChallengeScreen from './../screens/ChallengeScreen';
import ChallengesScreen from './../screens/ChallengesScreen';
//
import { HEADER_STYLE, HEADER_TITLE_STYLE } from './../../static/style/header';


const ChallengesNav = StackNavigator({
  Home: {
    screen: ChallengesScreen,
    path: '/',
    navigationOptions: {
      title: 'Défis',
      headerStyle: HEADER_STYLE,
      headerTitleStyle: HEADER_TITLE_STYLE,
    },
  },
  Challenge: {
    screen: ChallengeScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.data.title,
    }),
  },
});

export default ChallengesNav;
