import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const ItemDialog: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  // useEffect(() => {
  //   getStoredOptions().then((options) => {
  //     console.log("contentScript received options:")
  //     console.log(options);
  //     setOptions(options)
  //     setIsEnabled(options.hasAutoOverlay)
  //   })
  // }, [])

  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener(handleMessages)
  //   return () => {
  //     // clean up event listener
  //     chrome.runtime.onMessage.removeListener(handleMessages)
  //   }
  // })

  const togglePage = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <div>dialog</div>
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<ItemDialog />, root)
