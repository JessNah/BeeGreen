import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"

interface CheckoutDialogProps {
  closeCheckoutDialog: () => void;
}

interface CheckoutDialogState {
  open: boolean;
}

class CheckoutDialog extends Component<CheckoutDialogProps, CheckoutDialogState> {
  state= {
    open: false
  }

  componentDidMount() {
    this.setState({open: true});
  }

  render() {
    return (
      <>
        <Tearsheet
          label={""}
          title={"Take2"}
          description={"Keep it up! You're shopping smarter than 73% of shoppers visiting this site."}
          influencer={<div>Insert shopping cart</div>}
          influencerPosition={'right'}
          influencerWidth={'wide'}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {this.props.closeCheckoutDialog()}
          }]
          }
          open={this.state.open}>
            TODO...
        </Tearsheet>
      </>
    )
  }
}

export default CheckoutDialog
