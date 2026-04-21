import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native'

export default function InputField({ params, onValueChange, validationMessage }) {
  const {
    input,
    inputLabel,
    inputPlaceholder,
    inputValue,
    inputOptions,
    inputAttributes: rawInputAttributes = {},
    inputAutoFocus,
  } = params

  // Strip props that could override security-sensitive TextInput behaviour
  const {
    secureTextEntry: _secureTextEntry,
    onChangeText: _onChangeText,
    value: _value,
    onChange: _onChange,
    ...safeInputAttributes
  } = rawInputAttributes

  const [localValue, setLocalValue] = useState(
    inputValue !== undefined ? String(inputValue) : ''
  )
  const [selectedRadio, setSelectedRadio] = useState(inputValue || '')
  const [checkboxChecked, setCheckboxChecked] = useState(Boolean(inputValue))

  const handleTextChange = (val) => {
    setLocalValue(val)
    onValueChange(val)
  }

  const handleRadioSelect = (val) => {
    setSelectedRadio(val)
    onValueChange(val)
  }

  const handleCheckboxChange = (val) => {
    setCheckboxChecked(val)
    onValueChange(val)
  }

  const handleSelectPress = (val) => {
    onValueChange(val)
  }

  if (!input) return null

  const textInputTypes = ['text', 'email', 'password', 'number', 'tel', 'url', 'textarea']

  return (
    <View style={styles.container}>
      {!!inputLabel && <Text style={styles.label}>{inputLabel}</Text>}

      {textInputTypes.includes(input) && (
        <TextInput
          style={[styles.input, input === 'textarea' && styles.textarea]}
          placeholder={inputPlaceholder}
          value={localValue}
          onChangeText={handleTextChange}
          secureTextEntry={input === 'password'}
          keyboardType={
            input === 'email'
              ? 'email-address'
              : input === 'number'
              ? 'numeric'
              : input === 'tel'
              ? 'phone-pad'
              : input === 'url'
              ? 'url'
              : 'default'
          }
          multiline={input === 'textarea'}
          numberOfLines={input === 'textarea' ? 4 : 1}
          autoFocus={inputAutoFocus}
          autoCapitalize="none"
          {...safeInputAttributes}
        />
      )}

      {input === 'select' && (
        <ScrollView style={styles.selectContainer}>
          {Object.entries(inputOptions).map(([value, label]) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.selectOption,
                localValue === value && styles.selectOptionActive,
              ]}
              onPress={() => {
                setLocalValue(value)
                handleSelectPress(value)
              }}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  localValue === value && styles.selectOptionTextActive,
                ]}
              >
                {String(label)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {input === 'radio' && (
        <View>
          {Object.entries(inputOptions).map(([value, label]) => (
            <TouchableOpacity
              key={value}
              style={styles.radioOption}
              onPress={() => handleRadioSelect(value)}
            >
              <View style={[styles.radioCircle, selectedRadio === value && styles.radioCircleActive]}>
                {selectedRadio === value && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{String(label)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {input === 'checkbox' && (
        <View style={styles.checkboxRow}>
          <Switch value={checkboxChecked} onValueChange={handleCheckboxChange} />
          {!!inputPlaceholder && (
            <Text style={styles.checkboxLabel}>{inputPlaceholder}</Text>
          )}
        </View>
      )}

      {!!validationMessage && (
        <Text style={styles.validationMessage}>{validationMessage}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#545454',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#545454',
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  selectContainer: {
    maxHeight: 160,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 6,
  },
  selectOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectOptionActive: {
    backgroundColor: '#e8e6f9',
  },
  selectOptionText: {
    fontSize: 15,
    color: '#545454',
  },
  selectOptionTextActive: {
    color: '#7066e0',
    fontWeight: '600',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#acb4c8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioCircleActive: {
    borderColor: '#7066e0',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7066e0',
  },
  radioLabel: {
    fontSize: 15,
    color: '#545454',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: '#545454',
  },
  validationMessage: {
    marginTop: 6,
    fontSize: 13,
    color: '#f27474',
  },
})
