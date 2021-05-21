import React, { Component } from 'react'
import PermissionDialog from '../components/PermissionDialog/PermissionDialog'
import LoadingModal from '../components/LoadingModal/LoadingModal'

interface CheckoutContainerProps {
  isPermissionGranted: boolean;
  setPermission: () => void;
  endCheckoutSequence: () => void;
}

interface CheckoutContainerState {
}

class CheckoutContainer extends Component<CheckoutContainerProps, CheckoutContainerState> {

  render() {
    console.log(" hi " + this.props.isPermissionGranted)
    return (
      <>
        { !this.props.isPermissionGranted ?
            <PermissionDialog
              onOK={() => this.props.setPermission()}
              onClose={() => this.props.endCheckoutSequence()}
              modalHeading={"Hi there! Take2 would like to take a peek at your cart"}
              modalSubText={"By analyzing your cart, we can evaluate it for carbon scoring and we'll try our best to help you make smarter choices."}
            />
          : <LoadingModal
              loading={true}
              message={"Take2 is analyzing your cart... Thanks for trying your best to make smart choices."}
            />
        }
      </>
    )
  }
}

export default CheckoutContainer
