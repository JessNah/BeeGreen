import React, { Component } from 'react'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'
import LoadingModal from '../components/LoadingModal/LoadingModal'
import CheckoutDialog from '../components/CheckoutDialog/CheckoutDialog'
import { messages_en } from "../messages/messages_en";


interface CheckoutContainerProps {
  isPermissionGranted: boolean;
  setPermission: () => void;
  endCheckoutSequence: () => void;
  currentStore: string;
}

interface CheckoutContainerState {
  loading: boolean;
}

class CheckoutContainer extends Component<CheckoutContainerProps, CheckoutContainerState> {
  state = {
    loading: true
  }
  timeoutLoadSim:any;

  componentWillUnmount() {
    clearTimeout(this.timeoutLoadSim);
  }

  componentDidMount() {
    if(this.props.isPermissionGranted) {
      this.timeoutLoadSim = window.setTimeout(this.loadingSim, 2000);
    }
  }

  loadingSim = () => {
    this.setState({loading: false});
  }

  onPermissionOK = () => {
    this.props.setPermission();
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
          : (this.state.loading ? 
              <LoadingModal
                loading={true}
                message={messages_en.checkoutContainerLoadingMessage}
              />
              : <CheckoutDialog
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
