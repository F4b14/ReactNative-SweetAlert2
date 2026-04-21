import EventEmitter from './utils/EventEmitter.js'
import { DismissReason } from './utils/DismissReason.js'

export const emitter = new EventEmitter()

/**
 * SweetAlert2 for React Native.
 * Use Swal.fire() to display alerts from anywhere in your app,
 * as long as <SweetAlert2Provider> wraps your root component.
 */
const Swal = {
  /**
   * Display a SweetAlert2 dialog.
   *
   * @param {string | SweetAlertOptions} titleOrOptions
   * @param {string} [text]
   * @param {string} [icon]
   * @returns {Promise<SweetAlertResult>}
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
   * @param {SweetAlertOptions} mixinParams
   * @returns {typeof Swal}
   */
  mixin(mixinParams) {
    return {
      ...Swal,
      fire(titleOrOptions, text, icon) {
        let params
        if (typeof titleOrOptions === 'string') {
          params = { title: titleOrOptions, text, icon }
        } else {
          params = titleOrOptions
        }
        return Swal.fire(Object.assign({}, mixinParams, params))
      },
    }
  },

  DismissReason,
}

export default Swal
