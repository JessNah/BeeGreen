import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"

interface CheckoutDialogProps {
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
          label={"Label"}
          title={"Title"}
          description={"Description"}
          influencer={<div>what</div>}
          influencerPosition={'right'}
          influencerWidth={'wide'}
          actions={[{
            kind: 'secondary',
            label: "Back",
            loading: false,
            onClick: () => {console.log("back button click")}
          }]
          }
          open={this.state.open}>
            MainContent
        </Tearsheet>
      </>
    )
  }
}

export default CheckoutDialog
