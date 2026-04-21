import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ICON_CONFIG = {
  success: { symbol: '✓', color: '#a5dc86', border: '#a5dc86', background: '#edf8e9' },
  error: { symbol: '✕', color: '#f27474', border: '#f27474', background: '#fde8e8' },
  warning: { symbol: '!', color: '#f8bb86', border: '#f8bb86', background: '#fef5e7' },
  info: { symbol: 'i', color: '#3fc3ee', border: '#3fc3ee', background: '#e8f6fd' },
  question: { symbol: '?', color: '#87adbd', border: '#87adbd', background: '#eef4f8' },
}

export default function Icon({ icon, iconColor }) {
  if (!icon || !ICON_CONFIG[icon]) return null

  const config = ICON_CONFIG[icon]
  const borderColor = iconColor || config.border
  const symbolColor = iconColor || config.color

  return (
    <View style={[styles.container, { borderColor, backgroundColor: config.background }]}>
      <Text style={[styles.symbol, { color: symbolColor }]}>{config.symbol}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  symbol: {
    fontSize: 42,
    fontWeight: 'bold',
    lineHeight: 50,
    textAlign: 'center',
  },
})
