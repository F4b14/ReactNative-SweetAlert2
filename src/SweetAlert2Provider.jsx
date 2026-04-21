import React, { useState, useEffect, useCallback, useRef } from 'react'
import SweetAlert2Modal from './components/SweetAlert2Modal.jsx'
import { emitter } from './Swal.js'
import { defaultParams } from './utils/params.js'

/**
 * Wrap your app's root component with SweetAlert2Provider to enable
 * Swal.fire() calls from anywhere in your application.
 *
 * @example
 * export default function App() {
 *   return (
 *     <SweetAlert2Provider>
 *       <YourApp />
 *     </SweetAlert2Provider>
 *   )
 * }
 */
export default function SweetAlert2Provider({ children }) {
  const [visible, setVisible] = useState(false)
  const [params, setParams] = useState({})
  const resolveRef = useRef(null)
  const queueRef = useRef([])
  const isShowingRef = useRef(false)

  const showNext = useCallback(() => {
    if (queueRef.current.length === 0) {
      isShowingRef.current = false
      return
    }

    const { mergedParams, resolve } = queueRef.current.shift()
    isShowingRef.current = true
    resolveRef.current = resolve
    setParams(mergedParams)
    setVisible(true)
  }, [])

  useEffect(() => {
    const handleShow = ({ params: userParams, resolve }) => {
      const mergedParams = Object.assign({}, defaultParams, userParams)

      if (isShowingRef.current) {
        queueRef.current.push({ mergedParams, resolve })
      } else {
        isShowingRef.current = true
        resolveRef.current = resolve
        setParams(mergedParams)
        setVisible(true)
      }
    }

    const handleClose = () => {
      setVisible(false)
      if (resolveRef.current) {
        resolveRef.current({ isDismissed: true, isConfirmed: false, isDenied: false })
        resolveRef.current = null
      }
      isShowingRef.current = false
      showNext()
    }

    const handleIsVisible = ({ callback }) => {
      callback(isShowingRef.current)
    }

    emitter.on('show', handleShow)
    emitter.on('close', handleClose)
    emitter.on('isVisible', handleIsVisible)

    return () => {
      emitter.removeListener('show', handleShow)
      emitter.removeListener('close', handleClose)
      emitter.removeListener('isVisible', handleIsVisible)
    }
  }, [showNext])

  const handleClose = useCallback(
    (result) => {
      setVisible(false)
      if (resolveRef.current) {
        resolveRef.current(result)
        resolveRef.current = null
      }
      isShowingRef.current = false
      setTimeout(showNext, 300)
    },
    [showNext]
  )

  return (
    <>
      {children}
      <SweetAlert2Modal visible={visible} params={params} onClose={handleClose} />
    </>
  )
}
