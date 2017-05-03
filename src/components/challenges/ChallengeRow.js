import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../static/style/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: Colors.alto,
    borderTopWidth: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 11,
    color: Colors.dustyGray,
  },
});

const ChallengeRow = ({ data }) => (
  <View style={styles.container}>
    <View style={{
      backgroundColor: data.type === 1 ? 'red' : 'blue',
      marginRight: 10,
      height: 30,
      width: 30,
    }} />
    <View>
      <Text numberOfLines={2} style={styles.title}>
        {data.title}
      </Text>
      <Text style={styles.subtitle}>
        Du {data.dateStart} au {data.dateEnd}
      </Text>
    </View>
  </View>
);

ChallengeRow.propTypes = {
  data: React.PropTypes.object,
};

export default ChallengeRow;
