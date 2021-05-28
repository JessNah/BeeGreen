import React, { Component } from 'react'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'
import LoadingModal from '../components/LoadingModal/LoadingModal'
import CheckoutDialog from '../components/CheckoutDialog/CheckoutDialog'

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
              modalHeading={"Hi there! Bee Green would like to take a peek at your cart"}
              modalSubText={"By analyzing your cart, we can evaluate it for carbon scoring and we'll try our best to help you make smarter choices."}
            />
          : (this.state.loading ? 
              <LoadingModal
                loading={true}
                message={"Bee Green is analyzing your cart...\n Thanks for trying your best to make smart choices."}
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
