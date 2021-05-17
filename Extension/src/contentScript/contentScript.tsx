import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getStoredOptions, LocalStorageOptions } from '../utils/storage'
import { Messages } from '../utils/messages'
import './contentScript.css'

interface AppProps {
  //TODO
}

interface AppState {
  options: {[key:string]: any} | null,
  isCheckout: boolean,
  isEnabled: boolean,
  isActive: boolean,
  showItemDialog: boolean
}

class App extends Component<AppProps, AppState> {
  state = {
    options: null,
    isCheckout: true,
    isEnabled: false,
    isActive: false,
    showItemDialog: false
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessages)
    getStoredOptions().then((options) => {
      console.log("contentScript received options:")
      console.log(options);
      this.setState({options: options, isEnabled: options.hasAutoOverlay});
    })
  }

  componentWillUnmount() {
     // clean up event listener
     chrome.runtime.onMessage.removeListener(this.handleMessages)
  }

  handleMessages = (msg: Messages) => {
    console.log("received message: " + msg);
    if (msg === Messages.ENABLE_OVERLAY) {
      this.setState(prevState => {
        if(prevState.isEnabled && !prevState.isActive){
          return {isActive: true}
        } else { return null}})
    } else if (msg === Messages.DISABLE_OVERLAY) {
      this.setState(prevState => {
        if(prevState.isActive){
          return {isActive: false}
        } else { return null}})
    } else if (msg === Messages.SET_IS_CHECKOUT) {
      this.setState(prevState => {
        if(!prevState.isCheckout){
          return {isCheckout: true}
        } else { return null}})
    } else if (msg === Messages.SET_IS_NOT_CHECKOUT) {
      this.setState(prevState => {
        if(prevState.isCheckout){
          return {isCheckout: false}
        } else { return null}})
    }
  }

  render() {
    if (!this.state.options) {
      return null
    }
    this.state.isActive && console.log("contentScript is in the active state");
    return (
      <>
        {this.state.isActive && (
          <div>Active dom element</div>
        )}
      </>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
