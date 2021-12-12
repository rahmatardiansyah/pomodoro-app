import React,{ useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Focus } from './feature/focus/Focus';
import { colors } from './utils/colors';
import { Timer } from './feature/timer/Timer';
import { spacing } from './utils/sizes';

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null)
  return (
    <View style={styles.container}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} />
        ) : (
          <Focus addSubject={setFocusSubject} />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    backgroundColor: colors.black,
  }
});

export default App;
