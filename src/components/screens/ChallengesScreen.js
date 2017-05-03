import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';
//
import { CHALLENGES } from '../../fakeData';
//
import ChallengeRow from '../challenges/ChallengeRow';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

class ChallengesScreen extends React.Component {
  static navigationOptions = {
    title: 'Challenges',
  };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(CHALLENGES),
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ChallengeRow data={rowData} navigation={navigation}/>}
        />
      </View>
    );
  }
}

export default ChallengesScreen;
