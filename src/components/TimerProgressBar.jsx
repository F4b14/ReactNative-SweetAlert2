import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

export default function TimerProgressBar({ timer, color = '#7066e0' }) {
  const [progress] = useState(new Animated.Value(1))

  useEffect(() => {
    if (!timer || timer <= 0) return

    Animated.timing(progress, {
      toValue: 0,
      duration: timer,
      useNativeDriver: false,
    }).start()

    return () => {
      progress.stopAnimation()
    }
  }, [timer])

  if (!timer) return null

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width, backgroundColor: color }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 12,
  },
  bar: {
    height: '100%',
    borderRadius: 2,
  },
})
