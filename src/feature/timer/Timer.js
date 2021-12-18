import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from "react-native-paper";
import KeepAwake from 'react-native-keep-awake';

import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";
import { Timing } from "./Timing";

const DEFAULT_TIME = 20;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {

    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const onProgress = (progress) => {
        setProgress(progress)
    }

    const vibrate = () => {
        if(Platform.OS === 'ios'){
            const interval = setInterval(() => Vibration.vibrate(), 1000)
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(60000)
        }
    }

    const onEnd = () => {
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
        vibrate();
    }

    const changeTime = (minutes) => {
        setMinutes(minutes);
        setProgress(1);
        setIsStarted(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
            </View>
                <ProgressBar color={colors.orange} progress={progress} style={{height: 10}}/>
            <View style={{ paddingTop: spacing.xxl }}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                {isStarted ? (
                    <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
                ) : (
                    <RoundedButton title="start" onPress={() => setIsStarted(true)} />
                )}
            </View>

            <View style={styles.clearSubject}>
                <RoundedButton title="reset" size={50} onPress={() => clearSubject(false)} />
            </View>
            <KeepAwake />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: colors.white,
        textAlign: "center",
        fontSize: fontSizes.lg
    },
    task: {
        color: colors.red,
        fontSize: fontSizes.lg,
        fontWeight: "bold",
        textAlign: "center"
    },
    countdown: {
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        paddingTop: spacing.md,
        justifyContent: "center",
        alignItems: "center"
    },
    clearSubject: {
        paddingLeft: spacing.md   
    }
})