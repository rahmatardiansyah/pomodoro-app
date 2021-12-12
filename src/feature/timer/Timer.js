import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from "react-native-paper";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

export const Timer = ({ focusSubject }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const onProgress = (progress) => {
        setProgress(progress)
    }
    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown isPaused={!isStarted} onProgress={onProgress} />
            </View>
                <ProgressBar color={colors.orange} progress={progress} style={{height: 10}}/>
            <View style={{ paddingTop: spacing.xxl }}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                {isStarted ? (
                    <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
                ) : (
                    <RoundedButton title="start" onPress={() => setIsStarted(true)} />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: colors.white,
        textAlign: "center"
    },
    task: {
        color: colors.red,
        fontWeight: "bold",
        textAlign: "center"
    },
    countdown: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        flex: 0.5,
        padding: spacing.md,
        justifyContent: "center",
        alignItems: "center"
    }
})