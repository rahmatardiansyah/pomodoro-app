import React, {useState, useEffect, useRef} from "react";
import { Text, StyleSheet} from 'react-native';
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60

const formatTime = (time) => time < 10 ? `0${time}` : time

export const Countdown = ({
    minutes = 0.1,
    isPaused,
    onProgress
}) => {
    const interval = useRef(null)
    const countDown = () => {
        setMillis((time) => {
            if(time === 0){
                // do more stuf here
                return time;
            }

            const timeLeft = time - 1000;
            onProgress(timeLeft / minutesToMillis(minutes))
            return timeLeft;
        })
    }

    useEffect(() => {
        if(isPaused){
            if(interval.current) clearInterval(interval.current)
            return;
        }
        interval.current = setInterval(countDown, 1000)

        return () => clearInterval(interval.current)
    }, [isPaused])

    const [millis, setMillis] = useState(minutesToMillis(minutes));
    const minute = Math.floor(millis / 1000 / 60 ) % 60;
    const second = Math.floor(millis / 1000 ) % 60;
    return (
        <Text style={styles.text}>{formatTime(minute)}:{formatTime(second)}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        fontWeight: "bold",
        color: colors.red,
        padding: spacing.lg,
    }
})
