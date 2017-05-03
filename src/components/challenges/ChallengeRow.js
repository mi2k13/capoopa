import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
//
import Colors from '../../static/style/Colors';
import Layout from '../../static/style/Layout';
import Typography from '../../static/style/Typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.gapSmall,
    borderTopColor: Colors.alto,
    borderTopWidth: 1,
  },
  title: {
    fontSize: Typography.medium,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Typography.small,
    color: Colors.dustyGray,
  },
});

const ChallengeRow = ({ data, navigation }) => (
  <TouchableHighlight onPress={() => navigation.navigate('Challenge', { data: data }) }>
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
  </TouchableHighlight>
);

ChallengeRow.propTypes = {
  data: React.PropTypes.object,
  navigation: React.PropTypes.object,
};

export default ChallengeRow;
