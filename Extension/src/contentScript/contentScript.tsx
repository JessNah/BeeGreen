import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getStoredOptions, LocalStorageOptions, getCurrentStore } from '../utils/storage'
import { Messages, SupportedSites } from '../utils/constants'
import './contentScript.scss'
import SideTab from '../components/SideTab/SideTab'
import CheckoutContainer from "../containers/CheckoutContainer"
import ItemContainer from "../containers/ItemContainer"

interface AppProps {
  //TODO
}

interface AppState {
  options: {[key:string]: any} | null,
  isEnabled: boolean,
  isActive: boolean,
  itemState: boolean,
  checkoutState: boolean,
  currentStore: string,
  isPermissionGranted: boolean,
  startScenarioSquence: boolean
}

class App extends Component<AppProps, AppState> {
  state = {
    startScenarioSquence: false,
    options: null,
    isEnabled: false, //enabled from options
    isActive: true, //enabled from extention popup - if previously dismissed by user
    itemState: false,
    checkoutState: false,
    isPermissionGranted: false,
    currentStore: null
  }
  commonObserver:MutationObserver = null;

  componentWillUnmount() {
     // clean up event listener
     chrome.runtime.onMessage.removeListener(this.handleMessages)
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessages)
    getStoredOptions().then((options) => {
      this.setState({options: options, isEnabled: options.hasAutoOverlay});
    })
    getCurrentStore().then((store) => {
      this.setState({currentStore: store});
      this.handleStoreSpecificDidMount(store);
    })
  }

  handleStoreSpecificDidMount = (store) => {
    switch(store){
      case SupportedSites.INSTACART:
        //for instacart site, plugin to their view cart button
        //add event listener for on click so if triggered means cart is opened and in view to user
        const pageButtons = document.getElementsByTagName('button');
        for(let i = 0; i < pageButtons.length; i++) {
        if(pageButtons[i].getAttribute("aria-label") && 
          pageButtons[i].getAttribute("aria-label").toLocaleLowerCase().includes("view cart")) {
            pageButtons[i].addEventListener("click", () => {
              this.handleMessages(Messages.ENABLE_CHECKOUT_STATE);
              this.onInstaCartEnableCheckoutMode(pageButtons[i]);})
            break;
          }
        }
        return;
      case SupportedSites.APPLESTORE:
        return;
      case SupportedSites.AMAZON:
        return;
      default:
        return;
    }
  }

  onInstaCartEnableCheckoutMode = (defaultPageCheckoutCartDiv) => {
    //if cart is in view to user on instacart, tune into aria-label of view cart button to know when cart is closed.
    //goes from 'close cart' back to 'view cart' means, checkout sidepanel cart has been closed.
    this.commonObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) =>  {
        if(mutation.attributeName === "aria-label"){
          if(defaultPageCheckoutCartDiv.getAttribute("aria-label").toLocaleLowerCase().includes("view cart")){
            this.commonObserver.disconnect();
            this.handleMessages(Messages.DISABLE_CHECKOUT_STATE);
          }
        }
      });    
    });
    // Notify if style changes
    let observerConfig = {
      attributes: true, 
      attributeFilter: ["aria-label"]
    };
    this.commonObserver.observe(defaultPageCheckoutCartDiv, observerConfig);
  }

  handleMessages = (msg: Messages) => {
    if (msg === Messages.ENABLE_ITEM_STATE) {
      this.setState(prevState => {
        if(prevState.isEnabled && !prevState.itemState){
          return {itemState: true, checkoutState: false}
        } else { return null}})
    } else if (msg === Messages.DISABLE_ITEM_STATE) {
      this.setState(prevState => {
        if(prevState.itemState){
          return {itemState: false}
        } else { return null}})
    } else if (msg === Messages.ENABLE_CHECKOUT_STATE) {
      this.setState(prevState => {
        if(prevState.isEnabled && !prevState.checkoutState){
          return {checkoutState: true}
        } else { return null}})
    } else if (msg === Messages.DISABLE_CHECKOUT_STATE) {
      this.setState(prevState => {
        if(prevState.checkoutState){
          return {checkoutState: false}
        } else { return null}})
    } else if (msg === Messages.ACTIVATE_APP) {
      this.setState(prevState => {
        return {isActive: true}
      })
    }
  }

  render() {
    if (!this.state.options || !this.state.isActive) {
      return null
    }
    //temp console logs
    !this.state.itemState && console.log("not show item state");
    this.state.itemState && console.log("show item state");
    !this.state.checkoutState && console.log("not show checkout state");
    this.state.checkoutState && console.log("show checkout state");
    return (
      <>
        {(this.state.itemState || this.state.checkoutState) && 
          <SideTab 
            onClick={() => {this.setState({startScenarioSquence: true})}}
            onClose={() => {this.setState({isActive: false})}}/>
        }
        {(this.state.startScenarioSquence && (this.state.checkoutState || this.state.itemState)) ?
          (this.state.checkoutState ? 
            <CheckoutContainer
              currentStore={this.state.currentStore}
              isPermissionGranted={this.state.isPermissionGranted}
              setPermission={() => {this.setState({isPermissionGranted: true})}}
              endCheckoutSequence={() => {this.setState({startScenarioSquence: false})}}
            />
          : <ItemContainer
              endItemSequence={() => {this.setState({startScenarioSquence: false})}}
            />
          ) : null
        }
      </>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
