import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  summary: {
    padding: 10,
    fontSize: 18,
    lineHeight: 28,
  },
});

class ChallengeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.data.title}`,
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.summary}>
          {params.data.summary}
        </Text>
      </View>
    );
  }
}

ChallengeScreen.propTypes = {
  navigation: React.PropTypes.any,
};

export default ChallengeScreen;
