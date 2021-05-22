import React, { Component } from 'react'
import "./CheckoutDialog.scss"
import { Tearsheet } from "@carbon/ibm-cloud-cognitive"
import { getInstaCart } from "../../stores/getInstaCart" 
import { Accordion, AccordionItem } from "carbon-components-react"

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
    const cart = getInstaCart();
    console.log(cart);
    return (
      <>
        <Tearsheet
          label={""}
          title={"Take2"}
          description={"Keep it up! You're shopping smarter than 73% of shoppers visiting this site."}
          influencer={<>
            <div>Insert shopping cart</div>
            <Accordion>
            {cart.map((item, index) => {
              return (
                <AccordionItem
                  title={
                    <div key={index + "_cart_item"} className={"take2--checkout-dialog-cart-item"}>
                      <div>
                        <img className={"take2--checkout-dialog-cart-item-img"} src={item.image.currentSrc}/>
                      </div>
                      <div className={"take2--checkout-dialog-cart-item-text-container"}>
                        <div className={"take2--checkout-dialog-cart-item-text-wrapper"}>
                          <span className={"take2--checkout-dialog-cart-item-text"}>{item.name}</span>
                        </div>
                      </div>
                      <div className={"take2--checkout-dialog-cart-item-text-container"}>
                        <span className={"take2--checkout-dialog-cart-item-score"}>{"3000"}</span>
                      </div>
                    </div>
                  }
                />
              )})
            }
            </Accordion>
            </>}
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
