import React,{ useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Focus } from './feature/focus/Focus';
import { FocusHistory } from './feature/focus/FocusHistory';
import { colors } from './utils/colors';
import { Timer } from './feature/timer/Timer';
import { spacing } from './utils/sizes';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
}


const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status}])
  }

  const onClear = () => {
     setFocusHistory([])
  }

  return (
    <View style={styles.container}>
        {focusSubject ? (
          <Timer 
          focusSubject={focusSubject} 
          onTimerEnd={() => { 
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null)
           }} 
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}/>
        ) : (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          </>
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
