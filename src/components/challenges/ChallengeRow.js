import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
//
import { renderRemainingDays } from './../../utils/date';
//
import Icon from '../UI/Icon';
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

const ChallengeRow = ({ author, data, navigation }) => (
  <TouchableHighlight onPress={() => navigation.navigate('Challenge', { data: data }) }>
    <View style={styles.container}>
      {data.type === 1 ?
        <Icon
          name="medal"
          height={32}
          viewBox="0 0 24 24"
          width={32}
          style={{ marginRight: Layout.gapSmall }}
        /> :
        <Icon
          name="timer"
          width={32}
          height={32}
          viewBox="0 0 24 24"
          style={{ marginRight: Layout.gapSmall }}
        />
      }
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {data.title}
        </Text>
        <Text style={styles.subtitle}>
          Par {author.username} · {renderRemainingDays(data.dateEnd)}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

ChallengeRow.propTypes = {
  author: React.PropTypes.object,
  data: React.PropTypes.object,
  navigation: React.PropTypes.object,
};

export default ChallengeRow;
