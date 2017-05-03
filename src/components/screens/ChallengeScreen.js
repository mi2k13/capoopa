import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

  parseDate(date) {
    var mdy = date.split('/');
    return new Date(mdy[2], mdy[1], mdy[0]-1);
  }

  renderRemainingDays(end) {
    var now = '03/05/2017';
    var oneDay = 1000*60*60*24;
    var remainingDays = Math.round((this.parseDate(end) - this.parseDate(now)) / oneDay);

    if (remainingDays <= 0) {
      return 'Défi terminé';
    } else if (remainingDays === 1) {
      return '1 jour restant';
    }
    return `${remainingDays} jours restants`;
  }


  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>
          {data.summary}
        </Text>
        <Text style={styles.subtitle}>
          {this.renderType(data.type)} · {this.renderRemainingDays(data.dateEnd)}
        </Text>
      </View>
    );
  }
}

ChallengeScreen.propTypes = {
  navigation: React.PropTypes.any,
};

export default ChallengeScreen;
