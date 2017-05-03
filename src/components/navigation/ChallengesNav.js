import { StackNavigator } from 'react-navigation';
//
import ChallengeScreen from './../screens/ChallengeScreen';
import ChallengesScreen from './../screens/ChallengesScreen';

const ChallengesNav = StackNavigator({
  Home: {
    screen: ChallengesScreen,
    path: '/',
    navigationOptions: {
      title: 'Défis',
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
