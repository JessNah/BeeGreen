import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getStoredOptions, LocalStorageOptions, getCurrentStore } from '../utils/storage'
import { Messages, SupportedSites } from '../utils/constants'
import './contentScript.scss'
import SideTab from '../components/SideTab/SideTab'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'

interface AppProps {
  //TODO
}

interface AppState {
  options: {[key:string]: any} | null,
  isCheckout: boolean,
  isEnabled: boolean,
  isActive: boolean,
  showItemDialog: boolean,
  showCheckoutDialog: boolean,
  currentStore: string,
  permissionGranted: boolean,
  showDialog: boolean
}

class App extends Component<AppProps, AppState> {
  state = {
    showDialog: false,
    options: null,
    isCheckout: true,
    isEnabled: false,
    isActive: false,
    showItemDialog: false,
    showCheckoutDialog: false,
    permissionGranted: false,
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
              this.handleMessages(Messages.TOGGLE_CHECKOUT_DIALOG);
              this.onInstaCartEnableCheckoutMode(pageButtons[i]);})
            break;
          }
        }
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
            this.handleMessages(Messages.TOGGLE_CHECKOUT_DIALOG);
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
    } else if (msg === Messages.TOGGLE_CHECKOUT_DIALOG) {
      this.setState(prevState => {
        return {showCheckoutDialog: !prevState.showCheckoutDialog}
      })
    }
  }

  render() {
    if (!this.state.options) {
      return null
    }
    //temp console logs
    this.state.showItemDialog && console.log("show item dialog");
    !this.state.showCheckoutDialog && console.log("not show checkout");
    this.state.showCheckoutDialog && console.log("show checkout");
    return (
      <>
        <SideTab onClick={() => {this.setState({showDialog: true})}}/>
        {this.state.showItemDialog ? (
          <div>Show Item dialog</div>
        ) : (
          this.state.showDialog ?
          <PermissionDialog
            onOK={() => {this.setState({permissionGranted: true})}}
            modalHeading={"Hi there! May we take a peek at your cart?"}
            modalSubText={"By analyzing your cart, we can evaluate it for carbon scoring and we'll try our best to help you make smarter choices."}
          />
          : null
        )}
      </>
    )
  }
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
