import EventEmitter from './utils/EventEmitter.js'
import { DismissReason } from './utils/DismissReason.js'

export const emitter = new EventEmitter()

/**
 * SimpleReactNativeAlerts.
 * Use SimpleAlerts.fire() to display alerts from anywhere in your app,
 * as long as <SimpleAlertProvider> wraps your root component.
 */
const SimpleAlerts = {
  /**
   * Display an alert dialog.
   *
   * @param {string | AlertOptions} titleOrOptions
   * @param {string} [text]
   * @param {string} [icon]
   * @returns {Promise<AlertResult>}
   */
  fire(titleOrOptions, text, icon) {
    let params
    if (typeof titleOrOptions === 'string') {
      params = { title: titleOrOptions, text, icon }
    } else {
      params = titleOrOptions
    }

    return new Promise((resolve) => {
      emitter.emit('show', { params, resolve })
    })
  },

  /**
   * Close the currently open dialog programmatically.
   */
  close() {
    emitter.emit('close')
  },

  /**
   * Check whether a dialog is currently visible.
   * @returns {Promise<boolean>}
   */
  isVisible() {
    return new Promise((resolve) => {
      emitter.emit('isVisible', { callback: resolve })
    })
  },

  /**
   * Create a new instance with pre-set default options (mixin).
   * @param {AlertOptions} mixinParams
   * @returns {typeof SimpleAlerts}
   */
  mixin(mixinParams) {
    return {
      ...SimpleAlerts,
      fire(titleOrOptions, text, icon) {
        let params
        if (typeof titleOrOptions === 'string') {
          params = { title: titleOrOptions, text, icon }
        } else {
          params = titleOrOptions
        }
        return SimpleAlerts.fire(Object.assign({}, mixinParams, params))
      },
    }
  },

  DismissReason,
}

export default SimpleAlerts
