import React, { Component } from 'react'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'
import LoadingModal from '../components/LoadingModal/LoadingModal'
import CheckoutDialog from '../components/CheckoutDialog/CheckoutDialog'
import { messages_en } from "../messages/messages_en";
import { getCart } from "../stores/storesCommon";


interface CheckoutContainerProps {
  isPermissionGranted: boolean;
  setPermission: () => void;
  endCheckoutSequence: () => void;
  currentStore: string;
}

interface CheckoutContainerState {
  loading: boolean;
  cart: {[key:string]: any}[];
  minLoadTimePassed: boolean;
}

class CheckoutContainer extends Component<CheckoutContainerProps, CheckoutContainerState> {
  state = {
    loading: true,
    minLoadTimePassed: false,
    cart: []
  }
  timeoutLoadSim:any;

  componentWillUnmount() {
    clearTimeout(this.timeoutLoadSim);
  }

  componentDidMount() {
    if(this.props.isPermissionGranted) {
      getCart(this.props.currentStore, this.setCart);
      this.timeoutLoadSim = window.setTimeout(this.loadingSim, 2000);
    }
  }

  setCart = (cart) => {
    this.setState({loading: false, cart: cart});
  }

  loadingSim = () => {
    this.setState({minLoadTimePassed: true});
  }

  onPermissionOK = () => {
    this.props.setPermission();
    getCart(this.props.currentStore, this.setCart);
    this.timeoutLoadSim = window.setTimeout(this.loadingSim, 2000);
  }

  render() {
    return (
      <>
        { !this.props.isPermissionGranted ?
            <PermissionDialog
              onOK={() => {this.onPermissionOK()}}
              onClose={() => this.props.endCheckoutSequence()}
              modalHeading={messages_en.checkoutContainerModalHeading}
              modalSubText={messages_en.checkoutContainerModalSubText}
            />
          : ((this.state.loading || !this.state.minLoadTimePassed) ? 
              <LoadingModal
                loading={true}
                message={messages_en.checkoutContainerLoadingMessage}
              />
              : <CheckoutDialog
                  cart={this.state.cart}
                  currentStore={this.props.currentStore}
                  closeCheckoutDialog={() => {this.props.endCheckoutSequence()}}
                />
            )
        }
      </>
    )
  }
}

export default CheckoutContainer
