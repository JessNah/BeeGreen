import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { getStoredOptions, LocalStorageOptions } from '../utils/storage'
import { Messages } from '../utils/messages'
import './contentScript.css'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [showItemDialog, setshowItemDialog] = useState<boolean>(false)
  const [isCheckout, setIsCheckout] = useState<boolean>(true)

  useEffect(() => {
    getStoredOptions().then((options) => {
      console.log("contentScript received options:")
      console.log(options);
      setOptions(options)
      setIsEnabled(options.hasAutoOverlay)
    })
  }, [])

  const handleMessages = (msg: Messages) => {
    console.log("received message: " + msg);
    if (msg === Messages.ENABLE_OVERLAY) {
      isEnabled && !isActive && setIsActive(true)
    } else if (msg === Messages.DISABLE_OVERLAY) {
      isActive && setIsActive(false)
    } else if (msg === Messages.SET_IS_CHECKOUT) {
      !isCheckout && setIsCheckout(true)
    } else if (msg === Messages.SET_IS_NOT_CHECKOUT) {
      isCheckout && setIsCheckout(false)
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      // clean up event listener
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  })

  if (!options) {
    return null
  }
  isActive && console.log("render tag/dialog")
  return (
    <>
      {isActive && (
        <div>Active dom element</div>
      )}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
