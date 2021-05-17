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
    if (msg === Messages.ENABLE_ITEM_DIALOG) {
      this.setState(prevState => {
        if(prevState.isEnabled && !prevState.showItemDialog){
          return {showItemDialog: true, isCheckout: false}
        } else { return null}})
    } else if (msg === Messages.DISABLE_ITEM_DIALOG) {
      this.setState(prevState => {
        if(prevState.showItemDialog){
          return {showItemDialog: false, isCheckout: true}
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
    this.state.showItemDialog && console.log("show item dialog");
    !this.state.isCheckout && console.log("not is checkout");
    this.state.isCheckout && console.log("is checkout");
    return (
      <>
        {this.state.showItemDialog ? (
          <div>Show Item dialog</div>
        ) : (
          <div>Show Checkout dialog</div>
        )}
      </>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
