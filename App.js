import React from 'react';
import { StackNavigator } from 'react-navigation';
//
import ChallengesScreen from './src/components/screens/ChallengesScreen';
import ChallengeScreen from './src/components/screens/ChallengeScreen';

const App = StackNavigator({
  Main: {screen: ChallengesScreen},
  Challenge: {screen: ChallengeScreen},
});

export default App;
