import React from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { CHALLENGES } from '../../fakeData';
import ChallengeRow from '../challenges/ChallengeRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ChallengesScene extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(CHALLENGES),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ChallengeRow data={rowData} />}
        />
      </View>
    );
  }
}
