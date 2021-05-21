import React, { Component } from 'react'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'

interface CheckoutContainerProps {
  isPermissionGranted: boolean;
  setPermission: () => void;
  endCheckoutSequence: () => void;
}

interface CheckoutContainerState {
}

class CheckoutContainer extends Component<CheckoutContainerProps, CheckoutContainerState> {

  render() {
    return (
      <>
        { !this.props.isPermissionGranted ?
            <PermissionDialog
              onOK={this.props.setPermission}
              onClose={this.props.endCheckoutSequence}
              modalHeading={"Hi there! May we take a peek at your cart?"}
              modalSubText={"By analyzing your cart, we can evaluate it for carbon scoring and we'll try our best to help you make smarter choices."}
            />
            : null
        }
      </>
    )
  }
}

export default CheckoutContainer
