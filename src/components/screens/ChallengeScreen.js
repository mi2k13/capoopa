import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
//
import { renderRemainingDays } from './../../utils/date';
//
import Colors from '../../static/style/Colors';
import Layout from '../../static/style/Layout';
import Typography from '../../static/style/Typography';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.gapSmall,
    backgroundColor: '#FFF',
  },
  summary: {
    fontSize: 18,
    lineHeight: 28,
  },
  subtitle: {
    marginTop: Layout.gapSmall,
    fontSize: Typography.small,
    color: Colors.dustyGray,
  },
});

class ChallengeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.data.title}`,
  });

  renderType(type) {
    switch (type) {
      case 1: return 'Que le meilleur gagne';
      case 2: return 'Le premier arriver gagne';
      default: return 'Que le meilleur gagne';
    }
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>
          {data.summary}
        </Text>
        <Text style={styles.subtitle}>
          {this.renderType(data.type)} · {renderRemainingDays(data.dateEnd)}
        </Text>
      </View>
    );
  }
}

ChallengeScreen.propTypes = {
  navigation: React.PropTypes.any,
};

export default ChallengeScreen;
