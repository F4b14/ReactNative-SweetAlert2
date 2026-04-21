import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native'
import Icon from './Icon.jsx'
import InputField from './InputField.jsx'
import ProgressSteps from './ProgressSteps.jsx'
import TimerProgressBar from './TimerProgressBar.jsx'
import Timer from '../utils/Timer.js'
import { DismissReason } from '../utils/DismissReason.js'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// Only allow safe remote URI schemes for images
const SAFE_IMAGE_URI_RE = /^https?:\/\//i

export default function SimpleAlertModal({ visible, params, onClose }) {
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(null) // 'confirm' | 'deny'
  const [inputValue, setInputValue] = useState(params.inputValue || '')
  const [validationMessage, setValidationMessage] = useState(params.validationMessage || '')
  const timerRef = useRef(null)

  // Reset state when new alert opens
  useEffect(() => {
    if (visible) {
      setLoading(false)
      setLoadingButton(null)
      setInputValue(params.inputValue !== undefined ? String(params.inputValue) : '')
      setValidationMessage(params.validationMessage || '')

      if (typeof params.didOpen === 'function') {
        params.didOpen()
      }

      // Setup auto-close timer
      if (params.timer) {
        timerRef.current = new Timer(() => {
          onClose({ isDismissed: true, isConfirmed: false, isDenied: false, dismiss: DismissReason.timer })
        }, params.timer)
      }
    }

    return () => {
      if (timerRef.current) {
        timerRef.current.stop()
        timerRef.current = null
      }
    }
  }, [visible, params])

  // Android back button
  useEffect(() => {
    if (!visible) return

    const onBackPress = () => {
      if (params.allowBackHandler !== false) {
        handleDismiss(DismissReason.esc)
        return true
      }
      return true
    }

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => sub.remove()
  }, [visible, params])

  const handleDismiss = useCallback(
    (reason) => {
      if (typeof params.willClose === 'function') params.willClose()
      onClose({ isDismissed: true, isConfirmed: false, isDenied: false, dismiss: reason })
      if (typeof params.didClose === 'function') params.didClose()
    },
    [params, onClose]
  )

  const handleOutsidePress = useCallback(() => {
    if (params.allowOutsideClick !== false) {
      handleDismiss(DismissReason.backdrop)
    }
  }, [params, handleDismiss])

  const runPreHook = async (hook, value) => {
    if (typeof hook !== 'function') return { ok: true, value }
    const result = await hook(value)
    if (result === false) return { ok: false }
    return { ok: true, value: result !== undefined ? result : value }
  }

  const handleConfirm = async () => {
    const value = params.input ? inputValue : undefined

    if (params.input) {
      const validator = params.inputValidator
      if (typeof validator === 'function') {
        const msg = await validator(value)
        if (msg) {
          setValidationMessage(msg)
          return
        }
      }
    }

    if (params.showLoaderOnConfirm) {
      setLoading(true)
      setLoadingButton('confirm')
    }

    try {
      const { ok, value: returnValue } = await runPreHook(params.preConfirm, value)
      if (!ok) {
        setLoading(false)
        setLoadingButton(null)
        return
      }

      if (typeof params.willClose === 'function') params.willClose()
      onClose({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
        value: returnValue !== undefined ? returnValue : value,
      })
      if (typeof params.didClose === 'function') params.didClose()
    } catch (err) {
      setLoading(false)
      setLoadingButton(null)
      throw err
    }
  }

  const handleDeny = async () => {
    const value = params.returnInputValueOnDeny ? inputValue : undefined

    if (params.showLoaderOnDeny) {
      setLoading(true)
      setLoadingButton('deny')
    }

    try {
      const { ok, value: returnValue } = await runPreHook(params.preDeny, value)
      if (!ok) {
        setLoading(false)
        setLoadingButton(null)
        return
      }

      if (typeof params.willClose === 'function') params.willClose()
      onClose({
        isConfirmed: false,
        isDenied: true,
        isDismissed: false,
        value: returnValue !== undefined ? returnValue : value,
      })
      if (typeof params.didClose === 'function') params.didClose()
    } catch (err) {
      setLoading(false)
      setLoadingButton(null)
      throw err
    }
  }

  const handleCancel = () => {
    handleDismiss(DismissReason.cancel)
  }

  if (!visible) return null

  const isToast = params.toast === true
  const popupWidth = params.width || (isToast ? SCREEN_WIDTH * 0.9 : Math.min(SCREEN_WIDTH * 0.85, 500))

  const buttons = [
    params.showConfirmButton !== false && (
      <TouchableOpacity
        key="confirm"
        style={[
          styles.button,
          styles.confirmButton,
          params.confirmButtonColor ? { backgroundColor: params.confirmButtonColor } : null,
          params.customConfirmButtonStyle,
          loadingButton === 'confirm' && styles.buttonLoading,
        ]}
        onPress={handleConfirm}
        disabled={loading}
      >
        {loadingButton === 'confirm' ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{params.confirmButtonText || 'OK'}</Text>
        )}
      </TouchableOpacity>
    ),
    params.showDenyButton && (
      <TouchableOpacity
        key="deny"
        style={[
          styles.button,
          styles.denyButton,
          params.denyButtonColor ? { backgroundColor: params.denyButtonColor } : null,
          params.customDenyButtonStyle,
          loadingButton === 'deny' && styles.buttonLoading,
        ]}
        onPress={handleDeny}
        disabled={loading}
      >
        {loadingButton === 'deny' ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{params.denyButtonText || 'No'}</Text>
        )}
      </TouchableOpacity>
    ),
    params.showCancelButton && (
      <TouchableOpacity
        key="cancel"
        style={[
          styles.button,
          styles.cancelButton,
          params.cancelButtonColor ? { backgroundColor: params.cancelButtonColor } : null,
          params.customCancelButtonStyle,
        ]}
        onPress={handleCancel}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{params.cancelButtonText || 'Cancel'}</Text>
      </TouchableOpacity>
    ),
  ].filter(Boolean)

  const orderedButtons = params.reverseButtons ? [...buttons].reverse() : buttons

  const popupContent = (
    <View
      style={[
        isToast ? styles.toast : styles.popup,
        { width: popupWidth },
        params.background ? { backgroundColor: params.background } : null,
        params.padding !== undefined ? { padding: params.padding } : null,
        params.customPopupStyle,
      ]}
    >
      {params.showCloseButton && (
        <TouchableOpacity style={styles.closeButton} onPress={() => handleDismiss(DismissReason.close)}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      )}

      {params.progressSteps && params.progressSteps.length > 0 && (
        <ProgressSteps
          steps={params.progressSteps}
          currentStep={params.currentProgressStep ?? 0}
        />
      )}

      {params.icon && <Icon icon={params.icon} iconColor={params.iconColor} />}

      {!!params.imageUrl && SAFE_IMAGE_URI_RE.test(params.imageUrl) && (
        <Image
          source={{ uri: params.imageUrl }}
          style={[
            styles.image,
            params.imageWidth ? { width: params.imageWidth } : null,
            params.imageHeight ? { height: params.imageHeight } : null,
          ]}
          accessibilityLabel={params.imageAlt}
          resizeMode="contain"
        />
      )}

      {!!params.title && (
        <Text
          style={[
            styles.title,
            params.color ? { color: params.color } : null,
            params.customTitleStyle,
          ]}
        >
          {params.title}
        </Text>
      )}

      {!!params.text && (
        <Text
          style={[
            styles.text,
            params.color ? { color: params.color } : null,
            params.customTextStyle,
          ]}
        >
          {params.text}
        </Text>
      )}

      {!!params.html && (
        <Text style={[styles.text, params.color ? { color: params.color } : null]}>
          {params.html}
        </Text>
      )}

      {params.input && (
        <InputField
          params={params}
          onValueChange={setInputValue}
          validationMessage={validationMessage}
        />
      )}

      {orderedButtons.length > 0 && (
        <View style={styles.actions}>{orderedButtons}</View>
      )}

      {!!params.footer && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>{params.footer}</Text>
        </View>
      )}

      {params.timerProgressBar && params.timer && (
        <TimerProgressBar timer={params.timer} color={params.confirmButtonColor} />
      )}
    </View>
  )

  if (isToast) {
    const toastPosition = params.position || 'top'
    return (
      <Modal transparent animationType="fade" visible={visible} onRequestClose={() => {}}>
        <View style={[styles.toastOverlay, styles[`toastPosition_${toastPosition.replace('-', '_')}`]]}>
          {popupContent}
        </View>
      </Modal>
    )
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => handleDismiss(DismissReason.esc)}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={[styles.overlay, params.customContainerStyle]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                params.position === 'top' || params.position === 'top-start' || params.position === 'top-end'
                  ? styles.positionTop
                  : params.position === 'bottom'
                  ? styles.positionBottom
                  : styles.positionCenter,
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {popupContent}
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollContent: {
    flexGrow: 1,
  },
  positionCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  positionTop: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16,
  },
  positionBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#545454',
    textAlign: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#545454',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#7066e0',
  },
  denyButton: {
    backgroundColor: '#dc3545',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#acb4c8',
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#545454',
    textAlign: 'center',
  },
  // Toast styles
  toastOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toastPosition_top: {
    top: Platform.OS === 'ios' ? 60 : 40,
  },
  toastPosition_top_start: {
    top: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  toastPosition_top_end: {
    top: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  toastPosition_center: {
    top: '40%',
  },
  toastPosition_bottom: {
    bottom: 32,
  },
  toast: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
