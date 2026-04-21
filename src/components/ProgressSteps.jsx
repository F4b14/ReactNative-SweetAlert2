import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ProgressSteps({ steps, currentStep }) {
  if (!steps || steps.length === 0) return null

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isPast = index < currentStep
        return (
          <React.Fragment key={index}>
            {index > 0 && <View style={[styles.line, isPast && styles.linePast]} />}
            <View style={[styles.step, (isActive || isPast) && styles.stepActive]}>
              <Text style={[styles.stepText, (isActive || isPast) && styles.stepTextActive]}>
                {step}
              </Text>
            </View>
          </React.Fragment>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  step: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#acb4c8',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    borderColor: '#7066e0',
    backgroundColor: '#7066e0',
  },
  stepText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#acb4c8',
  },
  stepTextActive: {
    color: '#fff',
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: '#acb4c8',
  },
  linePast: {
    backgroundColor: '#7066e0',
  },
})
